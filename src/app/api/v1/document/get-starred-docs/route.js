import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/dbConnect";
import Document from "@/models/documentModel";
import User from "@/models/userModel";


export async function  GET(request){
    try {
        const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});
        if(!token){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        await dbConnect();

        const userId = token.id;
        if(!userId){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const currentUser = await User.findById(userId).populate("starredDocuments");

        console.log(currentUser);
        
        const starredDocs = await Document.find({_id: {$in: currentUser.starredDocuments}})

        return NextResponse.json({msg:"starred documents fetched successfully", documents: starredDocs}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
        
    }
}