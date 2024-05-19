"use client"

import Container from "@/lib/components/container";
import Lectures from "./lectures";
import GlobalButton from "@/lib/components/global_button";
import { CourseProps, LectureProps } from "@/app/sample_data";
import GlobalComponents from "@/lib/components/global_components";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReadCourseUseCase from "../../../../domain/course/read_course_use_case";
import CreateLectureUseCase from "../../../../domain/lecture/create_lecture_use_case";
import ReadLectureUseCase from "../../../../domain/lecture/read_lecture_use_case";
import Loader from "@/lib/components/loader";

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false)
  const courseID = params.courseID as string;
  const [course, setCourse] = useState({} as CourseProps);
  const [lecture, setLecture] = useState<LectureProps[]>([]);
  const [open, setOpen] = useState(false);

  const getCourse = async () => {
    setLoading(true)
    const find_course_use_case = new ReadCourseUseCase();
    const res = await find_course_use_case.read();
    const courses = res.data;
    const course = courses?.find((course: CourseProps) => course.courseID === courseID);
    setCourse(course);
    getLectures();
    setLoading(false)
  }

  const getLectures = async () => {
    setLoading(true)
    const read_lecture_use_case = new ReadLectureUseCase();
    const res = await read_lecture_use_case.read(courseID);
    if (res.success) setLecture(res.data);
    setLoading(false)
  }

  useEffect(() => {
    getCourse()
  }, [])


  const addLecture = async (lectureName: string, file: File) => {
    setLoading(true)
    const create_lecture_use_case = new CreateLectureUseCase();
    const res = await create_lecture_use_case.create(courseID, lectureName, file);
    if (res.success) {
      getCourse();
      setOpen(false);
    }
    setLoading(false)
  }

  return (
    <Container.MainContainer>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4 items-end">
          <GlobalComponents.CourseName name={course?.courseName} />
          <GlobalComponents.CourseCode code={course?.courseCode} />
        </div>
        <GlobalComponents.ProfName name={course?.profName} />
      </div>
      <div className="flex flex-col gap-3 bg-neutral-100 p-5 mt-8" style={{ borderRadius: 20 }}>
        <div className="flex justify-between">
          <div className="text-h2-sb-20 pb-5">강의자료</div>
          <GlobalButton.AddButton text="강의자료 추가" onClick={() => setOpen(true)} />

        </div>
        {lecture?.map((lecture: LectureProps, index: number) => (
          <Lectures.LectureItem
            key={index}
            lectureName={lecture.lectureName}
            createdAt={lecture.createdAt}
            treeClick={() => router.push(`/course/${courseID}/lecture/${lecture.lectureID}/tree`)}
            lectureClick={() => router.push(`/course/${courseID}/lecture/${lecture.lectureID}`)}
          />
        ))}
      </div>
      <Lectures.AddLectureModal open={open} onClose={() => setOpen(false)} onClick={(e, file) => addLecture(e, file)} />
      {loading && <Loader />}
    </Container.MainContainer>
  );
}
