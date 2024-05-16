import route from "@/types/route";

export default class DeleteAccountUseCase {
    async delete(
        userID: string
    ): Promise<Response> {
        const res = await fetch(`${route}/api/v1/auth/delete`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID
            }),
        })
        return res.json()
    }
}