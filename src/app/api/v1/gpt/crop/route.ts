export async function POST(request: Request) {
    return new Response(
        JSON.stringify({
            success: true,
            message: "파일 업로드에 성공했습니다",
        }),
    );
}