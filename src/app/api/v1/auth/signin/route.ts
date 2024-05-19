import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
    try {
        const { email, pwd } = await request.json() as {
            email: string,
            pwd: string,
        };
        const data = await signInWithEmailAndPassword(
            auth,
            email,
            pwd
        );

        const headers = new Headers();
        headers.append(
            "Set-Cookie",
            `userID=${data.user.uid}; Path=/; HttpOnly; Secure; SameSite=Strict`
        );

        return new Response(
            JSON.stringify({
                success: true,
                message: "로그인에 성공했습니다",
                data: data
            }),
            {
                status: 200,
                headers: headers,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "로그인에 실패했습니다",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}
