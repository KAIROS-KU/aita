import Icon from "./icons"

function Recent({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-row w-60 justify-between items-center px-5 py-6 bg-neutral-200 hover:bg-neutral-300"
            style={{ borderRadius: 20 }}
        >
            <div className="flex flex-row gap-3">
                <Icon.Recent />
                <div className="h3-m-18">{text}</div>
            </div>
            <Icon.Arrow />
        </button>
    )
}

function Course({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-row w-60 justify-between items-center px-5 py-6 bg-neutral-200 hover:bg-neutral-300"
            style={{ borderRadius: 20 }}
        >
            <div className="flex flex-row gap-3">
                <Icon.Course />
                <div className="h3-m-18">{text}</div>
            </div>
            <Icon.Arrow />
        </button>
    )
}

function AddCourse({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center p-3 rounded-xl gap-1 bg-neutral-white w-fit"
        >
            <Icon.Add />
            <div className="h3-m-18">{text}</div>
        </button>
    )
}

const Button = {
    Recent,
    Course,
    AddCourse
}

export default Button