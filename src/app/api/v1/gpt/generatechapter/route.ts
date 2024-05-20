import OpenAI from "openai";

export async function POST(request: Request) {
    try {
        const { headlines } = await request.json() as { headlines: string[] };

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });;

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                    
                `,
                },
            ],
            model: "gpt-4o",
        });
        const content = completion.choices[0].message.content

        return new Response(
            JSON.stringify({
                success: true,
                message: "목차 생성에 성공했습니다",
                data: content
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: true,
                message: "목차 생성에 실패했습니다",
                data: error
            }),
        );
    }
}