import { LectureProps, ChapterProps, NodeProps } from "@/types/route";

export default function NodeConverter(
    lecture: LectureProps,
    chapterList: ChapterProps[],
    nodeList: NodeProps[]
) {
    console.log(lecture, chapterList, nodeList)

    const initialNodes: any[] = [];
    const initialEdges: any[] = [];

    initialNodes.push({
        id: "lecture",
        type: 'LectureItem',
        data: {
            lectureName: lecture.lectureName,
        },
        position: { x: 0, y: 0 },
    });

    chapterList.forEach((chapter: ChapterProps, chap_id) => {
        initialNodes.push({
            id: "chapter" + chap_id.toString(),
            type: 'ChapterItem',
            data: {
                chapterName: chapter.chapterName,
            },
            position: { x: 280, y: chap_id * 100 },
        });

        initialEdges.push({
            id: "lecture" + "-chapter" + chap_id.toString(),
            source: "lecture" + chap_id.toString(),
            target: "chapter" + chap_id.toString(),
        });
    })

    nodeList.forEach((node: any, node_id) => {
        initialNodes.push({
            id: "node" + node_id.toString(),
            type: 'NodeItem',
            data: {
                title: node.title,
                detail: node.detail,
            },
            position: { x: 500, y: node_id * 100 },
        });

        initialEdges.push({
            id: "chapter" + node_id.toString() + "-node" + node_id.toString(),
            source: "chapter" + node_id.toString(),
            target: "node" + node_id.toString(),
        });
    })

    return { initialNodes, initialEdges };
}