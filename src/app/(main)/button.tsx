function ToLearn({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center text-neutral-white gap-2 bg-main-red w-fit"
            style={{ padding: "6px 10px", borderRadius: 10 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 14V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14H13L22 5L19 2L10 11V14Z" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 5L19 8" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-body-r-14">{text}</div>
        </button>

    )
}

const Button = {
    ToLearn
}

export default Button;