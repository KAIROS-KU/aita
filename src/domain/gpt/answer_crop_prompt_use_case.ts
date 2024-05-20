import route from "@/types/route"

export default class AnswerCropPromptUseCase {
    async generate(
        prompt: string,
        cropImage: File
    ){
        const formData = new FormData();
        formData.append("path", `crop/${prompt}`);
        formData.append("file", cropImage);

        const fileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: formData
        });

        const fileURL = await fileRes.json().then((res) => {
            return res.data
        })

        const res = await fetch(`${route}/api/v1/gpt/crop`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt,
                fileURL
            }),
        })
        return res.json()
    }
}