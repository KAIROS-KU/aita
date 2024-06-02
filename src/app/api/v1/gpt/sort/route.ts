import { ChapterProps } from "@/types/route";
import OpenAI from "openai";
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
    try {
        const { prompt, chapterList } = await request.json() as { prompt: string, chapterList: ChapterProps[] };

        const openai = new OpenAI({
            
        });

        const systemPrompt = `
            You are an AI agent responsible for judging the user inquiry's chapter.
            Your goal is to iteratively compare the user inquiry with the following chapters, and confirm the user inquiry's chapter.

            Please classify the user's inquiry into one of the following chapters.
            Do not say anything other than the page number(1, 2, 3, 4, 5, ...). Just print the page number.
            
            Chapters: ${JSON.stringify(chapterList)}

            Response format:
            1
            2
            3
            4
            5
            .
            .
            .
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-05-13",
            messages: [
                { "role": "system", "content": systemPrompt },
                { "role": "user", "content": `${prompt}` },
            ],
            temperature: 0,
        });

        const mostRelevantChapter = completion.choices[0].message.content;
        return new Response(
            JSON.stringify({
                success: true,
                message: "답변 생성에 성공했습니다",
                data: mostRelevantChapter
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