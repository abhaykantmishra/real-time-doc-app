import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import CredentialsProvider from "next-auth/providers/credentials";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),


        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            email: { label: "email", type: "text", placeholder: "example@mail.com" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                await dbConnect()
                try {
                    const user = await User.findOne({
                        $or: [{ email: credentials.email }, { username: credentials.email }]
                    })
                    if(!user) {
                        throw new Error("User not found with email or username");
                    }
                    // if(!user.verified) {
                    //     throw new Error("User not verified!Verify your account first");
                    // }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Incorrect password");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }

        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
          await dbConnect();
    
          const existingUser = await User.findOne({ email: user.email });
    
          if (!existingUser) {
            // First time login via GitHub/Google
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
            });
          } else {
            // Update provider/image optionally
            await User.updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  image: user.image,
                  provider: account.provider,
                },
              }
            );
          }
    
          return true;
        },
    
        async session({ session }) {
          await dbConnect();
          const dbUser = await User.findOne({ email: session.user.email });
    
          session.user.id = dbUser._id.toString();
          session.user.role = dbUser.role;
          session.user.username = dbUser.username;
    
          return session;
        },
        async jwt({ token, user }) {
          await dbConnect();
        
          // First time login: user object is available
          if (user) {
            const dbUser = await User.findOne({ email: user.email });
        
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.role = dbUser.role;
              token.username = dbUser.username;
            }
          } else if (token?.email) {
            // Subsequent calls: get user info from token or fetch from DB if needed
            const dbUser = await User.findOne({ email: token.email });
        
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.role = dbUser.role;
              token.username = dbUser.username;
            }
          }
        
          return token;
        }
      },
    
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt",
    },
    
    secret: process.env.NEXTAUTH_SECRET,
});
    
export { handler as GET, handler as POST };