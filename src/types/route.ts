const route = process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_ENVIRONMENT === "test"
        ? "https://aita-dusky.vercel.app/"
        : "https://example.com";

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
    headlineContents: {headline: string, content: string}[];
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