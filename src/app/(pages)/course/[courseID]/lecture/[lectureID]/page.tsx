"use client"

import Container from "@/lib/components/container"
import { useParams, useRouter } from "next/navigation"
import Components from "./components"
import ReadLectureUseCase from "../../../../../../domain/lecture/read_lecture_use_case"
import { useEffect, useState } from "react"
import ReadCourseUseCase from "../../../../../../domain/course/read_course_use_case"
import Loader from "@/lib/components/loader"
import AnswerPromptUseCase from "../../../../../../domain/gpt/answer_prompt_use_case"
import { ScreenCapture } from 'react-screen-capture';
import Image from "next/image"
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
        setScreenCapture("")
        setLoading(true)
        const answer_prompt_use_case = new AnswerPromptUseCase()
        const response = await answer_prompt_use_case.generate(prompt, lecture.headlineContents)
        console.log(response)
        const data = response.data.map((node: any) => {
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
                    return {
                        index: node.index,
                        title: node.title,
                        detail: node.detail,
                        pin: !node.pin
                    }
                } else {
                    setNodes(nodes.filter((title: string) => title !== node.title))
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


    console.log(qna)
    const createNode = async () => {
        setLoading(true)
        const read_chapter_use_case = new ReadChapterUseCase();
        const res = await read_chapter_use_case.read(courseID, lectureID);
        const chapters = res.data

        // const create_node_one_use_case = new CreateNodeOneUseCase();
        // nodes.forEach(async (title: string) => {
        //     await create_node_one_use_case.create(
        //         courseID,
        //         lectureID,
        //         sampleChap,
        //         title,
        //         "detail"
        //     );
        // })

        const organize_node_use_case = new OrganizeNodeUseCase();
        const response = await organize_node_use_case.organize(
            chapters,
            nodes,
            courseID,
            lectureID
        )
        console.log(response)

        setQna([])
        setNodes([])
        setLoading(false)

        setModal(true)
    }


    const [screenCapture, setScreenCapture] = useState("")

    const handleScreenCapture = (sc: any) => {
        console.log(sc);
        setScreenCapture(sc);
    };

    return (
        <Container.WideContainer>
            <ScreenCapture onEndCapture={handleScreenCapture}>
                {({ onStartCapture }: { onStartCapture: () => void }) => (
                    <div className="pb-8 h-full" style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        columnGap: 20
                    }}>
                        <div className="items-center px-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex gap-4 items-center">
                                    <div className="text-h3-m-16">{courses.courseName}</div>
                                    <div className="text-body-r-16 text-neutral-600">{courses.courseCode}</div>
                                </div>
                                <Components.CourseContentToggle lectureName={lecture.lectureName} />
                            </div>
                            <div className="w-full flex-grow bg-neutral-200 relative" style={{
                                borderRadius: 20
                            }}>
                                {lecture.fileURL && <embed src={lecture.fileURL} className="w-full h-full" />}
                                {lecture.fileURL && <iframe src={lecture.fileURL} className="w-full h-full" />}

                            </div>
                            <div className="absolute hover:bg-neutral-500 bg-neutral-300" style={{
                                bottom: 20,
                                cursor: "pointer",
                                borderRadius: 12,
                                transition: "all 0.3s",
                                padding: "4px 12px"
                            }} onClick={onStartCapture}>
                                <Components.ToolTip />
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
                            <div className="flex flex-col gap-2" style={{ height: 600, overflowY: "scroll" }}>
                                <div className="flex-grow w-full">
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

                            <div className="flex flex-col gap-2 items-end relative">
                                {screenCapture &&
                                    <div className="absolute" style={{ top: -100 }}>
                                        <Image
                                            src={screenCapture}
                                            alt="Screen Capture"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                }
                                <div className="w-full">
                                    <Components.PromptInput
                                        sendPrompt={(e) => getPromptResponse(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ScreenCapture>
            {loading && <Loader />}
            {
                modal && <Modal open={modal} onClose={() => setModal(false)}>
                    <div className="flex flex-col justify-between h-full">
                        <div className="text-h2-sb-20">강의에 대한 지식 트리를 생성했어요!</div>
                        <GlobalButton.MainButton text="보러가기" onClick={() => router.push(`/course/${courseID}/lecture/${lectureID}/tree`)} />
                    </div>
                </Modal>
            }
        </Container.WideContainer>
    )
}