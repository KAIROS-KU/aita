import { ChapterProps, UnorganizedNodeProps } from "@/types/route";
import OpenAI from "openai";
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

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

        const nodeTitleList = nodeList.map(node => node.title);

        const systemPrompt = `
            Find out which chapter the node belongs to and return the chapter's chapterID.
            The chapterList is as follows: ${JSON.stringify(chapterList)}.
            The nodeList is as follows: ${JSON.stringify(nodeTitleList)}.
            Insert the nodeID of the node into the chapterID of the chapter to which the node belongs.
            If the node does not belong to any chapter, insert the nodeID into NO RELATION.
            RETURN THE RESULT IN JSON FORMAT, DO NOT ADD ANY ADDITIONAL CHARACTERS.
            Return in the following JSON format:
            [
                {
                    "chapterID": "${chapterList[0].chapterID}",
                    "nodeID": ["~"]
                },
                {
                    "chapterID": "${chapterList[1].chapterID}",
                    "nodeID": ["~"]
                },
                {
                    "chapterID": "${chapterList[2].chapterID}",
                    "nodeID": ["~"]
                },
                {
                    "chapterID": "${chapterList[3].chapterID}",
                    "nodeID": ["~"]
                },
                {
                    "chapterID": "${chapterList[4].chapterID}",
                    "nodeID": ["~"]
                },
                {
                    "chapterID": "NO RELATION",
                    "nodeID": ["~"]
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
        if (result?.includes("json")) {
            const removeJson = result!.replace("json", "");
            const parsed = JSON.parse(removeJson);

            return new Response(
                JSON.stringify({
                    success: true,
                    message: "노드 분류에 성공했습니다",
                    data: parsed
                }),
            );
        } else return new Response(
            JSON.stringify({
                success: true,
                message: "노드 분류에 성공했습니다",
                data: result
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "노드 분류에 실패했습니다",
                data: error
            }),
        );
    }
}