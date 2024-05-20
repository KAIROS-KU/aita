import { LectureProps } from "@/app/sample_data";
import route from "@/types/route"
import { NodeProps } from "postcss";

export default class GenerateTreeUseCase {
    async generate(
        courseID: string,
        nodeData: NodeProps[]
    ) {
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
                    lectureID
                }),
            })
            const chap: ApiResponse = await chapRes.json();
            if (!chap.success) return (chap)
            treeData[index].chapters = chap.data

            chap.data.forEach(async (chapter: any, index: number) => {
                const chapterID = chapter.chapterID
                const nodeRes = await fetch(`${route}/api/v1/node/one/multiple/read`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chapterID
                    }),
                })
                const node: ApiResponse = await nodeRes.json();
                if (!node.success) return (node)
                treeData[index].chapters[index].nodeOne = node.data

                node.data.forEach(async (node: any, index: number) => {
                    const nodeOneID = node.nodeOneID
                    const nodeTwoRes = await fetch(`${route}/api/v1/node/two/multiple/read`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            nodeOneID
                        }),
                    })
                    const nodeTwo: ApiResponse = await nodeTwoRes.json();
                    if (!nodeTwo.success) return (nodeTwo)
                    treeData[index].chapters[index].nodeOne[index].nodeTwo = nodeTwo.data
                })
            })
        })


        const res = await fetch(`${route}/api/v1/gpt/tree`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                treeData,
                nodeData,
            }),
        })
        return res.json()
    }
}