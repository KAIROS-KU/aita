"use client"

import Container from "@/lib/components/container";
import SampleData from "@/app/sample_data";
import GlobalComponents from "@/lib/components/global_components";
import CustomTree from "./components";

export default function Home() {
    return (
        <Container.MainContainer>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row gap-4 items-end">
                    <GlobalComponents.CourseName name={SampleData.courses[0].courseName} />
                    <GlobalComponents.CourseCode code={SampleData.courses[0].courseCode} />
                </div>
            </div>
            <div className="flex-grow h-full">
                <CustomTree />
            </div>
        </Container.MainContainer>
    );
}
