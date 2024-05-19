"use client"

import ReadCourseUseCase from "../../../domain/course/read_course_use_case"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function IndexPage() {
    const router = useRouter()

    const readCourses = async () => {
        const use_case = new ReadCourseUseCase()
        const res = await use_case.read()
        if (!res.success) alert("일시적인 오류가 발생했습니다. 관리자에게 문의주세요.")
        const courses = res.data
        const firstCourseID = courses[0]?.courseID
        if (firstCourseID) router.push(`/course/${firstCourseID}`)
        else router.push("/course/create")
    }

    useEffect(() => {
        readCourses()
    }, [])

    return <></>
}