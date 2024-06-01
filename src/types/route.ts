const route = new URLSearchParams(window.location.search);

type CourseProps = {
    courseName: string;
    courseCode: string;
    profName: string;
    createdAt: Date;
    courseID: string;
    lectures: LectureProps[];
}

type LectureProps = {
    lectureID: string;
    lectureName: string;
    createdAt: Date;
    fileURL: string;
    headlineContents: { headline: string, content: string }[];
    summary: string;
    imageURLArray: string[];
    chapters?: ChapterProps[];
}

type ChapterProps = {
    chapterID: string;
    chapterName: string;
    createdAt: Date;
    nodes?: NodeOneProps[];
}

type NodeOneProps = {
    nodeID: string;
    title: string;
    createdAt: Date;
    detail: string;
    nodes?: NodeTwoProps[];
}

type NodeTwoProps = {
    nodeID: string;
    title: string;
    createdAt: Date;
    detail: string;
}

type UnorganizedNodeProps = {
    nodeID: string;
    title: string;
    createdAt: Date;
    detail: string;
}

export type { CourseProps, LectureProps, ChapterProps, NodeOneProps, NodeTwoProps, UnorganizedNodeProps };
export default route;