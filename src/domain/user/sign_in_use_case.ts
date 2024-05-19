import route from "@/types/route";

export default class SignInUseCase {
    async signIn(email: string, pwd: string): Promise<{ success: boolean; message: string; data: any; }> {
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