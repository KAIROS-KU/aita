"use client"

import GlobalButton from "@/lib/components/global_button"
import { useState } from "react"

function CourseContentToggle({
    lectureName
}: {
    lectureName: string
}) {
    return (
        <div className="p-5 flex justify-between border border-neutral-300" style={{ borderRadius: 20 }}>
            <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M8.75 26.25C7.36929 26.25 6.25 25.1307 6.25 23.75V6.25C6.25 4.86929 7.36929 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 25.1307 22.6307 26.25 21.25 26.25H8.75Z" stroke="#1F1717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.25 3.75V11.25H23.75" stroke="#1F1717" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <div className="text-h3-m-16">{lectureName}</div>
            </div>
            <div style={{ padding: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M5.66861 8.92558C6.34119 9.69147 7.65881 9.69147 8.33139 8.92558L13.6481 2.87127C14.4986 1.90277 13.711 0.5 12.3167 0.5H1.68328C0.288997 0.5 -0.498613 1.90277 0.35189 2.87127L5.66861 8.92558Z" fill="#F1ECEC" />
                </svg>
            </div>
        </div>
    )
}

function ToolTip({ }: {}) {
    return (
        <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#1F1717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="#1F1717" />
                <path d="M10.5858 8.11416C10.9754 7.72454 11.4858 7.52928 11.9965 7.52838C12.5095 7.52748 13.0228 7.72274 13.4142 8.11416C13.8047 8.50469 14 9.01654 14 9.52838C14 10.0402 13.8047 10.5521 13.4142 10.9426C13.0228 11.334 12.5095 11.5293 11.9965 11.5284L12 13.5284" stroke="#1F1717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-h3-m-16">캡쳐 기능을 사용해 보세요!</div>
        </div>
    )
}

function BreadCrumbs({
    crumbs
}: {
    crumbs: string[]
}) {
    return (
        <div className="flex items-center">
            {crumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                    <div className={`text-body-r-14 ${index === crumbs.length - 1 ? "text-main-red" : "text-neutral-600"}`}>
                        {crumb}
                    </div>
                    {index < crumbs.length - 1 && (
                        <span className="mx-2 text-neutral-400">/</span>
                    )}
                </div>
            ))}
        </div>
    )
}

function Pin({
    onOff
}: {
    onOff: boolean
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.3334 4.66669H15.6667V8.75247L16.9142 10C17.2893 10.3751 17.5 10.8838 17.5 11.4142V12.75C17.5 13.8546 16.6046 14.75 15.5 14.75H12V18.3334C12 18.8856 11.5523 19.3334 11 19.3334C10.4477 19.3334 10 18.8856 10 18.3334V14.75H6.50002C5.39545 14.75 4.50002 13.8546 4.50002 12.75V11.4142C4.50002 10.8838 4.71073 10.3751 5.08581 10L6.33335 8.75247V4.66669H3.66669V2.66669H8.33335H13.6667H18.3334V4.66669ZM11 12.75H15.5V11.4142L14.2525 10.1667C13.8774 9.79161 13.6667 9.28291 13.6667 8.75247V4.66669H8.33335V8.75247C8.33335 9.28291 8.12264 9.79161 7.74757 10.1667L6.50002 11.4142L6.50002 12.75H11Z" fill={onOff ? "#FF5656" : "#DDDCDC"} />
        </svg>
    )
}

function Select({
    text
}: {
    text: string
}) {
    return (
        <div className="flex gap-3 bg-main-100" style={{ padding: "6px 10px", borderRadius: 6 }}>
            <div className="text-main-700 text-h3-m-14">{text}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#734E4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 7.5L7.5 12.5" stroke="#734E4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 7.5L12.5 12.5" stroke="#734E4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

function CreateNodeButton({
    text,
    onClick
}: {
    text: string,
    onClick: (e: any) => void
}) {
    return (
        <button onClick={onClick} className="bg-main-linear h-10 flex gap-3 items-center" style={{ padding: "6px 10px", borderRadius: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 14V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14H13L22 5L19 2L10 11V14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 5L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-neutral-white text-body-r-14">{text}</div>
        </button>
    )
}

function Toggle({
    title,
    contents,
    pinStatus
}: {
    title: string,
    contents: string,
    pinStatus: boolean
}) {
    const [toggle, setToggle] = useState(false)
    const clickToggle = () => {
        setToggle(!toggle)
    }
    return (
        <div onClick={clickToggle} className="p-5 flex flex-col gap-4 border border-neutral-300" style={{ borderRadius: 10 }}>
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 flex justify-center items-center">
                        <svg style={toggle ? { rotate: "-90deg", transition: "all 0.3s" } : {transition: "all 0.3s"}} xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M5.76371 9.36176C6.38825 10.2127 7.61175 10.2127 8.23629 9.36176L13.1732 2.63474C13.963 1.55863 13.2316 0 11.937 0L2.06304 0C0.768354 0 0.0370022 1.55863 0.826755 2.63474L5.76371 9.36176Z" fill="#F1ECEC" />
                        </svg>
                    </div>
                    <div className="text-neutral-black text-h3-m-16">{title}</div>
                </div>
                <Pin onOff={pinStatus} />
            </div>
            {toggle && <div className="ml-11 text-body-r-16">
                {contents}
            </div>}
        </div>
    )
}

function QnA({
    question,
    answer,
    answerData,
    pinStatus
}: {
    question: string,
    answer: string,
    answerData: { title: string, contents: string }[],
    pinStatus: boolean
}) {
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center" style={{ padding: "10px 0" }}>
                <div className="text-neutral-700 bg-neutral-300 text-h2-sb-24 flex justify-center items-center w-11 h-11 rounded-full">Q</div>
                <div className="text-body-m-16">{question}</div>
            </div>
            <div className="flex flex-col justify-end">
                <div className="flex gap-5 items-center" style={{ padding: "10px 0" }}>
                    <div className="text-neutral-700 bg-neutral-300 text-h2-sb-24 flex justify-center items-center w-11 h-11 rounded-full">A</div>
                    <div className="text-body-r-16">{answer}</div>
                </div>
                <div className="flex flex-col gap-3 ml-16">
                    {answerData?.map((data, index) => (
                        <Toggle key={index} title={data.title} contents={data.contents} pinStatus={pinStatus} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function PromptInput({
    sendPrompt
}: {
    sendPrompt: (prompt: string) => void
}) {
    const [prompt, setPrompt] = useState("")
    const clickSendPrompt = () => {
        sendPrompt(prompt)
        setPrompt("")
    }
    return (
        <div className="border-2 border-neutral-300 p-5 flex gap-3" style={{ borderRadius: 20 }}>
            <input
                className="flex-grow outline-none"
            />
            <div onClick={clickSendPrompt} className="w-12 h-12 flex justify-center items-center bg-main-red" style={{ borderRadius: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M15 23.7501L7.31299 24.6042C5.7567 24.7772 4.61433 23.1754 5.28466 21.7603L13.1925 5.06591C13.9149 3.5408 16.0851 3.54081 16.8075 5.06591L24.7153 21.7603C25.3857 23.1754 24.2433 24.7772 22.687 24.6042L15 23.7501ZM15 23.7501L15 15.0001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

type Node = {
    title: string,
    contents: string,
}

function NodeMap({
    createNode,
    seeTree,
    nodes
}: {
    createNode: (nodes: Node[]) => void,
    seeTree: () => void,
    nodes: Node[]
}) {
    return (
        <div className="flex gap-3 items-center">
            <div className="flex gap-3 items-center border border-neutral-300 rounded-xl w-full" style={{ padding: "6px 8px" }}>
                <Pin onOff={true} />
                <div className="flex flex-grow">
                    {nodes.map((node, index) => (
                        <Select key={index} text={node.title} />
                    ))}
                </div>
                <CreateNodeButton text="노드 만들기" onClick={createNode} />
            </div>
            <GlobalButton.SeeTree text="질문트리" onClick={seeTree} />
        </div>
    )
}

const Components = {
    CourseContentToggle,
    ToolTip,
    BreadCrumbs,
    Pin,
    NodeMap,
    QnA,
    PromptInput
}

export default Components