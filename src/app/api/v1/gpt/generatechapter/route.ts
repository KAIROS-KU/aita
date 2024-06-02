import OpenAI from "openai";
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { headlines } = await request.json() as { headlines: string[] };

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                    ${headlines.join("\n")}
                    Divide the above topics into 5 chapters and return it in JSON format.
                    The output format is as follows:
                    """
                    [
                        {
                            "chapterName": "chapter1",
                            "headlines": ["topic1", "topic2", "topic3", "topic4"]
                        },
                        {
                            "chapterName": "chapter2",
                            "headlines": ["topic1", "topic2", "topic3", "topic4"]
                        },
                        {
                            "chapterName": "chapter3",
                            "headlines": ["topic1", "topic2", "topic3", "topic4"]
                        },
                        ...
                    ]
                    """
                    RETURN THE RESULT IN JSON FORMAT ONLY.
                `,
                },
            ],
            model: "gpt-4o",
        });
        const content = completion.choices[0].message.content?.replaceAll("```", "")
        const result = content?.includes("json") ? content?.replace("json", "") : content;

        return new Response(
            JSON.stringify({
                success: true,
                message: "목차 생성에 성공했습니다",
                data: result
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