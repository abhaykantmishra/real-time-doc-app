import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Document from "@/models/documentModel";

export async function POST(request) {
    // update title
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        console.log("token:", token);
        if (!token || !token.id) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { docId, title } = await request.json();
        if(!docId || !title){
            return NextResponse.json({ msg: "Please provide document id and title" }, { status: 400 });
        }

        const document = await Document.findByIdAndUpdate(docId, {title: title}, { new: true });
        if (!document) {
            return NextResponse.json({ msg: "Document not found" }, { status: 404 });
        }
        
        return NextResponse.json({ msg: "Document updated successfully", document }, { status: 200 });

    } catch (error) {
        return NextResponse.json({msg:"Something went wrong while updating the Document", err: error}, {status: 500})
    }
    
}