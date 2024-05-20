import { fromPath } from 'pdf2pic';

export default async function convertPdfToImages(pdfPath: string) {
    const options = {
        density: 100,
        format: "png",
        width: 600,
        height: 600,
        responseType: "image"
    };
    const convert = fromPath(pdfPath, options).bulk(-1);
    return convert;
}