import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Document from "@/models/documentModel";
import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export async function POST(request) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        if (!token || !token.id) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }


        await dbConnect();

        const { docId } = await request.json();

        if (!docId) {
            return NextResponse.json({ msg: "Please provide documentId" }, { status: 400 });
        }

        const document = await Document.findById(docId);
        if (!document) {
            return NextResponse.json({ msg: "Document not found" }, { status: 404 });
        }

        const duplicateDocument = await Document.create({ title: `${document.title} Copy`, content: document.content, owner: token.id });
        if (!duplicateDocument) {
            return NextResponse.json({ msg: "Failed to create duplicate document" }, { status: 500 });
        }

        const updateUser = await User.findByIdAndUpdate(token.id, { $push: { allDocuments: duplicateDocument._id } }, { new: true });
        if (!updateUser) {
            return NextResponse.json({ msg: "Failed to update user with new document" }, { status: 500 });
        }

        return NextResponse.json({ msg: "Document duplicated successfully", document: duplicateDocument }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong while making document public", error }, { status: 500 });
    }
}