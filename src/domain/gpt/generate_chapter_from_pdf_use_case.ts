import route from "@/types/route"

export default class GenerateChapterFromPDFUseCase {
    async generate(){
        const res = await fetch(`${route}/api/v1/gpt/tree`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        })
        return res.json()
    }
}