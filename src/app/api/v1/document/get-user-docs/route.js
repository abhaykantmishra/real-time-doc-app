import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/dbConnect";
import Document from "@/models/documentModel";
import User from "@/models/userModel";

export async function GET(request){

    try {
        await dbConnect();

        let token;
        try {
            token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET,
              });
        } catch (error) {
            return NextResponse.json({msg:"Unauthorized", err:error}, {status: 401});
        }

        console.log("Token: ", token);
        
        const userId = token.id;
        if (!userId) {
            return NextResponse.json({msg:"User ID not provided or invalid!"}, {status: 400});
        }

        const currentUser = await User.findById(userId).populate("allDocuments");

        if (!currentUser) {
            return NextResponse.json({msg:"User not found"}, {status: 404});
        }

        const starredSet = currentUser.starredDocuments;
        let allDocs = currentUser.allDocuments;

        allDocs = allDocs.map((doc) => {
            return {
                ...doc._doc,
                isStarred: starredSet.includes(doc._id),
            };
        });


        if (!allDocs || allDocs.length === 0) {
            return NextResponse.json({msg:"No documents found for this user"}, {status: 404});
        }

        return NextResponse.json({msg:"Documents fetched successfully", documents: allDocs}, {status: 200});

    } catch (error) {
        return NextResponse.json({msg:"Something went wrong while fetching documents", err:error}, {status: 500});
    }

}