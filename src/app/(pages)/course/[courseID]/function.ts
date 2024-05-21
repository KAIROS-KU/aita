export default class ConvertFileToTextService {
    private firebaseFunctionUrl = 'https://asia-northeast3-kairos-3326d.cloudfunctions.net/detectText';

    async convert(file: File) {
        const fileType = file.type.includes('pdf') ? 'pdf' : 'image';

        try {
            // Convert file to Base64
            const base64 = await this.fileToBase64(file);
            const body = fileType === 'pdf' ? { fileType, pdf: base64 } : { fileType, image: base64 };

            // Call the Firebase Cloud Function
            const response = await fetch(this.firebaseFunctionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.status === 200) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        message: '텍스트 추출에 성공했습니다',
                        data: await response.json(),
                    }),
                )
            } else {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: '텍스트 추출에 실패했습니다',
                        data: await response.json(),
                    }),
                )
            }
        } catch (error: any) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: '텍스트 추출에 실패했습니다',
                    data: error,
                }),
            )
        }
    }

    private async fileToBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString().split(',')[1]);
                } else {
                    reject(new Error('Failed to read file.'));
                }
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
}