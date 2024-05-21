import route from "@/types/route";

export default class CreateLectureAndGenerateChaptersUseCase {
    async createLecture(
        courseID: string,
        lectureName: string,
        lectureID: string,
        textPair: { file: File, text: string }[]
    ) {
        const uploadFilesAndGetUrls = async (textPair: { file: File, text: string }[], courseID: string, lectureName: string) => {
            console.log(textPair)
            const fileURLArray = await Promise.all(
                textPair.map(async (file, index) => {
                    console.log(file);
                    const formData = new FormData();
                    formData.append("path", `course/${courseID}/lectures/${lectureName}`);
                    formData.append("file", file.file);

                    const fileRes = await fetch(`${route}/api/v1/file/upload`, {
                        method: "POST",
                        body: formData
                    });

                    const fileURL = await fileRes.json().then((res) => res.data);

                    console.log({ index: index, url: fileURL, text: file.text });

                    return { index: index, url: fileURL, text: file.text };
                })
            );

            return fileURLArray;
        };

        const fileURLArray = await uploadFilesAndGetUrls(textPair, courseID, lectureName);
        console.log(fileURLArray)


        const res = await fetch(`${route}/api/v1/lecture/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseID,
                lectureName,
                fileURLArray
            }),
        })
        const data: ApiResponse = await res.json();
        if (!data.success) return data;

        console.log(data)

        const processFileURLs = async (fileURLArray: { index: number, url: string, text: string }[]) => {
            const headlines: any = await Promise.all(
                fileURLArray.map(async (pair) => {
                    console.log(pair);
                    const text = pair.text;
                    const pdfRes = await fetch(`${route}/api/v1/gpt/processpdf`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text }),
                    });

                    const pdfJson = await pdfRes.json();
                    if (!pdfRes.ok || !pdfJson.success) return pdfJson;

                    console.log(pdfJson.data)
                    const chapterData = JSON.parse(pdfJson.data);
                    console.log(chapterData)
                    const headline = chapterData.headline;
                    return headline;
                })
            );

            return headlines;
        };

        const headlines = await processFileURLs(fileURLArray);
        console.log(headlines);

        const res2 = await fetch(`${route}/api/v1/gpt/generatechapter`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                headlines
            }),
        })
        const data2 = await res2.json();
        if (!data2.success) return data2;
        const chapters = JSON.parse(data2.data)

        chapters.forEach(async (chapterName: string, index: number) => {
            const createChapRes = await fetch(`${route}/api/v1/chapter/create`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseID,
                    lectureID,
                    chapterName
                }),
            })
            const createChapData = await createChapRes.json();
            if (!createChapData.success) return createChapData;
        })

        
    }


    // async generateChapters(
    //     fileURLArray: string[]
    // ): Promise<ApiResponse> {

    //     const headlines: string[] = []

    //     fileURLArray.forEach(async (image, index) => {
    //         const pdfRes = await fetch(`${route}/api/v1/gpt/processpdf`, {
    //             method: "POST",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 image
    //             }),
    //         })

    //         const pdfJson = await pdfRes.json()
    //         const chapterData = JSON.parse(pdfJson.data);
    //         const headline = chapterData.map((chapter: { headline: string, contents: string }) => chapter.headline);
    //         headlines.push(headline);
    //     })

    //     const res = await fetch(`${route}/api/v1/gpt/generatechapter`, {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             headlines
    //         }),
    //     })
    //     return res.json()
    // }
}