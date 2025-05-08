import dbConnect from "@/lib/dbConnect";
import Document from "@/models/documentModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request) {
  try {
    let token;
    try {
        token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
          });
    } catch (error) {
        return NextResponse.json({msg:"Unauthorized", err:error}, {status: 401});
    }
    
    const userId = token.id;
    if (!userId) {
        return NextResponse.json({msg:"User ID not provided or invalid!"}, {status: 400});
    }

    await dbConnect();

    const { title, content } = await request.json();   
    
    const newDoc = await Document.create({ owner: userId, title: title || "Untitled Document", content:content || ""  });

    if (!newDoc) {
      return NextResponse.json(
        { msg: "Document creation failed" },
        { status: 500 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { allDocuments: newDoc._id } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { msg: "User update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: "New document created", document: newDoc },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating document:", error);

    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
