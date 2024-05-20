import route from "@/types/route";

export default class CreateNodeTwoUseCase {
    async create(
        title: string,
        detail: string,
        prompt?: string,
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/node/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                detail,
                prompt,
            }),
        })
        return res.json()
    }
}