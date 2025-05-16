"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Bold, ChevronDown, Italic, Printer, Redo2, SpellCheckIcon, Underline, Undo2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSession } from "next-auth/react";

const HeadingLevelButton = () => {
    const { editor } = useEditorStore()

    const headings = [
        {label:"Normal Text", value:"h1", fontSize: "16px"},
        {label:"Heading 1", value:1, fontSize: "32px"},
        {label:"Heading 2", value:2, fontSize: "24px"},
        {label:"Heading 3", value:3, fontSize: "20px"},
        {label:"Heading 4", value:4, fontSize: "18px"},
        {label:"Heading 5", value:5, fontSize: "16px"},
        {label:"Heading 6", value:6, fontSize: "16px"},
    ]

    const getCurrentHeading = () => {
        for (let lvl=1; lvl <= 6; lvl++){
            if(editor?.isActive("heading", {level: lvl})){
                return `Heading ${lvl}`
            }
        }
        return "Normal Text"
    }
    
    return (
        <DropdownMenu className="rounded-none">
            <DropdownMenuTrigger asChild>
                <button
                  className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-none hover:bg-neutral-200/80 px-1"
                >
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDown className="size-4 shrink-0 ml-2" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 rounded-none">
                {
                    headings.map((heading,index) => (
                        <button key={index}
                            className={cn(
                                "text-sm flex items-center rounded-none gap-x-2 px-2 py-1  hover:bg-neutral-200/80",
                                (heading.value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level: heading.value}) && "bg-neutral-200/80"
                            )}
                            style={{ fontSize: heading.fontSize }}
                            onClick={() => {
                                if(heading.value === 0){
                                    editor?.chain().focus().setParagraph().run()
                                } else {
                                    editor?.chain().focus().toggleHeading({level: heading.value}).run()
                                }
                            }}
                        >
                            <span>{heading.label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontFamilyButton = () => {
    const { editor } = useEditorStore()
    const fonts = [
        {label:"Arial", value:"Arial"},
        {label:"Times New Roman", value:"Times New Roman"},
        {label:"Courier New", value:"Courier New"},
        {label:"Verdana", value:"Verdana"},
        {label:"Georgia", value:"Georgia"},
        {label:"Trebuchet MS", value:"Trebuchet MS"},
        {label:"Comic Sans MS", value:"Comic Sans MS"},
    ]

    return (
        <DropdownMenu className="rounded-none">
            <DropdownMenuTrigger asChild>
                <button
                  className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-none hover:bg-neutral-200/80 px-1"
                >
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDown className="size-4 shrink-0 ml-2" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 rounded-none">
                {
                    fonts.map((font,index) => (
                        <button key={index}
                            className={cn(
                                "text-sm flex items-center rounded-none gap-x-2 px-2 py-1  hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").fontFamily === font.value && "bg-neutral-200/80"
                            )}
                            style={{ fontFamily: font.value }}
                            onClick={() => editor?.chain().focus().setFontFamily(font.value).run()}
                        >
                            <span>{font.label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ToolbarButton = ({ onClick, isActive, icon:Icon }) => {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}


export default function Toolbar({docDetail}) {

    const session = useSession();
    const user = session.data?.user

    const isCurrentUserHaveWriteAccess = () => {
        if(user.id === docDetail?.owner){
          return true;
        }else if(docDetail.sharedWithPermission === "write" && docDetail?.sharedWith.some(person => person._id === user.id) === true){
          return true;
        }else {
          return false;
        }
    }

    if(isCurrentUserHaveWriteAccess() === false){
        return (
            <>
            </>
        )
    }

    const { editor } = useEditorStore()
    // console.log("Toolbar editor: ",editor)

    const sections = [
        [
            {
                label: "Undo",
                icon: Undo2,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: Printer,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false"); 
                }
            },
        ],
        [
            {
                label: "Bold",
                icon: Bold,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: Italic,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: Underline,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ]
    ]

    return (
        <div className="bg-[#f1f4f9] px-2.5 py-0.5 h-10 flex items-center gap-x-0.5 overflow-x-auto w-full print:hidden">
            {
                sections[0].map((section, index) => (
                    <ToolbarButton key={index} {...section} />
                ))
            }
            <Separator orientation="vertical" className="h-6 bg-slate-400" />
            {/* Font family  */}
            {
                <FontFamilyButton />
            }
            <Separator orientation="vertical" className="h-6 bg-slate-400" />
            {
                <HeadingLevelButton />
            }
            <Separator orientation="vertical" className="h-6 bg-slate-400" />
            {
                sections[1].map((section, index) => (
                    <ToolbarButton key={index} {...section} />
                ))
            }
        </div>
    );
}