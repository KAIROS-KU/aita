import OpenAI from "openai";

export async function POST(request: Request): Promise<Response> {
    try {
        const { prompt, cropImage } = await request.json() as {
            prompt: string,
            cropImage: string
        };

        const openai = new OpenAI({
            
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-05-13",
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": `
                                Please answer the user's prompt using the detail of this lecture material.
                                Return your answer as a "title - detail" pair.
                                Only the escape character \\" is allowed.
                                Please write in this format only: [{"title":"", "detail":""}, {"title":"", "detail":""}, ...]
                                The user's prompt is: ${prompt}
                                `
                        },
                        {
                            "type": "image_url",
                            "image_url": { "url": cropImage }
                        },
                    ],
                }
            ]
        });
        const content = completion.choices[0].message.content

        return new Response(
            JSON.stringify({
                success: true,
                message: "답변 생성에 성공했습니다",
                data: content
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: true,
                message: "답변 생성에 실패했습니다",
                data: error
            }),
        );
    }
}