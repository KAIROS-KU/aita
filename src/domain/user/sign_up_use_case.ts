import { storage } from "@/firebase";
import route from "@/types/route";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

        if (!profilePic) return response
        const storageRef = ref(
            storage,
            `profile/${uid}`
        );
        await uploadBytes(storageRef, profilePic);
        const URL = await getDownloadURL(storageRef);
        const fileURL = URL

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