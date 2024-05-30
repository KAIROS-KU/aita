import route, { ChapterProps, UnorganizedNodeProps } from "@/types/route"

export default class OrganizeNodeUseCase {
    // 노드별로 위치 지정
    private async organizeNode(
        chapterList: any[],
        nodeList: UnorganizedNodeProps[]
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/gpt/organizetree`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chapterList,
                nodeList,
            }),
        })
        const response = await res.json()
        console.log(response)
        return {
            success: response.success,
            message: response.message,
            data: response.data,
        }
    }

    // 노드1 업로드
    private async uploadNodeOne(
        courseID: string,
        lectureID: string,
        chapterID: string,
        title: string,
        detail: string
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/node/one/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureID,
                chapterID,
                title,
                detail,
            })
        })
        const response = await res.json()
        return {
            success: response.success,
            message: response.message,
            data: response.data,
        }
    }

    // 노드1 foreach 노드2 업로드
    private async uploadNodeTwo(
        courseID: string,
        lectureID: string,
        chapterID: string,
        nodeOneId: string,
        title: string,
        detail: string,
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/node/two/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureID,
                chapterID,
                nodeOneId,
                title,
                detail,
            })
        })
        const response = await res.json()
        return {
            success: response.success,
            message: response.message,
            data: response.data,
        }
    }

    async organize(
        chapterList: ChapterProps[],
        nodeData: UnorganizedNodeProps[],
        courseID: string,
        lectureID: string,
    ): Promise<ApiResponse> {
        try {
            // 노드 분류
            const res = await this.organizeNode(chapterList, nodeData)
            console.log(res)
            const organizedNodeList = JSON.parse(res.data) as { chapterID: string, nodeID: string[] }[]
            console.log(organizedNodeList)

            // 노드1 업로드
            for (const node of nodeData) {
                const chapterID = organizedNodeList.find(organizedNode => organizedNode.nodeID.includes(node.title))?.chapterID
                console.log(chapterID)
                if (!chapterID) return {
                    success: false,
                    message: "노드1 업로드에 실패했습니다",
                    data: {},
                }
                if (chapterID === "NO RELATION") continue
                const res = await this.uploadNodeOne(courseID, lectureID, chapterID, node.title, node.detail)
                console.log(res)
                if (!res.success) return res
                // remove node from organizedNodeList
                organizedNodeList.filter(organizedNode => organizedNode.nodeID.includes(node.title))
            }
            console.log(organizedNodeList)

            const remainingNodes = nodeData.filter(node => !organizedNodeList.some(organizedNode => organizedNode.nodeID.includes(node.title)))
            console.log(remainingNodes)
            // 노드2 업로드
            const secondRes = await this.organizeNode(organizedNodeList, remainingNodes)
            console.log(secondRes)
            const organizedNodeList2 = JSON.parse(secondRes.data) as { chapterID: string, nodeID: string[] }[]
            console.log(organizedNodeList2)
            for (const node of remainingNodes) {
                const chapterID = organizedNodeList2.find(organizedNode => organizedNode.nodeID.includes(node.title))?.chapterID
                console.log(chapterID)
                if (!chapterID) return {
                    success: false,
                    message: "노드2 업로드에 실패했습니다",
                    data: {},
                }
                const nodeOneId = organizedNodeList.find(organizedNode => organizedNode.nodeID.includes(node.title))?.nodeID
                if (!nodeOneId) return {
                    success: false,
                    message: "노드2 업로드에 실패했습니다",
                    data: {},
                }
                const res = await this.uploadNodeTwo(courseID, lectureID, chapterID, nodeOneId[0], node.title, node.detail)
                console.log(res)
                if (!res.success) return res
            }

            return {
                success: true,
                message: "트리 생성에 성공했습니다",
                data: {},
            }
        } catch (error) {
            return {
                success: false,
                message: "트리 생성에 실패했습니다",
                data: error,
            }
        }
    }
}