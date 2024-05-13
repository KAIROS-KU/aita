import route from "@/types/route";

export default class DeleteNodeUseCase {
    async delete(
        nodeID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/node/delete`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nodeID
            }),
        })
        return res.json()
    }
}