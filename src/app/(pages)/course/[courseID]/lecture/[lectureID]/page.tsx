"use client"

import Container from "@/lib/components/container"
import { useParams } from "next/navigation"
import Components from "./components"
import SampleData from "@/app/sample_data"

export default function LectureItem() {
    const params = useParams()
    const { courseID, lectureID } = params
    const courseName = "클래식음악의이해"

    return (
        <Container.WideContainer>
            <div className="flex gap-5 pr-24 h-full pb-8">
                <div className="flex-grow items-center px-5 h-full flex flex-col gap-5">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex gap-4 items-center">
                            <div className="text-h3-m-16">{courseName}</div>
                            <div className="text-body-r-16 text-neutral-600">{courseID}</div>
                        </div>
                        <Components.CourseContentToggle lectureName={SampleData.courses[0].lectures[0].lectureName} />
                    </div>
                    <div className="w-full flex-grow bg-main-100" style={{ borderRadius: 20 }}>
                        <div className="w-full flex justify-center" style={{ position: "relative", top: "calc(100% + 20px)" }}>
                            <Components.ToolTip />
                        </div>
                    </div>
                </div>

                <div className="flex-grow flex flex-col gap-9">
                    <div className="flex flex-col gap-2">
                        <Components.BreadCrumbs crumbs={["a", "b"]} />
                        <Components.NodeMap
                            createNode={() => { }}
                            seeTree={() => { }}
                            nodes={[{ title: "a", contents: "b" }]}
                        />
                    </div>
                    <div className="flex-grow">
                        <Components.QnA
                            question="질문"
                            answer="답변"
                            answerData={[{ title: "a", contents: "b" }]}
                            pinStatus={true}
                        />
                    </div>
                    <Components.PromptInput
                        sendPrompt={() => { }}
                    />
                </div>
            </div>
        </Container.WideContainer>
    )
}