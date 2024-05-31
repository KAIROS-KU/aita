import { LectureProps, ChapterProps, UnorganizedNodeProps } from "@/types/route";

export default function NodeConverter(
    lecture: LectureProps,
    chapterList: ChapterProps[],
    nodeList: UnorganizedNodeProps[]
) {
    const initialNodes: any[] = [];
    const initialEdges: any[] = [];

    initialNodes.push({
        id: "lecture",
        type: 'LectureItem',
        data: {
            lectureName: lecture.lectureName,
        },
        position: { x: 0, y: 600 },
        sourcePosition: 'right',
        targetPosition: 'left',
    });

    chapterList.forEach((chapter: ChapterProps, chap_id) => {
        initialNodes.push({
            id: "chapter" + chapter.chapterID,
            type: 'ChapterItem',
            data: {
                chapterName: chapter.chapterName,
            },
            position: { x: 300, y: (chap_id + 2) * 200 },
            sourcePosition: 'right',
            targetPosition: 'left',
        });

        initialEdges.push({
            id: "lecture" + "-chapter" + chapter.chapterID,
            source: "lecture",
            target: "chapter" + chapter.chapterID,
            animated: true,
            sourceHandle: 'lecture',
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
            position: { x: 800, y: node_id * 150 },
            sourcePosition: 'right',
            targetPosition: 'left',
        });

        initialEdges.push({
            id: "chapter" + node.chapterID + "-node" + node_id.toString(),
            source: "chapter" + node.chapterID,
            target: "node" + node_id.toString(),
            animated: true,
            style: { stroke: '#C7A7A7' },
        });
    })

    return { initialNodes, initialEdges };
}