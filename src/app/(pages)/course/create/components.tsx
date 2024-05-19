import GlobalButton from "@/lib/components/global_button";

function CourseInput({
    label,
    placeholder,
    onChange,
}: {
    label: string;
    placeholder: string;
    onChange: (e: string) => void;
}) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }
    return (
        <div className="flex flex-col border border-neutral-300 rounded-xl gap-1 w-64" style={{ padding: "10px 20px" }}>
            <label className="text-neutral-600 font-semibold">{label} *</label>
            <input
                type="text"
                placeholder={placeholder}
                className="text-neutral-black text-body-r-16 placeholder:text-neutral-300"
                style={{ outline: "none" }}
                onChange={handleChange}
            />
        </div>
    )
}

function CreateCourseContent({
    label,
    onChange
}: {
    label: string,
    onChange: (e: File) => void
}) {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
    }

    return (
        <div className="flex justify-between w-full bg-neutral-100 items-center" style={{ borderRadius: 20, padding: "20px 32px" }}>
            <div className="text-h2-sb-20">{label}</div>
            <GlobalButton.AddFile text="파일 업로드" onChange={handleInput} />
        </div>
    )
}

const Components = {
    CourseInput,
    CreateCourseContent
}

export default Components