// all lecture - all chapter - all node까지 가져오는 유즈케이스

import { LectureProps } from "@/types/route";
import route from "@/types/route";

export default class ReadEntireTreeUseCase {
    async readTree(courseID: string): Promise<ApiResponse> {
        // read all lectures
        // lectures.forEach read all chapters
        // chapters.forEach read all nodeOne
        // nodeOne.forEach read all nodeTwo

        const lecRes = await fetch(`${route}/api/v1/lecture/read/multiple`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID
            }),
        })
        const lec: ApiResponse = await lecRes.json();
        const treeData = lec.data
        if (!lec.success) return (lec)

        treeData.forEach(async (lec: LectureProps, index: number) => {
            const lectureID = lec.lectureID
            const chapRes = await fetch(`${route}/api/v1/chapter/read`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseID,
                    lectureID
                }),
            })
            const chap: ApiResponse = await chapRes.json();
            if (!chap.success) return (chap)
            treeData[index].chapters = chap.data

            chap.data.forEach(async (chapter: any, index: number) => {
                const chapterID = chapter.chapterID
                const nodeRes = await fetch(`${route}/api/v1/node/one/read/multiple`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        courseID,
                        lectureID,
                        chapterID
                    }),
                })
                const node: ApiResponse = await nodeRes.json();
                if (!node.success) return (node)
                if(treeData[index]) treeData[index].chapters[index].node = node.data

                // node.data.forEach(async (node: any, index: number) => {
                //     const nodeOneID = node.nodeOneID
                //     const nodeTwoRes = await fetch(`${route}/api/v1/node/two/multiple/read`, {
                //         method: "POST",
                //         headers: { 'Content-Type': 'application/json' },
                //         body: JSON.stringify({
                //             nodeOneID
                //         }),
                //     })
                //     const nodeTwo: ApiResponse = await nodeTwoRes.json();
                //     if (!nodeTwo.success) return (nodeTwo)
                //     treeData[index].chapters[index].nodeOne[index].nodeTwo = nodeTwo.data
                // })
            })
        })

        return {
            success: true,
            message: "트리를 성공적으로 불러왔습니다.",
            data: treeData
        }
    }
}