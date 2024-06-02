"use client"

import Container from "@/lib/components/container"
import { useParams, useRouter } from "next/navigation"
import Components from "./components"
import ReadLectureUseCase from "../../../../../../domain/lecture/read_lecture_use_case"
import { useEffect, useState } from "react"
import ReadCourseUseCase from "../../../../../../domain/course/read_course_use_case"
import Loader from "@/lib/components/loader"
import AnswerPromptUseCase from "../../../../../../domain/gpt/answer_prompt_use_case"
import ReadChapterUseCase from "../../../../../../domain/chapter/read_chapter_use_case"
import Modal from "@/lib/components/modal"
import GlobalButton from "@/lib/components/global_button"
import { CourseProps, LectureProps, UnorganizedNodeProps } from "@/types/route"
import OrganizeNodeUseCase from "../../../../../../domain/node/organize_node_use_case"

export default function LectureItem() {
    const params = useParams()
    const router = useRouter()
    const courseID = params.courseID as string
    const lectureID = params.lectureID as string
    const [loading, setLoading] = useState(false)
    const [lecture, setLecture] = useState({} as LectureProps)
    const [courses, setCourses] = useState({} as CourseProps)
    const [qna, setQna] = useState<{ question: string, nodes: { index: number, title: string, detail: string, pin: boolean }[] }[]>([])
    const [nodes, setNodes] = useState<any[]>([])
    const [modal, setModal] = useState(false)
    const [selectedNode, setSelectedNode] = useState([] as UnorganizedNodeProps[])
    const [summaryModal, setSummaryModal] = useState(false)

    const readCourse = async () => {
        setLoading(true)
        const use_case = new ReadCourseUseCase()
        const res = await use_case.read(courseID)
        if (!res.success) alert("일시적인 오류가 발생했습니다. 관리자에게 문의주세요.")
        setCourses(res.data)
        setLoading(false)
    }

    const readLecture = async () => {
        setLoading(true)
        const use_case = new ReadLectureUseCase()
        const res = await use_case.read(courseID, lectureID)
        if (!res.success) alert("일시적인 오류가 발생했습니다. 관리자에게 문의주세요.")
        setLecture(res.data)
        setLoading(false)
    }

    useEffect(() => {
        readLecture()
        readCourse()
    }, [])

    const getPromptResponse = async (prompt: string) => {
        setLoading(true)
        const answer_prompt_use_case = new AnswerPromptUseCase()

        const response = await answer_prompt_use_case.generate(prompt, lecture.headlineContents)
        console.log(response)
        if (!response.success) {
            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요.")
            setLoading(false)
            return
        }

        const data = response?.data?.map((node: any) => {
            return {
                index: node.index,
                title: node.title,
                detail: node.detail,
                pin: false
            }
        })

        const newQna = [...qna]
        newQna.push({
            question: prompt,
            nodes: [...data]
        })
        setQna(newQna)
        setLoading(false)
    }

    const clickPin = (data: { index: number, title: string, detail: string, pin: boolean }, id: number) => {
        const newQna = [...qna]
        newQna[id].nodes = newQna[id].nodes.map((node: any) => {
            if (parseInt(node.index) === data.index) {
                if (!nodes.includes(node.title)) {
                    setNodes([...nodes, node.title])
                    setSelectedNode([...selectedNode, node])
                    return {
                        index: node.index,
                        title: node.title,
                        detail: node.detail,
                        pin: !node.pin
                    }
                } else {
                    setNodes(nodes.filter((title: string) => title !== node.title))
                    setSelectedNode(selectedNode.filter((node: UnorganizedNodeProps) => node.title !== data.title))
                    return {
                        index: node.index,
                        title: node.title,
                        detail: node.detail,
                        pin: !node.pin
                    }
                }
            }
            return node
        })
        setQna(newQna)
    }

    const createNode = async () => {
        setLoading(true)
        const read_chapter_use_case = new ReadChapterUseCase();
        const res = await read_chapter_use_case.read(courseID, lectureID);
        const chapters = res.data
        console.log(res)
        if (!res.success) {
            alert("일시적인 오류가 발생했습니다. 관리자에게 문의주세요.")
            setLoading(false)
            return
        }

        const organize_node_use_case = new OrganizeNodeUseCase();
        const response = await organize_node_use_case.organize(
            chapters,
            selectedNode,
            courseID,
            lectureID
        )
        console.log(response)
        setQna([])
        setNodes([])
        setSelectedNode([])
        setLoading(false)

        setModal(true)
    }

    return (
        <Container.WideContainer>
            <div className="pb-4 h-full" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 20,
            }}>
                <div className="items-center px-5 flex flex-col gap-4" style={{ maxHeight: "87vh" }}>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex gap-4 items-center">
                            <div className="text-h3-m-16">{courses.courseName}</div>
                            <div className="text-body-r-16 text-neutral-600">{courses.courseCode}</div>
                        </div>
                        <Components.CourseContentToggle
                            lectureName={lecture.lectureName}
                            onModalOpen={() => setSummaryModal(true)}
                        />
                    </div>
                    <div className="w-full flex-grow bg-neutral-200 relative flex overflow-hidden" style={{
                        borderRadius: 20
                    }}>
                        <div className="h-full overflow-scroll flex-grow">
                            {
                                lecture.imageURLArray &&
                                <Components.ImageContainer imageArray={lecture.imageURLArray} />
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-9">
                    <div className="flex flex-col gap-2">
                        <Components.BreadCrumbs crumbs={[courses.courseName, lecture.lectureName]} />
                        <Components.NodeMap
                            createNode={createNode}
                            seeTree={() => router.push(`/course/${courseID}/lecture/${lectureID}/tree`)}
                            nodes={nodes}
                            deliverNewNodes={(newNodes: any) => setNodes(newNodes)}
                        />
                    </div>
                    <div className="flex flex-col justify-between h-full overflow-scroll" style={{ maxHeight: "63vh" }}>
                        <div className="flex-grow w-full overflow-scroll">
                            {qna.map((data, index) => (
                                <Components.QnA
                                    key={index}
                                    question={data.question}
                                    answerData={data.nodes}
                                    pinClick={data => clickPin(data, index)}
                                />
                            ))}
                        </div>
                    </div>
                    <Components.PromptInput
                        sendPrompt={(e) => getPromptResponse(e)}
                    />
                </div>
            </div>
            {loading && <Loader />}
            {
                modal && <Modal open={modal} onClose={() => setModal(false)}>
                    <div className="flex flex-col justify-between h-full">
                        <div className="text-h2-sb-20">강의에 대한 지식 트리를 생성했어요!</div>
                        <GlobalButton.MainButton text="보러가기" onClick={() => router.push(`/course/${courseID}/lecture/${lectureID}/tree`)} />
                    </div>
                </Modal>
            }

            {
                summaryModal && <Modal open={summaryModal} onClose={() => setSummaryModal(false)}>
                    <div className="flex flex-col gap-5 h-full overflow-hidden">
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9 1C7.89543 1 7 1.89543 7 3H6C4.34315 3 3 4.34315 3 6V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V6C21 4.34315 19.6569 3 18 3H17C17 1.89543 16.1046 1 15 1H9ZM17 5C17 6.10457 16.1046 7 15 7H9C7.89543 7 7 6.10457 7 5H6C5.44772 5 5 5.44772 5 6V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V6C19 5.44772 18.5523 5 18 5H17ZM9 3H15V5H9V3Z" fill="#FF6262" />
                            </svg>
                            <div className="text-h2-sb-18 text-neutral-black">강의 요약</div>
                        </div>
                        <div className="bg-neutral-100 p-4 rounded-3xl h-full overflow-scroll">
                            <div className="text-body-r-14 text-neutral-black">{lecture.summary}</div>
                        </div>
                    </div>
                </Modal>
            }
        </Container.WideContainer>
    )
}
