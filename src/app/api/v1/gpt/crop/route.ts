import OpenAI from "openai";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            prompt,
            fileURL,
            headlineContents
        } = await request.json() as {
            prompt: string,
            fileURL: string,
            headlineContents: string
        };

        const openai = new OpenAI({

        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": `
                                Answer the user's prompt using the headline-contents pair of the lecture's material and an image that the user wants to focus on.
                                Please write in this format only: [{"title":"", "detail":""}, {"title":"", "detail":""}, ...]
                                Return the response in JSON format without any other characters.
                                The user's prompt is: ${prompt}
                                The headline-contents of the lecture material is as follows: ${headlineContents}
                                `
                        },
                        {
                            "type": "image_url",
                            "image_url": { "url": fileURL }
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