import { ChapterProps, LectureProps, NodeProps } from "@/types/route";
import GlobalComponents from "@/lib/components/global_components";

function LectureItem({
    data, isConnectable
}: {
    data: LectureProps; isConnectable: boolean
}) {
    return (
        <div className="rounded-2xl items-center bg-neutral-300 flex gap-2 w-fit h-fit" style={{ padding: "10px 40px 10px 20px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M8.75 26.25C7.36929 26.25 6.25 25.1307 6.25 23.75V6.25C6.25 4.86929 7.36929 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 25.1307 22.6307 26.25 21.25 26.25H8.75Z" stroke="#8E8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.75 26.25C7.36929 26.25 6.25 25.1307 6.25 23.75V6.25C6.25 4.86929 7.36929 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 25.1307 22.6307 26.25 21.25 26.25H8.75Z" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.25 3.75V11.25H23.75" stroke="#8E8C8C" strokeWidth="2" strokeLinejoin="round" />
                <path d="M16.25 3.75V11.25H23.75" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <div className="text-h3-m-16">{data.lectureName}</div>
        </div>
    );
}

function ChapterItem({
    data, isConnectable
}: {
    data: ChapterProps; isConnectable: boolean
}) {
    function Circle({ dir }: { dir: "left" | "right" }) {
        return (
            <svg style={dir === "left" ? { marginRight: -4, zIndex: 100 } : { marginLeft: -4, zIndex: 100 }} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" fill="white" stroke="#FF6262" strokeWidth="2" />
            </svg>
        )
    }
    return (
        <div className="flex items-center">
            <Circle dir="left" />
            <div className="bg-main-red flex items-center justify-center" style={{ padding: "6px 20px", borderRadius: 20 }}>
                <div className="text-white text-h2-sb-12">{data.chapterName}</div>
            </div>
            <Circle dir="right" />
        </div>
    )
}

function NodeItem({
    data, isConnectable
}: {
    data: NodeProps; isConnectable: boolean
}) {
    return (
        <div className="w-fit">
            <GlobalComponents.Toggle
                title={data.title}
                contents={data.detail}
                pinStatus={"none"}
                pinClick={() => { }}
            />
        </div>
    )
}

const NodeTypes = {
    LectureItem,
    ChapterItem,
    NodeItem
}

export default NodeTypes;