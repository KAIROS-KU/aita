import GlobalIcon from "@/lib/components/global_icons";

function AddButton({
    text,
    onClick
}: {
    text: string,
    onClick: (e: any) => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center p-3 rounded-xl gap-1 bg-neutral-white w-fit"
        >
            <GlobalIcon.Add />
            <div className="text-body-r-12">{text}</div>
        </button>
    )
}

const GlobalButton = {
    AddButton
}

export default GlobalButton;