import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export async function POST(request: Request) {
    try {

        const user = auth.currentUser;
        if (!user) return new Response(
            JSON.stringify({
                success: false,
                message: "로그인이 되어있지 않습니다",
                data: null
            })
        );

        const data = await signOut(auth);

        return new Response(
            JSON.stringify({
                success: true,
                message: "로그아웃에 성공했습니다",
                data: data
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "로그아웃에 실패했습니다",
                data: error
            })
        );
    }
}
