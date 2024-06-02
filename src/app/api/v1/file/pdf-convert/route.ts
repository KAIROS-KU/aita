export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { pdfUrl } = await request.json();

    const lambdaResponse = await fetch('https://l3nqjnorcil5vwljwdn73mqcui0mpzkg.lambda-url.ap-northeast-2.on.aws', {
      method: 'POST',
      body: JSON.stringify({ pdf_url: pdfUrl })
    });

    const responseBody = await lambdaResponse.json();
    
    return new Response(
      JSON.stringify(responseBody),
      { status: lambdaResponse.status }
    );
  } catch (error) {
    console.error('Error:', error || error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'PDF 변환에 실패했습니다.',
        data: error || 'Internal Server Error'
      }),
      { status: 500 }
    );
  }
}
