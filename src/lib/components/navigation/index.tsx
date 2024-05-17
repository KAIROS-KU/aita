"use client"

import SampleData from "@/app/sample_data"
import Button from "./button"
import Icon from "./icons"
import Image from "next/image"

type onButton = "home" | "notes" | "noti" | "tree"

export default function Navigation({
    onButton
}: {
    onButton: onButton
}) {
    return (
        <div className="flex flex-row bg-main-500 h-screen w-min">
            <div className="px-4 pt-12 pb-6 flex flex-col justify-between items-center w-min">
                <div className="px-2 py-4 flex flex-col gap-5 justify-center bg-neutral-transparent" style={{ borderRadius: 50 }}>
                    <Icon.Home onOff={onButton === "home"} />
                    <Icon.Notes onOff={onButton === "notes"} />
                    <Icon.Noti onOff={onButton === "noti"} />
                    <Icon.Tree onOff={onButton === "tree"} />
                </div>
                <Icon.Settings />
            </div>
            <div className="px-4 pt-12 flex flex-col gap-5 bg-neutral-200" style={{ borderRadius: "25px 0 0 25px" }}>
                <div className="p-3 w-full flex flex-row gap-4 items-center">
                    <Image alt="sample" src={SampleData.image} width={50} height={50} className="rounded-full" style={{ objectFit: "cover", aspectRatio: "1" }} />
                    <div className="text-h1-b-20">{SampleData.name}</div>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <Button.Recent text="최근 강의" onClick={() => { }} />
                    {SampleData.courses.map((course, index) => (
                        <Button.Course key={index} text={course.courseName} onClick={() => { }} />
                    ))}
                    <div className="p-6">
                        <Button.AddCourse text="강의 추가" onClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    )
}