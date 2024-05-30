export async function POST(request: Request) {
    try {
      const { pdfURL } = await request.json();

      
  
      const lambdaResponse = await fetch('https://l3nqjnorcil5vwljwdn73mqcui0mpzkg.lambda-url.ap-northeast-2.on.aws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pdf_url: pdfURL })
      });
  
      const response = await lambdaResponse.json();
  
      const { statusCode, body } = response.data;
      if (statusCode !== 200) {
        throw new Error('Failed to convert PDF');
      }
  
      const responseBody = JSON.parse(body);
      const images = responseBody.images;
  
      return new Response(
        JSON.stringify({
          success: true,
          message: "PDF 변환에 성공했습니다.",
          data: images
        })
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "PDF 변환에 실패했습니다.",
          data: error
        })
      );
    }
  }
  