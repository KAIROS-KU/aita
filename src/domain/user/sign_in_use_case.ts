import route from "@/types/route";

export default class SignInUseCase {
    async signIn(
        id: string,
        pwd: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/auth/signin`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                pwd
            }),
        })
        return res.json()
    }
}