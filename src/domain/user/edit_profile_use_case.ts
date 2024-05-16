import route from "@/types/route";

export default class EditProfileUseCase {
    async edit(
        email: string,
        userName: string,
        profilePic: string,
    ): Promise<Response> {
        const date = new Date()
        const yearMonthAndDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const path = `/profile/${userName}/${yearMonthAndDate}`
        const fileRes = await fetch(`${route}/api/v1/file/upload`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path,
                profilePic
            }),
        })

        const fileURL = await fileRes.json().then((res) => {
            return res.data
        })

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