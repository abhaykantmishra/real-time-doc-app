import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Document from "@/models/documentModel";
import User from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";


export async function POST(request){
    try {
        const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});
        if(!token){
            return NextResponse.json({msg:"Unauthorized"}, {status:401})
        }

        await dbConnect();

        const {docId} = await request.json();
    
        if(!docId){
            return NextResponse.json({msg:"Please provide documentId"}, {status:400})
        }

        // const user = await User.findById(token.id);
        // if(!user){
        //     return NextResponse.json({msg:"User not found"}, {status:404})
        // }

        const document = await Document.findById(docId);
        if(!document){
            return NextResponse.json({msg:"Document not found"}, {status:404})
        }

        if(document.isPublic){
            return NextResponse.json({msg:"Document is already public"}, {status:200})
        }
        document.isPublic = true;
        await document.save();
        
        return NextResponse.json({msg:"Document made public successfully"}, {status:200})
    } catch (error) {
        return NextResponse.json({msg:"Something went wrong while making document public", error}, {status:500})
    }
}