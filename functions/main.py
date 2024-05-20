from pdf2image import convert_from_path

def pdf_to_jpg(pdf_path):
    images = convert_from_path(pdf_path)
    return images