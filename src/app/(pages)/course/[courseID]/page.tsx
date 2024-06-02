"use client"

import Container from "@/lib/components/container";
import Components from "./components";
import GlobalButton from "@/lib/components/global_button";
import { CourseProps, LectureProps } from "@/types/route";
import GlobalComponents from "@/lib/components/global_components";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReadCourseUseCase from "../../../../domain/course/read_course_use_case";
import ReadLectureUseCase from "../../../../domain/lecture/read_lecture_use_case";
import Loader from "@/lib/components/loader";
import CreateLectureUseCase from "../../../../domain/lecture/create_lecture_use_case";

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
    const res = await find_course_use_case.read(courseID);
    const courses = res.data;
    if (!courses.courseName) return router.push("/course/create");
    setCourse(courses);
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
    try {
      if (!lectureName || !file) return alert("모든 항목을 입력해주세요.")
      setLoading(true)
      const create_lecture_use_case = new CreateLectureUseCase();
      const response = await create_lecture_use_case.create(courseID, lectureName, file);
      console.log(response)
      if (!response.success) return alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.")
      getCourse();
    } catch (error) {
      alert("네트워크 오류가 발생했습니다. 관리자에게 문의주세요.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
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
      <div className="flex flex-col bg-neutral-100 p-5 mt-8 justify-center gap-3" style={{ borderRadius: 20 }}>
        <div className="flex justify-between item-center">
          <div className="text-h2-sb-20 flex items-center">강의자료</div>
          <GlobalButton.AddButton text="강의자료 추가" onClick={() => setOpen(true)} />
        </div>
        {
          lecture.length > 0 && (
            <div className="flex flex-col gap-3" style={{ overflowY: "scroll", maxHeight: 650 }}>
              {lecture?.map((lecture: LectureProps, index: number) => (
                <Components.LectureItem
                  key={index}
                  lectureName={lecture.lectureName}
                  createdAt={lecture.createdAt}
                  treeClick={() => router.push(`/course/${courseID}/lecture/${lecture.lectureID}/tree`)}
                  lectureClick={() => router.push(`/course/${courseID}/lecture/${lecture.lectureID}`)}
                />
              ))}
            </div>
          )
        }
      </div>
      <Components.AddLectureModal open={open} onClose={() => setOpen(false)} onClick={(e, file) => addLecture(e, file)} />
      {loading && <Loader />}
    </Container.MainContainer>
  );
}