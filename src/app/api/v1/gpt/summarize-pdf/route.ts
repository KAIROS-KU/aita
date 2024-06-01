import OpenAI from "openai";

export async function POST(request: Request) {
    try {
        const { lectureSummary } = await request.json() as { lectureSummary: string };

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                        Your goal is to summarize the content of the syllabus.
                        Summarize the content of this syllabus without any unnecessary information.
                        The extracted text of the syllabus is as follows: ${lectureSummary}
                    `,
                },
            ],
            model: "gpt-4o",
        });
        const content = completion.choices[0].message.content

        return new Response(
            JSON.stringify({
                success: true,
                message: "강의자료 요약에 성공했습니다",
                data: content
            }),
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "강의자료 요약에 실패했습니다",
                data: error
            }),
        )
    }
}