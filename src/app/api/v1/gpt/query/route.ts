import OpenAI from "openai";

export async function POST(request: Request): Promise<Response> {
    try {
        const { prompt } = await request.json() as {
            prompt: string,
          };

        const openai = new OpenAI();

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `
                    Answer the user's questions in Markdown format.
                    Each content should only consist of title-detail format.
                    Construct titles such that the detail can be inferred independently from other title-detail pairs.
                    Answer in Korean. Use * to make important keywords bold:
                    
                    Output format:
                    [{"title":"","detail":""},{"title":"","detail":""}, ...]

                    The user's question is: ${prompt}
                `,
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
                success: true,
                message: "답변 생성에 실패했습니다",
                data: error
            }),
        );
    }
}