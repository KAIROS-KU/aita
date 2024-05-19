"use client"

import Drawer from "@mui/material/Drawer";

export default function Modal({
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
                alignItems: "center",
                justifyContent: "center",
            }}
            PaperProps={{
                className: "w-5/12 h-96 bg-neutral-white rounded-t-3xl flex flex-col gap-7",
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: "auto",
                    borderRadius: 24,
                    padding: "20px 20px 70px 20px"
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