"use client"

import { ReactNode, useState } from "react";
import Navigation from "../navigation";
import GlobalComponents from "../global_components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GlobalButton from "../global_button";

function MainContainer({ children }: { children: ReactNode }) {
    
    const [onButton, setOnButton] = useState<OnButton>("home")
    return (
        <div className="w-full h-screen box-border flex">
            <Navigation.Full onButton={onButton} />
            <div className="px-16 py-12 w-full h-full">
                {children}
            </div>
        </div>
    );
}

function LogInContainer({
    children,
    onClick
}: {
    children: ReactNode,
    onClick: (e: LogInProps) => void
}) {
    const [input, setInput] = useState<LogInProps>({
        email: "",
        password: ""
    })

    const router = useRouter();

    return (
        <div className="w-full h-full flex items-center">
            <div className="bg-neutral-200 h-screen px-20 box-border items-center justify-center flex flex-col" style={{ width: 420 }}>
                <div className="flex flex-col gap-5">
                    <div className="py-6 w-full text-h1-b-20 text-center">로그인해주세요.</div>
                    <div className="flex flex-col gap-2 w-full">
                        <GlobalComponents.InputField
                            onChange={(e) => setInput({ ...input, email: e })}
                            placeholder="이메일"
                        />
                        <GlobalComponents.Password
                            onChange={(e) => setInput({ ...input, password: e })}
                            placeholder="비밀번호"
                        />
                    </div>
                    <GlobalComponents.MainButton
                        text="로그인"
                        onClick={() => onClick(input)}
                    />
                </div>
                <div className="flex items-center absolute bottom-10" onClick={() => router.push("/sign-up")}>
                    <div className="text-body-r-12 text-neutral-700 mr-1">계정이 없다면?</div>
                    <div className="text-h3-m-14 text-main-500">회원가입</div>
                    <div className="w-6 h-6 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path d="M1 11L6 6L1 1" stroke="#FF5656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}

function SignUpContainer({
    children,
    onClick
}: {
    children: ReactNode,
    onClick: (e: SignUpProps) => void
}) {
    const [input, setInput] = useState<SignUpProps>({
        email: "",
        password: "",
        userName: "",
        profileImage: {} as File | Blob
    })

    const [image, setImage] = useState({
        src: "",
        alt: ""
    })

    const router = useRouter();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImage({ src: fileURL, alt: file.name });
            setInput({ ...input, profileImage: file });
        }
    };

    const signUp = (input: SignUpProps) => {
        onClick(input);
        router.push("/course");
    }

    return (
        <div className="w-full h-full flex items-center">
            <div className="bg-neutral-200 h-screen px-20 box-border items-center justify-center flex flex-col" style={{ width: 420 }}>
                <div className="flex flex-col gap-5">
                    <div className="py-6 w-full text-h1-b-20 text-center">회원가입하기</div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="text-h3-m-14 text-neutral-700 ml-3">프로필 사진</div>
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1">
                                <GlobalButton.AddFile
                                    text="파일 업로드"
                                    onChange={handleFileUpload}
                                />
                                <div className="text-neutral-600" style={{ fontSize: 10 }}>{image.alt || "파일명"}</div>
                            </div>
                            {image.src ?
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        backgroundColor: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={60}
                                        height={60}
                                        style={{
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                                : <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        backgroundColor: "#fff",
                                    }}
                                />
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="text-h3-m-14 text-neutral-700 ml-3">기본 정보</div>
                        <GlobalComponents.InputField
                            onChange={(e) => setInput({ ...input, userName: e })}
                            placeholder="이름"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="text-h3-m-14 text-neutral-700 ml-3">로그인 정보</div>
                        <GlobalComponents.InputField
                            onChange={(e) => setInput({ ...input, email: e })}
                            placeholder="이메일"
                        />
                        <GlobalComponents.Password
                            onChange={(e) => setInput({ ...input, password: e })}
                            placeholder="비밀번호"
                        />
                    </div>
                    <GlobalComponents.MainButton
                        text="계정 만들기"
                        onClick={() => signUp(input)}
                    />
                </div>
            </div>
            {children}
        </div>
    );
}

function WideContainer({ children }: { children: ReactNode }) {
    const [onButton, setOnButton] = useState<OnButton>("home")
    return (
        <div className="w-full h-screen flex">
            <Navigation.Short onButton={onButton} />
            <div className="px-10 py-12 w-full h-full">
                {children}
            </div>
        </div>
    );
}

const Container = {
    MainContainer,
    LogInContainer,
    WideContainer,
    SignUpContainer
}

export default Container;