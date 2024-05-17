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

const Components = {
    ProfName,
    CourseCode,
    CourseName
}

export default Components;