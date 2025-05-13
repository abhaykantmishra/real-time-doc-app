import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Document from "@/models/documentModel";
import dbConnect from "@/lib/dbConnect";

export async function POST (request) {
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

        const {docId, userIds, userPermission, isPublic, publicPermission} = await request.json();

        if(!docId ){
            return NextResponse.json({msg: "Please provide documentId"}, {status: 400});
        }else if(!userIds){
            return NextResponse.json({msg: "Please provide userIds"}, {status: 400});
        }else if(!userPermission){
            return NextResponse.json({msg: "Please provide userPermission"}, {status: 400});
        }else if(isPublic === undefined || isPublic === null){
            return NextResponse.json({msg: "Please provide isPublic"}, {status: 400});
        }else if(!publicPermission){
            return NextResponse.json({msg: "Please provide publicPermission"}, {status: 400});
        }

        const document = await Document.findById(docId);
        if(!document){
            return NextResponse.json({msg: "Document not found"}, {status: 404});
        }

        const users = userIds.map( async (id) => {
            await User.findByIdAndUpdate(id, {
                $addToSet: {
                    sharedDocuments: docId
                }
            })
        }) 

        const updatedDocument = await Document.findByIdAndUpdate(docId, {
            $addToSet: {
                sharedWith: userIds
            },
            $set: {
                sharedWithPermission: userPermission,
                isPublic: isPublic,
                publicPermission: publicPermission
            }
        }, {new: true});

        if(!updatedDocument){
            return NextResponse.json({msg: "Failed to update document"}, {status: 500});
        }

        return NextResponse.json({msg: "Document shared successfully", document: updatedDocument}, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({msg: "Internal Server Error", err: error}, { status: 500 });
    }
}