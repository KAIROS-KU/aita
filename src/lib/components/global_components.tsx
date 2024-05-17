"use client"

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

function MainButton({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="w-full h-12 bg-main-red text-neutral-white text-h2-sb-16 rounded-xl"
        >
            {text}
        </button>
    )
}

const GlobalComponents = {
    ProfName,
    CourseCode,
    CourseName,
    InputField,
    MainButton,
    Password
}

export default GlobalComponents;