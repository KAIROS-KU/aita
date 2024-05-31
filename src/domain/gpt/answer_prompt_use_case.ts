import route from "@/types/route";

export default class AnswerPromptUseCase {
    async generate(
        prompt: string,
        textContents: { headline: string, content: string }[]
    ): Promise<ApiResponse> {
        try {
            const headlineContents = JSON.stringify(textContents)

            const res = await fetch(`${route}/api/v1/gpt/query`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    headlineContents
                }),
            })

            const response = await res.json()
            
            return {
                success: response.success,
                message: response.message,
                data: JSON.parse(response.data)
            }
        } catch (error) {
            return {
                success: false,
                message: "요청에 실패했습니다",
                data: error
            }
        }
    }
}