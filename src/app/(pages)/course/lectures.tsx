"use client"

import formatDate from "@/lib/utils/format_date";
import { Timestamp } from "firebase/firestore";
import Button from "./[courseID]/button";
import GlobalButton from "@/lib/components/global_button";

function LectureItem({
    lectureName,
    createdAt,
    treeClick,
    lectureClick
}: {
    lectureName: string,
    createdAt: Date | Timestamp,
    treeClick: () => void,
    lectureClick: () => void
}) {
    return (
        <div className="p-5 bg-neutral-white flex justify-between w-full items-center " style={{ borderRadius: 20 }}>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M8.75 26.25C7.36929 26.25 6.25 25.1307 6.25 23.75V6.25C6.25 4.86929 7.36929 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 25.1307 22.6307 26.25 21.25 26.25H8.75Z" stroke="#1F1717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.25 3.75V11.25H23.75" stroke="#1F1717" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    <div className="text-h3-m-16">{lectureName}</div>
                </div>
                <div className="text-body-r-12 text-neutral-400">{formatDate(createdAt)}</div>
            </div>

            <div className="flex gap-3">
                <GlobalButton.SeeTree text="질문 트리" onClick={treeClick} />
                <Button.ToLearn text="강의 보기" onClick={lectureClick} />
            </div>
        </div>
    );
}

const Lectures = {
    LectureItem
}

export default Lectures;