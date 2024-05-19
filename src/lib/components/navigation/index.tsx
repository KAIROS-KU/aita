"use client"

import { CourseProps } from "@/app/sample_data"
import Button from "./button"
import Icon from "./icons"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GlobalModal from "../global_modal"
import ReadCourseUseCase from "../../../domain/course/read_course_use_case"
import ReadUserUseCase from "../../../domain/user/read_user_use_case"
import CheckUserAuthUseCase from "../../../domain/user/check_user_auth_use_case"
import Modal from "../modal"
import GlobalButton from "../global_button"

function CheckAuthModal({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: any
}) {
    const router = useRouter()
    return (
        <Modal open={open} onClose={() => router.push("sign-in")}>
            <div className="flex flex-col justify-between h-full">
                <div className="text-h2-sb-20 text-center">로그인이 되어있지 않아요.</div>
                <div className="flex flex-col gap-3">
                    <GlobalButton.SubButton text="로그인하기" onClick={() => router.push("/")} />
                    <GlobalButton.MainButton text="이메일로 간편하게 가입하기" onClick={() => router.push("/sign-up")} />
                </div>
            </div>
        </Modal>
    )
}

function Full({
    onButton
}: {
    onButton: OnButton
}) {
    const check_user_auth_use_case = new CheckUserAuthUseCase()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [onModal, setOnModal] = useState(false)
    const [user, setUser] = useState({} as any)
    const toggleModal = () => {
        setOnModal(!onModal)
    }
    const [courses, setCourses] = useState<CourseProps[]>([])


    const readCourses = async () => {
        const use_case = new ReadCourseUseCase()
        const res = await use_case.read()
        if (!res.success) {
            setOpen(true)
            return
        }
        setCourses(res.data)
    }

    const readUser = async () => {
        const use_case = new ReadUserUseCase()
        const res = await use_case.read()
        if (!res.success) {
            setOpen(true)
            return
        }
        setUser(res.data)
    }

    const checkUser = async () => {
        const response = await check_user_auth_use_case.check()
        if (!response.success) setOpen(true)
    }

    useEffect(() => {
        checkUser()
        readCourses()
        readUser()
    }, [])


    return (
        <div className="flex flex-row bg-main-500 h-screen w-min">
            <Short onButton={onButton} />
            <div className="px-4 pt-12 flex flex-col gap-5 bg-neutral-200" style={{ borderRadius: "25px 0 0 25px" }}>
                <div className="p-3 w-full flex flex-row gap-4 items-center">
                    <Image alt="sample" src={user?.profilePic} width={50} height={50} className="rounded-full" style={{ objectFit: "cover", aspectRatio: "1" }} />
                    <div className="text-h1-b-20">{user?.userName}</div>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <Button.Recent text="최근 강의" onClick={toggleModal} />
                    {(user && courses) && courses?.map((course, index) => (
                        <Button.Course key={index} text={course.courseName} onClick={() => router.push(`/course/${course.courseID}`)} />
                    ))}
                    <div className="p-6">
                        <Button.AddCourse text="강의 추가" onClick={() => router.push("/course/create")} />
                    </div>
                </div>
            </div>
            <GlobalModal.NotReady onModal={onModal} toggleModal={toggleModal} />
            {open && <CheckAuthModal
                open={open}
                setOpen={setOpen}
            />}
        </div>
    )
}

function Short({
    onButton
}: {
    onButton: OnButton
}) {
    const check_user_auth_use_case = new CheckUserAuthUseCase()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const checkUser = async () => {
        const response = await check_user_auth_use_case.check()
        console.log(response)
        if (!response.success) setOpen(true)
    }

    useEffect(() => {
        checkUser()
    }, [])

    const [onModal, setOnModal] = useState(false)
    const toggleModal = () => {
        setOnModal(!onModal)
    }

    const toHome = () => {
        router.push("/course")
    }

    return (
        <div className="px-4 pt-12 pb-6 flex flex-col bg-main-500 h-screen justify-between items-center w-min">
            <div className="px-2 py-4 flex flex-col gap-5 justify-center bg-neutral-transparent" style={{ borderRadius: 50 }}>
                <Icon.Home onOff={onButton === "home"} onClick={toHome} />
                <Icon.Notes onOff={onButton === "notes"} onClick={toggleModal} />
                <Icon.Noti onOff={onButton === "noti"} onClick={toggleModal} />
                <Icon.Tree onOff={onButton === "tree"} onClick={toggleModal} />
            </div>
            <Icon.Settings onClick={toggleModal} />
            <GlobalModal.NotReady onModal={onModal} toggleModal={toggleModal} />
            {open && <CheckAuthModal
                open={open}
                setOpen={setOpen}
            />}
        </div>
    )
}

const Navigation = {
    Full,
    Short
}

export default Navigation;