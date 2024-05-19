"use client"

import Container from "@/lib/components/container";
import SampleData from "@/app/sample_data";
import GlobalComponents from "@/lib/components/global_components";
import Tree from "./components";
import NodeTypes from "./node";

export default function Home() {
    return (
        <Container.MainContainer>
            <div className="h-full flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-end">
                    <GlobalComponents.CourseName name={SampleData.courses[0].courseName} />
                    <GlobalComponents.CourseCode code={SampleData.courses[0].courseCode} />
                </div>
                <div className="flex-grow">
                    <Tree courseID="123" />
                </div>
            </div>
        </Container.MainContainer>
    );
}
