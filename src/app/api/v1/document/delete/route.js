import { NextResponse } from "next/server";
import Document from "@/models/documentModel";

export async function DELETE(request) {
    try {
        const body = await request.json();
        console.log(body);
        const {docId} = body;
    
        if(!docId){
            return NextResponse.json({msg: `Document Id not provided or invalid!`}, {status: 400});
        }
        
       const deletedDoc = await Document.findByIdAndDelete(docId);
       
        if(!deletedDoc){
            return NextResponse.json({msg: `Something went wrong while deleting the Document`}, {status: 500})
        }

        return NextResponse.json({msg: `Document deleted`, doc: deletedDoc}, {status: 200});
    } catch (error) {
        return NextResponse.json({msg: `Something went wrong while deleting the Document`, err: error}, {status: 500})
    }
}