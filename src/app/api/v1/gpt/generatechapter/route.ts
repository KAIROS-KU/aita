import OpenAI from "openai";

export async function POST(request: Request) {
    try {
        const { headlines } = await request.json() as { headlines: string[] };

        const openai = new OpenAI({
            apiKey: "sk-proj-jDLH4QsIeM0qVBcceiB1T3BlbkFJpEAMIdhkp4GOn2et2DoW",
        });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                    ${headlines.join("\n")}
                    위 주제들을 크게 5개의 목차로 분류해줘.

                    출력형태는 아래와 같아:
                    "목차1": ["주제1", "주제2", "주제3", "주제4"],
                    "목차2": ["주제1", "주제2", "주제3", "주제4"],
                    "목차3": ["주제1", "주제2", "주제3", "주제4"]
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