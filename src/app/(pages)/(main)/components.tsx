"use client"

import GlobalButton from "@/lib/components/global_button";
import GlobalComponents from "@/lib/components/global_components";
import { useRouter } from "next/navigation";

function LogInErrorModal({
    open,
    onClose,
    text
}: {
    open: boolean,
    onClose: () => void,
    text: string
}) {
    const router = useRouter()
    return (
        <GlobalComponents.Alert open={open} onClose={onClose}>
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-8">
                    <div className="text-h2-sb-20">{text}</div>
                    <div className="flex flex-col gap-3">
                        <GlobalButton.SubButton text="회원가입하기" onClick={() => router.push("/sign-up")} />
                        <GlobalButton.MainButton text="다시 로그인하기" onClick={onClose} />
                    </div>
                </div>
            </div>
        </GlobalComponents.Alert>
    );
}

const Components = {
    LogInErrorModal
}

export default Components;