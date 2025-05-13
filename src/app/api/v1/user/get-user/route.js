import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";

export async function POST(request){
    try {

        const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});
        if(!token){
            return NextResponse.json({msg: "Unauthorized"}, {status: 401});
        }

        const userId = token.id;
        if(!userId){
            return NextResponse.json({msg: "Unauthorized! Invalid token"}, {status: 401});
        }

        await dbConnect();

        const {email} = await request.json();

        if(!email){
            return NextResponse.json({msg: "Please provide email"}, {status: 400});
        }

        const user = await User.findOne({email: email});
        if(!user){
            return NextResponse.json({msg: "User not found"}, {status: 404});
        }

        const publicInfo = {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        }

        return NextResponse.json({msg: "User found", user: publicInfo}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: "Something went wrong while getting user's public information!"}, {status: 500});
    }
}