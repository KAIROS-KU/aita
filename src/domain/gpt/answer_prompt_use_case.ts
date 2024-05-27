import route from "@/types/route";

export default class AnswerPromptUseCase {
    async generate(
        prompt: string,
        headlineContents: { headline: string, content: string }[]
    ): Promise<ApiResponse> {
        const contents = JSON.stringify(headlineContents)

        const res = await fetch(`${route}/api/v1/gpt/query`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt,
                contents
            }),
        })

        const response = await res.json()
        const data = JSON.parse(response.data)
        return {
            success: response.success,
            message: response.message,
            data: data
        }
    }
}