import route from "@/types/route";

export default class SignUpUseCase {
    async signUp(
        email: string,
        userName: string,
        profilePic: string,
        courseURL: string,
        string: string
    ): Promise<Response> {
        const signUpRes = await fetch(`${route}/api/v1/auth/signup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: string,
                pwd: string
            }),
        })
        const response = await signUpRes.json()
        if (!response.success) return response
        const uid = response.data.uid
        
        const createUserRes = await fetch(`${route}/api/v1/user/create`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid,
                email,
                userName,
                profilePic,
                courseURL
            }),
        })
        return createUserRes.json()
    }
}