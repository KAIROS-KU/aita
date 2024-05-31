import OpenAI from "openai";

export async function POST(request: Request) {
    try {
        const {
            prompt,
            headlineContents
        } = await request.json() as {
            prompt: string,
            headlineContents: string
        };

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const systemPrompt = `
        Your goal is to generate answers in title-detail format based on the given prompt and headline-contents information about this lecture material.
        Explain the content of this lecture material as an array of {"index": "~", "title":"~", "detail":"~"}.

        Construct titles such that the detail can be inferred independently from other title-detail pairs.
        Answer in Korean.
        
        Output format: [{"index": "0", "title":"","detail":""},{"index": "1", "title":"","detail":""}, ...] in JSON format.
        ONLY ANSWER IN JSON FORMAT.

        Return at least 3 title-detail pairs.

        The headline-contents of the lecture material is as follows: ${headlineContents}

        The user's question is: ${prompt}
    `;

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: systemPrompt,
                },
            ],
            model: "gpt-4o",
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
                success: false,
                message: "답변 생성에 실패했습니다",
                data: error
            }),
        );
    }
}