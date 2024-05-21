"use client"

import Container from "@/lib/components/container"
import { useParams, useRouter } from "next/navigation"
import Components from "./components"
import { CourseProps, LectureProps } from "@/app/sample_data"
import ReadLectureUseCase from "../../../../../../domain/lecture/read_lecture_use_case"
import { useEffect, useState } from "react"
import ReadCourseUseCase from "../../../../../../domain/course/read_course_use_case"
import Lectures from "../../lectures"
import Loader from "@/lib/components/loader"
import AnswerPromptUseCase from "../../../../../../domain/gpt/answer_prompt_use_case"
import { ScreenCapture } from 'react-screen-capture';
import Image from "next/image"
import CreateNodeOneUseCase from "../../../../../../domain/node_one/create_node_one_use_case"
import ReadChapterUseCase from "../../../../../../domain/chapter/read_chapter_use_case"
import Modal from "@/lib/components/modal"
import GlobalButton from "@/lib/components/global_button"
import GlobalComponents from "@/lib/components/global_components"


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
        const use_case = new AnswerPromptUseCase()
        const bgInfo = `
            ### BACKGROUND INFORMATION:
            An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.
            A human agent has eyes, ears, and other organs for sensors and hands, legs, vocal tract, and so on for actuators.
            A robotic agent might have cameras and infrared range finders for sensors and various motors for actuators.
            A software agent receives file contents, network packets, and human input (keyboard/mouse/touchscreen/voice)
            as sensory inputs and acts on the environment by writing files, sending network packets, and displaying information or generating sounds.
            The environment could be everything—the entire universe! In practice it is just that part of the universe
            whose state we care about when designing this agent—the part that affects what the agent perceives and that is affected by the agents actions.

            ### PROMPT:
            Given this info, help me answer: ${prompt}.
            ONLY use the information provided above. Do not add any additional information.
        `
        const response = await use_case.generate(bgInfo)
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


    const createNode = async () => {
        setLoading(true)
        const read_chapter_use_case = new ReadChapterUseCase();
        const res = await read_chapter_use_case.read(courseID, lectureID);
        const chapters = res.data
        const sampleChap = chapters[0].chapterID

        const create_node_one_use_case = new CreateNodeOneUseCase();
        nodes.forEach(async (title: string) => {
            await create_node_one_use_case.create(
                courseID,
                lectureID,
                sampleChap,
                title,
                "detail"
            );
        })

        setQna([])
        setNodes([])
        setLoading(false)

        setModal(true)
    }


    const [screenCapture, setScreenCapture] = useState("")

    const handleScreenCapture = (sc: string) => {
        setScreenCapture("captured");
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
                                {lecture.fileURL &&
                                    <Lectures.PDFViewer
                                        fileURL={lecture.fileURL}
                                    />
                                }
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
                                            src="https://firebasestorage.googleapis.com/v0/b/ai-ta-206f2.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%A2%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF.png?alt=media&token=ff81be0f-22c1-4683-af05-75541ec996d6"
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