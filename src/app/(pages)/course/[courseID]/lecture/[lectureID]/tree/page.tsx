"use client"

import Container from "@/lib/components/container";
import { CourseProps } from "@/app/sample_data";
import GlobalComponents from "@/lib/components/global_components";
import Tree from "./components";
import { useEffect, useState } from "react";
import Loader from "@/lib/components/loader";
import ReadCourseUseCase from "../../../../../../../domain/course/read_course_use_case";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({} as CourseProps);
    const courseID = params.courseID as string;

    const readCourseData = async () => {
        setLoading(true)
        const find_course_use_case = new ReadCourseUseCase();
        const res = await find_course_use_case.read();
        const courses = res.data;
        const course = courses?.find((course: CourseProps) => course.courseID === courseID);
        setCourse(course);
        setLoading(false)
      }

    useEffect(() => {
        readCourseData()
    }, [])

    return (
        <Container.MainContainer>
            <div className="h-full flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-end">
                    <GlobalComponents.CourseName name={course?.courseName} />
                    <GlobalComponents.CourseCode code={course?.courseCode} />
                </div>
                <div className="flex-grow">
                    <Tree courseID={courseID} />
                </div>
            </div>
            {loading && <Loader />}
        </Container.MainContainer>
    );
}
