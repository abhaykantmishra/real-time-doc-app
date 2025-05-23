'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import '@/styles/tiptap.css';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";


import { useEditorStore } from '@/store/use-editor-store'
import { useState } from 'react'

import { useSession } from "next-auth/react"
import React from 'react'

// import { io } from "socket.io-client";
// import { useEffect } from 'react'

const Tiptap = ({docDetail}) => {

  const session = useSession();
  const user = session.data?.user

  const liveblocks = useLiveblocksExtension();
  const [doc, setDoc] = useState(docDetail);

  const isCurrentUserHaveWriteAccess = () => {
    if(user.id === doc?.owner){
      return true;
    }else if(doc.sharedWithPermission === "write" && doc?.sharedWith.some(person => person._id === user.id) === true){
      return true;
    }else {
      return false;
    }
  }

  const [editable, setEditable] = useState(isCurrentUserHaveWriteAccess());

  // useEffect(() => {
  //   const socket = io("http://localhost:3002")

  //   return () => {
  //     socket.disconnect()
  //   }
  // },[])

  const { setEditor } = useEditorStore()

  const editor = useEditor({
    onCreate({ editor }){
      setEditor(editor)
    },
    onDestroy(){
      setEditor(null)
    },
    onUpdate({ editor }){
      setEditor(editor)
    },
    onSelectionUpdate({ editor }){
      setEditor(editor)
    },
    onTransaction({ editor }){
      setEditor(editor)
    },
    onFocus({ editor }){
      setEditor(editor)
    },
    onBlur({ editor }){
      setEditor(editor)
    },
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px;",
        class: "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text"
      }
    },
    extensions: [
      liveblocks,
      StarterKit,
      FontFamily,
      Underline,
      TextStyle,
      TaskItem.configure({ nested: true }),
      TaskList,
      Table,
      TableHeader,
      TableRow,
      TableCell,
      Image,
      ImageResize
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
    `,
    editable: editable,
  })

  return (
    <div className='size-full overflow-x-auto bg-gray-300 px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default Tiptap
