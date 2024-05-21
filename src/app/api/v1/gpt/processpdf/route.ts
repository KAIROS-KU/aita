import OpenAI from "openai";

export async function POST(request: Request) {
    try {
        const { text } = await request.json() as { text: string };

        const openai = new OpenAI({
            apiKey: "sk-proj-jDLH4QsIeM0qVBcceiB1T3BlbkFJpEAMIdhkp4GOn2et2DoW",
        });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                        Please explain the content of this lecture material as "headline - contents".
                        If there are several headline - contents, sum them into one headlines like A&B-a&b.
                        Please write in this format only: {"headline":"~", "contents":"~"}
                        RETURN RESPONSE IN JSON FORMAT WITHOUT ANY OTHER CHARACTERS.
                        RETURN RESPONSE IN JSON FORMAT WITHOUT ANY OTHER CHARACTERS.
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