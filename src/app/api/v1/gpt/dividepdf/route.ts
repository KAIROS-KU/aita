import { PDFDocument } from 'pdf-lib';
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { file } = await request.json();

    const pdfBuffer = Buffer.from(file, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    const pageCount = pdfDoc.getPageCount();
    const individualPages = [];

    for (let i = 0; i < pageCount; i++) {
      const newPdfDoc = await PDFDocument.create();
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);

      const newPdfBytes = await newPdfDoc.save();
      individualPages.push(Buffer.from(newPdfBytes).toString('base64'));
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "PDF 분할에 성공했습니다",
        data: { pages: individualPages },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "PDF 분할에 실패했습니다",
        data: error,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
