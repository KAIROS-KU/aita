import route from "@/types/route";

export default class GenerateResponseUseCase {
    async generate(
        prompt: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/gpt`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt
            }),
        })
        return res.json()
    }
}