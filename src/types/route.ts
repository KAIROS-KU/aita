const route = process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_ENVIRONMENT === "test"
        ? "https://aita-dusky.vercel.app/"
        : "https://example.com";
export default route;