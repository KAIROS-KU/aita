import route from "@/types/route";

export default class ModifyNodeOneUseCase { // TODO: 수정사항 전체 보내기로 했던가?
    async modify(
        nodeID?: string,
        title?: string,
        detail?: string,
        prompt?: string,
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/node/modify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nodeID,
                title,
                detail,
                prompt
            }),
        })
        return res.json()
    }
}