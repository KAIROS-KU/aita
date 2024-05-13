import route from "@/types/route";

export default class SignOutUseCase {
    async signOut(
        userID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/auth/signout`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID
            }),
        })
        return res.json()
    }
}