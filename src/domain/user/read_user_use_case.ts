import route from "@/types/route";

export default class ReadUserUseCase {
    async read(): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/user/read`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
        })
        const data: ApiResponse = await res.json();
        return data;
    }
}