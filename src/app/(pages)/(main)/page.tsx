"use client"

import SignInUseCase from "../../../domain/user/sign_in_use_case";
import Container from "@/lib/components/container";
import Loader from "@/lib/components/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogInPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const signIn = async (signInData: LogInProps) => {
        setLoading(true)
        const use_case = new SignInUseCase()
        const res = await use_case.signIn(signInData.email, signInData.password)
        if (res.success) router.push("/course")
        setLoading(false)
    }

    return (
        <Container.LogInContainer onClick={(signInData) => signIn(signInData)}>
            <div className="flex items-center justify-center bg-main-100 w-full h-screen">
                <svg width="268" height="59" viewBox="0 0 268 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.8 59L30.1 0.2H56.1L85.3 59H63.8L58.9 48.3H27.3L21.8 59H0.8ZM32.8 34.5H53.3L43.6 13.2H42.6L32.8 34.5ZM94.1328 59V0.2H113.333V59H94.1328ZM147.089 59V13.7H123.289V0.0999954H190.589V13.7H166.489V59H147.089ZM183.417 59L212.717 0.2H238.717L267.917 59H246.417L241.517 48.3H209.917L204.417 59H183.417ZM215.417 34.5H235.917L226.217 13.2H225.217L215.417 34.5Z" fill="#FF6262" />
                </svg>
            </div>
            {loading && <Loader />}
        </Container.LogInContainer>
    )
}