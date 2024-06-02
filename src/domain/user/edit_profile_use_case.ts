import { storage } from "@/firebase";
import route from "@/types/route";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default class EditProfileUseCase {
    async edit(
        email: string,
        userName: string,
        profilePic: File,
    ): Promise<ApiResponse> {
        const date = new Date()
        const yearMonthAndDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        if (!profilePic) return {
            success: false,
            message: "프로필 사진을 업로드해주세요",
            data: null
        }
        const storageRef = ref(
            storage,
            `/profile/${userName}/${yearMonthAndDate}`
        );
        await uploadBytes(storageRef, profilePic);
        const URL = await getDownloadURL(storageRef);
        const fileURL = URL

        const res = await fetch(`${route}/api/v1/user/modify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                userName,
                fileURL,
            }),
        })
        return res.json()
    }
}