import OpenAI from "openai";
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { text } = await request.json() as { text: string };

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                        Your goal is to summarize the content of the lecture material in a headline - contents format.
                        Explain the content of this lecture material as an array of {"headline":"~", "contents":"~"}.
                        Write in this format only: [{"headline":"~", "contents":"~"}, {"headline":"~", "contents":"~"}, ...]
                        RETURN RESPONSE IN JSON FORMAT WITHOUT ANY OTHER CHARACTERS.
                        The lecture material is as follows: ${text}
                    `,
                },
            ],
            model: "gpt-4o",
        });
        const content = completion.choices[0].message.content
        if(!content) return new Response(
            JSON.stringify({
                success: false,
                message: "강의자료 내용 분석에 실패했습니다",
                data: content
            }),
        )

        return new Response(
            JSON.stringify({
                success: true,
                message: "강의자료 내용 분석에 성공했습니다",
                data: content
            }),
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "강의자료 내용 분석에 실패했습니다",
                data: error
            }),
        )
    }
}