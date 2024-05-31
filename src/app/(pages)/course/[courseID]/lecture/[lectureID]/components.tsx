"use client"

import GlobalButton from "@/lib/components/global_button"
import GlobalComponents from "@/lib/components/global_components"
import { ChangeEvent, useState } from "react"

function CourseContentToggle({
    lectureName,
    onModalOpen
}: {
    lectureName: string,
    onModalOpen: () => void
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

            <button onClick={onModalOpen} className="border px-3 py-2 border-neutral-400 rounded-lg bg-neutral-100 text-h3-m-14 text-neutral-700">요약본 보기</button>
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

function Select({
    text,
    onClick
}: {
    text: string,
    onClick: (e: any) => void
}) {
    return (
        <div onClick={onClick} className="flex gap-3 bg-main-100 flex-shrink-0" style={{ padding: "6px 10px", borderRadius: 6 }}>
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
        <button onClick={onClick} className="flex-shrink-0 bg-main-linear h-10 flex gap-3 items-center" style={{ padding: "6px 10px", borderRadius: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 14V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14H13L22 5L19 2L10 11V14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 5L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-neutral-white text-body-r-14">{text}</div>
        </button>
    )
}

function QnA({
    question,
    answerData,
    pinClick
}: {
    question: string,
    answerData: { title: string, detail: string, pin: boolean }[],
    pinClick: (e: { index: number, title: string, detail: string, pin: boolean }) => void
}) {

    const handlePin = (data: any, index: number) => {
        const newData = {
            index: index,
            title: data.title,
            detail: data.detail,
            pin: !data.pin
        }
        pinClick(newData)
    }
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center" style={{ padding: "10px 0" }}>
                <div className="text-neutral-700 bg-neutral-300 text-h2-sb-24 flex justify-center items-center w-11 h-11 rounded-full flex-shrink-0">Q</div>
                <div className="text-body-m-16">{question}</div>
            </div>
            <div className="flex flex-col justify-end">
                <div className="flex gap-5 items-start justify-start" style={{ padding: "10px 0" }}>
                    <div className="text-neutral-700 bg-neutral-300 text-h2-sb-24 flex justify-center items-center w-11 h-11 rounded-full flex-shrink-0">A</div>
                    <div className="flex flex-col gap-3 w-full">
                        {answerData?.map((data, index) => (
                            <GlobalComponents.Toggle key={index} title={data.title} contents={data.detail} pinStatus={data.pin} pinClick={() => handlePin(data, index)} />
                        ))}
                    </div>
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPrompt(value)
    }

    const handleEnter = (e: any) => {
        if (e.key === "Enter") {
            clickSendPrompt()
        }
    }
    return (
        <div className="border-2 border-neutral-300 p-2 flex gap-3" style={{ borderRadius: 20 }}>
            <input
                className="flex-grow outline-none"
                onChange={handleChange}
                value={prompt}
                onKeyPress={handleEnter}
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
    nodes,
    deliverNewNodes
}: {
    createNode: (nodes: Node[]) => void,
    seeTree: () => void,
    nodes: string[],
    deliverNewNodes: (nodes: Node[]) => void
}) {

    const deleteNode = (index: number) => {
        const newNodes: any = [...nodes]
        newNodes.splice(index, 1)
        deliverNewNodes(newNodes)
    }
    return (
        <div className="flex gap-3 items-center">
            <div className="flex gap-3 justify-between items-center border border-neutral-300 rounded-xl w-full" style={{ padding: "6px 8px" }}>
                <div className="flex gap-3 items-center">
                    <GlobalComponents.Pin onOff={true} />
                    <div className="flex flex-grow gap-2" style={{ overflowX: "scroll", maxWidth: "22vw" }}> {/* TODO: change 25vw to actual size */}
                        {nodes.map((node, index) => (
                            <Select key={index} text={node} onClick={() => deleteNode(index)} />
                        ))}
                    </div>
                </div>
                <div className="flex justify-self-end"><CreateNodeButton text="트리 만들기" onClick={createNode} /></div>
            </div>
            <GlobalButton.SeeTree text="질문트리" onClick={seeTree} />
        </div>
    )
}


function Popup({

}:{

}){
    return(
        <div></div>
    )
}

const Components = {
    CourseContentToggle,
    ToolTip,
    BreadCrumbs,
    NodeMap,
    QnA,
    PromptInput,
}

export default Components