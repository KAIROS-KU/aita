"use client"

import Container from "@/lib/components/container";
import Lectures from "./lectures";
import GlobalButton from "@/lib/components/global_button";
import SampleData from "@/app/sample_data";
import GlobalComponents from "@/lib/components/global_components";
import { useParams, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const { courseID } = params;
  const findCourseWithID = SampleData.courses.find((course) => course.courseID === courseID);
  if (!findCourseWithID) {
    return <div>존재하지 않는 강의입니다.</div>;
  }
  return (
    <Container.MainContainer>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4 items-end">
          <GlobalComponents.CourseName name={findCourseWithID.courseName} />
          <GlobalComponents.CourseCode code={findCourseWithID.courseCode} />
        </div>
        <GlobalComponents.ProfName name={findCourseWithID.profName} />
      </div>
      <div className="flex flex-col gap-3 bg-neutral-100 p-5 mt-8" style={{ borderRadius: 20 }}>
        <div className="flex justify-between">
          <div className="text-h2-sb-20 pb-5">강의자료</div>
          <GlobalButton.AddButton text="강의자료 추가" onClick={() => router.push("/course/create")} />

        </div>
        {findCourseWithID.lectures.map((lecture, index) => (
          <Lectures.LectureItem
            key={index}
            lectureName={lecture.lectureName}
            createdAt={lecture.createdAt}
            treeClick={() => router.push(`/course/${courseID}/lecture/${lecture.lectureID}/tree`)}
            lectureClick={() => router.push(`/course/${courseID}/lecture/${lecture.lectureID}`)}
          />
        ))}
      </div>
    </Container.MainContainer>
  );
}
