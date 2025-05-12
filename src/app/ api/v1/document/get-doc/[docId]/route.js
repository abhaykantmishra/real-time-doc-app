import { NextResponse } from "next/server";

import Document from "@/models/documentModel";
import User from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export async function GET(request) {
    try {
        const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
        if(!token){
            return NextResponse.json({message: "Unauthorized! No token found"}, {status: 401});
        }

        const userId = token.id;
        if(!userId){
            return NextResponse.json({message: "Unauthorized! Invalid token"}, {status: 401});
        }

        await dbConnect();

        const docId = request.nextUrl.pathname.replace("/api/v1/document/get-doc/", "");
        // console.log(request.nextUrl);

        if(!docId){
            return NextResponse.json({message: "Please provide documentId"}, {status: 400});
        }

        const doc = await Document.findById(docId);
        if(!doc){
            return NextResponse.json({message: "Document not found"}, {status: 404});
        }

        return NextResponse.json({msg:"Document fetched successfully", document: doc}, {status: 200}); 

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal Server Error", err: error}, {status: 500});
    }
}