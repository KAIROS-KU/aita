import route from "@/types/route";

export default class SignInUseCase {
    async signIn(email: string, pwd: string): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/auth/signin`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                pwd
            }),
        });
        const data = await res.json();
        return data;
    }
}