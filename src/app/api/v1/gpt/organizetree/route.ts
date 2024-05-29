import { ChapterProps, UnorganizedNodeProps } from "@/types/route";
import OpenAI from "openai";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            chapterList,
            nodeList
        } = await request.json() as {
            chapterList: ChapterProps[],
            nodeList: UnorganizedNodeProps[]
        };

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const systemPrompt = `
            Find out which chapter the node belongs to and return the chapter's chapterID.
            The chapterList is as follows: ${JSON.stringify(chapterList)}
            The nodeList is as follows: ${JSON.stringify(nodeList)}
            Return the chapterID of the chapter to which the node belongs, or return "NO RELATION" if there is no relation.
            Return the chapterID or "NO RELATION" as a string, without ANY additional text.
            Return the chapterID or "NO RELATION" as a string, without ANY additional text.

            Return in the following format:
            [
                {
                    "chapterID": ${chapterList[0].chapterID},
                    "nodeID": ["node1ID", "node2ID", ...]
                },
                {
                    "chapterID": ${chapterList[1].chapterID},
                    "nodeID": ["node1ID", "node2ID", ...]
                },
                {
                    "chapterID": ${chapterList[2].chapterID},
                    "nodeID": ["node1ID", "node2ID", ...]
                },
                {
                    "chapterID": ${chapterList[3].chapterID},
                    "nodeID": ["node1ID", "node2ID", ...]
                },
                {
                    "chapterID": ${chapterList[4].chapterID},
                    "nodeID": ["node1ID", "node2ID", ...]
                },
                {
                    "chapterID": NO RELATION,
                    "nodeID": ["node1ID", "node2ID", ...]
                },
            ]
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { "role": "system", "content": systemPrompt }
            ],
            temperature: 0,
        });

        const result = completion.choices[0].message.content;

        return new Response(
            JSON.stringify({
                success: true,
                message: "노드 분류에 성공했습니다",
                data: result
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: true,
                message: "노드 분류에 실패했습니다",
                data: error
            }),
        );
    }
}