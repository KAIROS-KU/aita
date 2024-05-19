const transformToTree = (courses: any[]) => {
    return courses.map((course: { courseName: any; courseCode: any; profName: any; createdAt: { toLocaleDateString: () => any; }; lectures: any[]; }) => ({
        name: `${course.courseName} (${course.courseCode})`,
        attributes: {
            professor: course.profName,
            createdAt: course.createdAt.toLocaleDateString(),
        },
        children: course.lectures.map((lecture: { lectureName: any; createdAt: { toLocaleDateString: () => any; }; chapters: any[]; }) => ({
            name: `${lecture.lectureName}`,
            attributes: {
                createdAt: lecture.createdAt.toLocaleDateString(),
            },
            children: lecture.chapters
                ? lecture.chapters.map((chapter: { chapterName: any; createdAt: { toLocaleDateString: () => any; }; nodes: any[]; }) => ({
                    name: `${chapter.chapterName}`,
                    attributes: {
                        createdAt: chapter.createdAt.toLocaleDateString(),
                    },
                    children: chapter.nodes.map((node: { title: any; createdAt: { toLocaleDateString: () => any; }; detail: any; }) => ({
                        name: `${node.title}`,
                        attributes: {
                            createdAt: node.createdAt.toLocaleDateString(),
                            detail: node.detail,
                        },
                    })),
                }))
                : [],
        })),
    }));
};

export default transformToTree;