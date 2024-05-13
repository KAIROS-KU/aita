const route = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? "http://localhost:3000" : "https://example.com";
export default route;