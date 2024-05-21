import route from "@/types/route";

export default class DividePDFUseCase {
    async dividePDF(file: File) {
        const res = await fetch(`${route}/api/v1/gpt/dividepdf`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                file
            }),
        })

        const data = await res.json()
        return data
    }
}