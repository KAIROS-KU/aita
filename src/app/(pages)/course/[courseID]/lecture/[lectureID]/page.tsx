"use client"

import Container from "@/lib/components/container"
import { useParams, useRouter } from "next/navigation"
import Components from "./components"
import { CourseProps, LectureProps } from "@/app/sample_data"
import ReadLectureUseCase from "../../../../../../domain/lecture/read_lecture_use_case"
import { useEffect, useState } from "react"
import ReadCourseUseCase from "../../../../../../domain/course/read_course_use_case"
import Lectures from "../../lectures"

export default function LectureItem() {
    const params = useParams()
    const router = useRouter()
    const courseID = params.courseID as string
    const lectureID = params.lectureID as string
    const [lecture, setLecture] = useState({} as LectureProps)
    const [courses, setCourses] = useState({} as CourseProps)
    const [qna, setQna] = useState<{ question: string, nodes: any }[]>([])
    const [nodes, setNodes] = useState<any[]>([])

    const readCourse = async () => {
        const use_case = new ReadCourseUseCase()
        const res = await use_case.read(courseID)
        if (!res.success) alert("일시적인 오류가 발생했습니다. 관리자에게 문의주세요.")
        setCourses(res.data)
    }

    const readLecture = async () => {
        const use_case = new ReadLectureUseCase()
        const res = await use_case.read(courseID, lectureID)
        if (!res.success) alert("일시적인 오류가 발생했습니다. 관리자에게 문의주세요.")
        setLecture(res.data)
    }

    useEffect(() => {
        readLecture()
        readCourse()
    }, [])


    const getPromptResponse = (prompt: string) => {
        const newQna = [...qna]
        newQna.push({
            question: prompt, nodes: [
                { index: 0, title: "어떠한 질문1", contents: "어떠한 답변1", pin: true },
                { index: 1, title: "어떠한 질문2", contents: "어떠한 답변2", pin: false }
            ]
        })
        setQna(newQna)
    }

    const clickPin = (data: { index: number, title: string, contents: string, pin: boolean }, index: number) => {
        const newQna = [...qna]
        newQna[index].nodes = newQna[index].nodes.map((node: any) => {
            if (node.index === data.index) {
                setNodes([...nodes, node.title])
                return {
                    index: node.index,
                    title: node.title,
                    contents: node.contents,
                    pin: !node.pin
                }
            }
            return node
        })
        setQna(newQna)
    }

    const createNode = (title: string) => {
        // TODO: LLM 개발하고 나서 할 것
    }

    return (
        <Container.WideContainer>
            <div className="pb-8 h-full" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 20
            }}>
                <div className="items-center px-5 flex flex-col gap-5">
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
                            <Lectures.PDFViewer fileURL={lecture.fileURL} />
                        }
                    </div>
                    <div className="absolute" style={{ bottom: 32 }}>
                        <Components.ToolTip />
                    </div>
                </div>

                <div className="flex flex-col gap-9">
                    <div className="flex flex-col gap-2">
                        <Components.BreadCrumbs crumbs={[courses.courseName, lecture.lectureName]} />
                        <Components.NodeMap
                            createNode={() => { }}
                            seeTree={() => router.push(`/course/${courseID}/lecture/${lectureID}/tree`)}
                            nodes={nodes}
                            deliverNewNodes={(newNodes: any) => setNodes(newNodes)}
                        />
                    </div>
                    <div className="flex-grow w-full">
                        {qna.map((data, index) => (
                            <Components.QnA
                                key={index}
                                question={data.question}
                                answerData={data.nodes}
                                pinClick={e => clickPin(e, index)}
                            />
                        ))}
                    </div>
                    <Components.PromptInput
                        sendPrompt={(e) => getPromptResponse(e)}
                    />
                </div>
            </div>
        </Container.WideContainer>
    )
}