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
    chapters?: ChapterProps[];
}

type ChapterProps = {
    chapterID: string;
    chapterName: string;
    createdAt: Date;
    nodes?: NodeProps[];
}

type NodeProps = {
    nodeID: string;
    title: string;
    createdAt: Date;
    detail: string;
}

export type { CourseProps, LectureProps, ChapterProps, NodeProps }

const SampleData = {
    name: "최어진",
    image: "https://firebasestorage.googleapis.com/v0/b/ai-ta-206f2.appspot.com/o/IMG_0896.jpeg?alt=media&token=4a361b8d-7f27-415e-a2a0-c1c2a95da223",
    courses: [
        {
            courseName: "클래식음악의이해",
            courseCode: "MUS101",
            profName: "김영희",
            createdAt: new Date(),
            courseID: "123",
            lectures: [
                {
                    lectureID: "1",
                    lectureName: "음악의 기본",
                    createdAt: new Date(),
                    chapters: [
                        {
                            chapterID: "1",
                            chapterName: "음악의 기본",
                            createdAt: new Date(),
                            nodes: [
                                {
                                    nodeOneID: "1",
                                    title: "음악의 기본",
                                    createdAt: new Date(),
                                    detail: "음악의 기본을 배웁니다.",
                                }
                            ]
                        }
                    ]
                },
                {
                    lectureID: "2",
                    lectureName: "미술의 기본",
                    createdAt: new Date(),
                }
            ]
        },
        {
            courseName: "미술사 I",
            courseCode: "ART101",
            profName: "이영수",
            createdAt: new Date(),
            courseID: "345",
            lectures: [
                {
                    lectureID: "2",
                    lectureName: "미술의 기본",
                    createdAt: new Date(),
                }
            ]
        },
        {
            courseName: "영화의이해",
            courseCode: "CIN101",
            profName: "박지영",
            createdAt: new Date(),
            courseID: "678",
            lectures: [
                {
                    lectureID: "3",
                    lectureName: "영화의 기본",
                    createdAt: new Date(),
                }
            ]
        },
        {
            courseName: "인공지능",
            courseCode: "AI101",
            profName: "김철수",
            createdAt: new Date(),
            courseID: "910",
            lectures: [
                {
                    lectureID: "4",
                    lectureName: "인공지능의 기본",
                    createdAt: new Date(),
                }
            ]
        },
        {
            courseName: "딥러닝의수학",
            courseCode: "AI102",
            profName: "김철수",
            createdAt: new Date(),
            courseID: "111",
            lectures: [
                {
                    lectureID: "5",
                    lectureName: "딥러닝의 기본",
                    createdAt: new Date(),
                }
            ]
        },
        {
            courseName: "통계학",
            courseCode: "STA101",
            profName: "이영희",
            createdAt: new Date(),
            courseID: "222",
            lectures: [
                {
                    lectureID: "6",
                    lectureName: "통계학의 기본",
                    createdAt: new Date(),
                }
            ]
        },
    ]
}

export default SampleData