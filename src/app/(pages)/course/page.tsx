"use client"

import SampleData from "@/app/sample_data"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function IndexPage() {
    const router = useRouter()
    useEffect(() => {
        const firstCourseID = SampleData.courses[0].courseID
        router.push(`/course/${firstCourseID}`)
    }, [])
    return <></>
}