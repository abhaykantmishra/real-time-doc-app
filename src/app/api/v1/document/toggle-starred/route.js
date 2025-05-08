import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import Document from "@/models/documentModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const token = await getToken({req:request, secret: process.env.NEXTAUTH_SECRET});

        if (!token) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }

        const userId = token.id;
        if (!userId) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }

        const { docId } = await request.json();
        if (!docId) {
            return NextResponse.json({ msg: "Document ID is required" }, { status: 400 });
        }

        await dbConnect();

        const doc = await Document.findById(docId);
        if (!doc) {
            return NextResponse.json({ msg: "Document not found" }, { status: 404 });
        }

        const currentUser = await User.findById(userId);
        const starredSet =  currentUser.starredDocuments;

        // const isStarred = starredSet.has(docId);
        const isStarred = starredSet.includes(docId);
        console.log(isStarred)

        if (isStarred) {
            await User.findByIdAndUpdate(userId, { $pull: { starredDocuments: docId } }, { new: true });
            return NextResponse.json({ msg: "Document unstarred successfully", documents: currentUser.starredDocuments }, { status: 200 });
        }
        else{
            await User.findByIdAndUpdate(userId, { $push: { starredDocuments: docId } }, { new: true });
            return NextResponse.json({ msg: "Document starred successfully", documents: currentUser.starredDocuments }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error", err: error }, { status: 500 });

    }
}