import { NextResponse } from "next/server";
import Document from "@/models/documentModel";
import User from "@/models/userModel";
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

        // Remove the document from the user's allDocuments array
        await User.findByIdAndUpdate(token.id, { $pull: { allDocuments: docId } });

        await Document.findByIdAndDelete(docId);

        return NextResponse.json({ msg: "Document deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({msg: `Something went wrong while deleting the Document`, err: error}, {status: 500})
    }
}