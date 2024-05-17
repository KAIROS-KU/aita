import GlobalIcon from "@/lib/components/global_icons";

function AddLectureButton({
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
            <GlobalIcon.Add />
            <div className="text-body-r-12">{text}</div>
        </button>
    )
}

function SeeTree({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 bg-neutral-200 w-fit"
            style={{ padding: "6px 10px", borderRadius: 10 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.42725 2V5.48938H8.79715V2H2.42725ZM1.42725 0C0.874961 0 0.427246 0.447715 0.427246 1V6.48938C0.427246 7.04166 0.874962 7.48938 1.42725 7.48938H4.71521V19.3797C4.71521 20.4842 5.61064 21.3797 6.71521 21.3797H13.0475V23C13.0475 23.5523 13.4952 24 14.0475 24H22.4174C22.9697 24 23.4174 23.5523 23.4174 23V17.5106C23.4174 16.9583 22.9697 16.5106 22.4174 16.5106H14.0475C13.4952 16.5106 13.0475 16.9583 13.0475 17.5106V19.3797L6.71521 19.3797V12.2865H13.2029V13.167C13.2029 13.7193 13.6507 14.167 14.2029 14.167H22.5729C23.1251 14.167 23.5729 13.7193 23.5729 13.167V7.67759C23.5729 7.12531 23.1251 6.67759 22.5729 6.67759H14.2029C13.6507 6.67759 13.2029 7.12531 13.2029 7.67759V10.2865H6.71521V7.48938H9.79715C10.3494 7.48938 10.7972 7.04166 10.7972 6.48938V1C10.7972 0.447715 10.3494 0 9.79715 0H1.42725ZM15.2029 8.67759V12.167H21.5729V8.67759H15.2029ZM15.0475 22V18.5106H21.4174V22H15.0475Z" fill="#8E8C8C" />
                <path fillRule="evenodd" clipRule="evenodd" d="M2.42725 2V5.48938H8.79715V2H2.42725ZM1.42725 0C0.874961 0 0.427246 0.447715 0.427246 1V6.48938C0.427246 7.04166 0.874962 7.48938 1.42725 7.48938H4.71521V19.3797C4.71521 20.4842 5.61064 21.3797 6.71521 21.3797H13.0475V23C13.0475 23.5523 13.4952 24 14.0475 24H22.4174C22.9697 24 23.4174 23.5523 23.4174 23V17.5106C23.4174 16.9583 22.9697 16.5106 22.4174 16.5106H14.0475C13.4952 16.5106 13.0475 16.9583 13.0475 17.5106V19.3797L6.71521 19.3797V12.2865H13.2029V13.167C13.2029 13.7193 13.6507 14.167 14.2029 14.167H22.5729C23.1251 14.167 23.5729 13.7193 23.5729 13.167V7.67759C23.5729 7.12531 23.1251 6.67759 22.5729 6.67759H14.2029C13.6507 6.67759 13.2029 7.12531 13.2029 7.67759V10.2865H6.71521V7.48938H9.79715C10.3494 7.48938 10.7972 7.04166 10.7972 6.48938V1C10.7972 0.447715 10.3494 0 9.79715 0H1.42725ZM15.2029 8.67759V12.167H21.5729V8.67759H15.2029ZM15.0475 22V18.5106H21.4174V22H15.0475Z" fill="black" fillOpacity="0.3" />
            </svg>
            <div className="text-body-r-14">{text}</div>
        </button>

    )
}

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
    AddLectureButton,
    SeeTree,
    ToLearn
}

export default Button;