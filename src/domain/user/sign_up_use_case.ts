import route from "@/types/route";

export default class SignUpUseCase {
    async signUp(
        email: string,
        userName: string,
        pwd: string,
        profilePic?: File,
    ): Promise<ApiResponse> {
        const signUpRes = await fetch(`${route}/api/v1/auth/signup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                pwd: pwd
            }),
        })

        const response = await signUpRes.json()
        if (!response.success) return response
        const uid = response.data

        const formData = new FormData();
        formData.append("path", `profile/${uid}`);
        if (profilePic) formData.append("file", profilePic);

        const storageRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            body: formData
        })

        const storageResponse = await storageRes.json()
        if (!storageResponse.success) return storageResponse

        const fileURL = storageResponse.data

        const createUserRes = await fetch(`${route}/api/v1/user/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid,
                email,
                userName,
                fileURL,
            }),
        })
        return createUserRes.json()
    }
}