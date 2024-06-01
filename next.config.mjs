/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'firebasestorage.googleapis.com',
            'aita-pdftoimage.s3.amazonaws.com'
        ],
    },
}

export default nextConfig;
