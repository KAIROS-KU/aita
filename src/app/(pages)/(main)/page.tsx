"use client"

import Container from "@/lib/components/container";
import Lectures from "./lectures";
import GlobalButton from "@/lib/components/global_button";
import SampleData from "@/app/sample_data";
import GlobalComponents from "@/lib/components/global_components";

export default function Home() {
  return (
    <Container.MainContainer>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4 items-end">
          <GlobalComponents.CourseName name={SampleData.courses[0].courseName} />
          <GlobalComponents.CourseCode code={SampleData.courses[0].courseCode} />
        </div>
        <GlobalComponents.ProfName name={SampleData.courses[0].profName} />
      </div>
      <div className="flex flex-col gap-3 bg-neutral-100 p-5 mt-8" style={{ borderRadius: 20 }}>
        <div className="flex justify-between">
          <div className="text-h2-sb-20 pb-5">강의자료</div>
          <GlobalButton.AddButton text="강의자료 추가" onClick={() => { }} />

        </div>
        {SampleData.courses.map((course, index) => (
          <Lectures.LectureItem key={index} lectureName={course.courseName} createdAt={course.createdAt} />
        ))}
      </div>
    </Container.MainContainer>
  );
}
