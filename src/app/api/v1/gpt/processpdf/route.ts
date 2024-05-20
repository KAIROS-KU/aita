import OpenAI from "openai";

export async function POST(request: Request) {
    try {
        const { lectureFile } = await request.json() as { lectureFile: string };

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `
                                Please explain the content of this lecture material as "headline - contents".
                                If there are several headline - contents, sum them into one headlines like A&B-a&b.
                                Only the escape character \\" is allowed.
                                Please write in this format only: {"headline":"~", "contents":"~"}
                        `
                        },
                        {
                            type: "image_url",
                            image_url: {
                                "url": lectureFile,
                            },
                        },
                    ],
                },
            ],
        });

        const result = response.choices[0].message.content

        return new Response(
            JSON.stringify({
                success: true,
                message: "강의자료 내용 분석에 성공했습니다",
                data: result
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