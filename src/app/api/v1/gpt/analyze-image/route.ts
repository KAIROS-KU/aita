import OpenAI from "openai";
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            imageURL
        } = await request.json() as {
            imageURL: string
        };

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
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
                                    Your goal is to summarize the content of the lecture material in a headline - contents format.
                                    Explain the content of this lecture material as an array of {"headline":"~", "contents":"~"}.
                                    Write in this format only: [{"headline":"~", "contents":"~"}, {"headline":"~", "contents":"~"}, ...]
                                    RETURN RESPONSE IN JSON FORMAT WITHOUT ANY OTHER CHARACTERS.
                                    The lecture material is added as image_url as well: ${imageURL}
                                `
                        },
                        {
                            "type": "image_url",
                            "image_url": { "url": imageURL }
                        },
                    ],
                }
            ]
        });
        const content = completion.choices[0].message.content as string
        const contentArray = JSON.parse(content)
        const result = contentArray.includes("json") ? contentArray.replace("json", "") : contentArray

        return new Response(
            JSON.stringify({
                success: true,
                message: "답변 생성에 성공했습니다",
                data: result
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "답변 생성에 실패했습니다",
                data: error
            }),
        );
    }
}