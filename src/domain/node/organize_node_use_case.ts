import route, { ChapterProps, UnorganizedNodeProps } from "@/types/route"

export default class OrganizeNodeUseCase {
    // 노드별로 위치 지정
    private async organizeNode(
        chapterList: ChapterProps[],
        nodeData: UnorganizedNodeProps[]
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/gpt/organizetree`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chapterList,
                nodeData,
            }),
        })
        const response = await res.json()
        // const data = JSON.parse(response.data)
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
        console.log(response)
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
        console.log(response)
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
            console.log(chapterList, nodeData, courseID, lectureID)
            const res = await this.organizeNode(chapterList, nodeData)
            const data = JSON.parse(res.data)
            
            return {
                success: true,
                message: "트리 생성에 성공했습니다",
                data: data,
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