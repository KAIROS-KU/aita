import { auth }from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
    try {
        const { email, pwd } = await request.json() as {
            email: string,
            pwd: string,
        };
        const data = await createUserWithEmailAndPassword(
            auth,
            email,
            pwd
        );

        const uid = data.user.uid

        const headers = new Headers();
        headers.append(
            "Set-Cookie",
            `userID=${uid}; Path=/; HttpOnly; Secure; SameSite=Strict`
        );

        return new Response(
            JSON.stringify({
                success: true,
                message: "회원가입에 성공했습니다",
                data: uid
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "회원가입에 실패했습니다",
                data: error
            })
        );
    }
}
