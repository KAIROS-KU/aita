import route from "@/types/route";

export default class CheckUserAuthUseCase {
    async check(): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/auth/check`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        return data;
    }
}