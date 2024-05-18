"use client"

import Container from "@/lib/components/container";
import Components from "./components";
import GlobalComponents from "@/lib/components/global_components";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter()
    return (
        <Container.MainContainer>
            <div className="flex flex-col w-full gap-9">
                <div className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                        <path d="M2.5 4.25H10C11.3261 4.25 12.5979 4.77678 13.5355 5.71447C14.4732 6.65215 15 7.92392 15 9.25V26.75C15 25.7554 14.6049 24.8016 13.9017 24.0983C13.1984 23.3951 12.2446 23 11.25 23H2.5V4.25Z" stroke="#1F1717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M27.5 4.25H20C18.6739 4.25 17.4021 4.77678 16.4645 5.71447C15.5268 6.65215 15 7.92392 15 9.25V26.75C15 25.7554 15.3951 24.8016 16.0983 24.0983C16.8016 23.3951 17.7554 23 18.75 23H27.5V4.25Z" stroke="#1F1717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-h1-b-26">강의 만들기</div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <Components.CourseInput
                            label="강의명"
                            placeholder="강의명을 입력해주세요"
                            onChange={() => { }}
                        />
                        <Components.CourseInput
                            label="학수번호"
                            placeholder="학수번호를 입력해주세요"
                            onChange={() => { }}
                        />
                        <Components.CourseInput
                            label="교수명"
                            placeholder="교수명을 입력해주세요"
                            onChange={() => { }}
                        />
                    </div>

                    <Components.CreateCourseContent
                        label="강의계획서"
                        onChange={() => { }}
                    />
                </div>
                <div className="w-64 self-center">
                    <GlobalComponents.MainButton
                        text="강의 생성하기"
                        onClick={() => router.push("/course")}
                    />
                </div>
            </div>
        </Container.MainContainer>
    )
}