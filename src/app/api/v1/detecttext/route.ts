export async function POST(request: Request) {
    try {
        const { file } = await request.json();

        const firebaseFunctionUrl = 'https://asia-northeast3-kairos-3326d.cloudfunctions.net/detectText';

        const fileType = 'pdf'
        const body = { fileType, image: file };

        const response = await fetch(firebaseFunctionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: '텍스트 추출에 성공했습니다',
                data: await response.json(),
            }),
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: '텍스트 추출에 실패했습니다',
                data: error,
            }),
        )
    }
}