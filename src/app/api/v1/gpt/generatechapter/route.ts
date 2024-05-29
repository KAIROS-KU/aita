import OpenAI from "openai";

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
                    위 주제들을 크게 5개의 목차로 분류해해서 JSON 형태로 반환해.
                    출력형태는 아래와 같아:
                    [
                        {
                            "chapterName": "목차1",
                            "headlines": ["주제1", "주제2", "주제3", "주제4"]
                        },
                        {
                            "chapterName": "목차2",
                            "headlines": ["주제1", "주제2", "주제3", "주제4"]
                        },
                        {
                            "chapterName": "목차3",
                            "headlines": ["주제1", "주제2", "주제3", "주제4"]
                        },
                        ...
                    ]
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