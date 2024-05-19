"use client"

import { useState } from "react"
import Drawer from "@mui/material/Drawer";

function ProfName({
    name
}: {
    name: string
}) {
    return (
        <div className="bg-main-100 text-main-red text-h3-m-14 w-fit" style={{ padding: "6px 10px", borderRadius: 6 }}>
            {name} 교수님
        </div>
    )
}

function CourseCode({
    code
}: {
    code: string
}) {
    return (
        <div className="text-h2-m-20 text-neutral-600">
            {code}
        </div>
    )
}

function CourseName({
    name
}: {
    name: string
}) {
    return (
        <div className="text-h1-b-26">
            {name}
        </div>
    )
}

function InputField({
    onChange,
    placeholder
}: {
    onChange: (e: string) => void,
    placeholder: string
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value);
    }
    return (
        <input
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 bg-neutral-white border border-neutral-200 rounded-md px-4 text-body-r-16 rounded-xl placeholder-neutral-300"
            placeholder={placeholder}
            style={{ outline: "none" }}
        />
    )
}

function Password({
    onChange,
    placeholder
}: {
    onChange: (e: string) => void,
    placeholder: string
}) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value);
    }
    return (
        <input
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 bg-neutral-white border border-neutral-200 rounded-md px-4 text-body-r-16 rounded-xl placeholder-neutral-300"
            placeholder={placeholder}
            style={{ outline: "none" }}
            type="password"
        />
    )
}

function Pin({
    onOff
}: {
    onOff: boolean
}) {
    return (
        <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.3334 4.66669H15.6667V8.75247L16.9142 10C17.2893 10.3751 17.5 10.8838 17.5 11.4142V12.75C17.5 13.8546 16.6046 14.75 15.5 14.75H12V18.3334C12 18.8856 11.5523 19.3334 11 19.3334C10.4477 19.3334 10 18.8856 10 18.3334V14.75H6.50002C5.39545 14.75 4.50002 13.8546 4.50002 12.75V11.4142C4.50002 10.8838 4.71073 10.3751 5.08581 10L6.33335 8.75247V4.66669H3.66669V2.66669H8.33335H13.6667H18.3334V4.66669ZM11 12.75H15.5V11.4142L14.2525 10.1667C13.8774 9.79161 13.6667 9.28291 13.6667 8.75247V4.66669H8.33335V8.75247C8.33335 9.28291 8.12264 9.79161 7.74757 10.1667L6.50002 11.4142L6.50002 12.75H11Z" fill={onOff ? "#FF5656" : "#DDDCDC"} />
        </svg>
    )
}

function Toggle({
    title,
    contents,
    pinStatus,
    pinClick
}: {
    title: string,
    contents: string,
    pinStatus: boolean | "none",
    pinClick: (e: any) => void
}) {
    const [toggle, setToggle] = useState(false)
    const clickToggle = () => {
        setToggle(!toggle)
    }
    return (
        <div onClick={clickToggle} className="p-5 flex flex-col gap-4 border border-neutral-300" style={{ borderRadius: 10 }}>
            <div className="flex justify-between items-center gap-10 w-full">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 flex justify-center items-center">
                        <svg style={toggle ? { rotate: "-90deg", transition: "all 0.3s" } : { transition: "all 0.3s" }} xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M5.76371 9.36176C6.38825 10.2127 7.61175 10.2127 8.23629 9.36176L13.1732 2.63474C13.963 1.55863 13.2316 0 11.937 0L2.06304 0C0.768354 0 0.0370022 1.55863 0.826755 2.63474L5.76371 9.36176Z" fill="#F1ECEC" />
                        </svg>
                    </div>
                    <div className="text-neutral-black text-h3-m-16">{title}</div>
                </div>
                <div onClick={pinClick}>
                    {pinStatus !== "none" && <Pin onOff={pinStatus} />}
                </div>
            </div>
            {toggle && <div className="ml-11 text-body-r-16">
                {contents}
            </div>}
        </div>
    )
}

function Alert({
    children,
    open,
    onClose
}: {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void
}) {
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            style={{
                zIndex: 1000,
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            PaperProps={{
                className: "bg-neutral-white flex flex-col gap-7",
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "35%",
                    height: "fit-content",
                    margin: "auto",
                    borderRadius: 24,
                    padding: "20px 20px 40px 20px"
                }
            }}

        >
            <div className="w-full flex justify-end">
                <div style={{ padding: 7 }} onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M16 1L1 16" stroke="#8E8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.75 15.75L1.25 1.25001" stroke="#8E8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {children}
        </Drawer >
    )
}

const GlobalComponents = {
    ProfName,
    CourseCode,
    CourseName,
    InputField,
    Password,
    Pin,
    Toggle,
    Alert
}

export default GlobalComponents;