"use client"

import Container from "@/lib/components/container";
import { ChapterProps, CourseProps, UnorganizedNodeProps } from "@/types/route";
import GlobalComponents from "@/lib/components/global_components";
import { useEffect, useMemo, useState } from "react";
import Loader from "@/lib/components/loader";
import ReadCourseUseCase from "../../../../../../../domain/course/read_course_use_case";
import { useParams } from "next/navigation";
import ReadLectureUseCase from '../../../../../../../domain/lecture/read_lecture_use_case';
import ReadChapterUseCase from '../../../../../../../domain/chapter/read_chapter_use_case';
import ReadNodeOneUseCase from '../../../../../../../domain/node_one/read_node_one_use_case';
import NodeConverter from "./converter";
import NodeTypes from "./node";
import ReactFlow, { Controls } from 'reactflow';
import 'reactflow/dist/style.css';



export default function Home() {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({} as CourseProps);
    const courseID = params.courseID as string;
    const lectureID = params.lectureID as string;
    const nodeTypes = useMemo(() => NodeTypes, []);

    const [nodes, setNodes] = useState([] as any[]);
    const [edges, setEdges] = useState([] as any[]);

    const readCourseData = async () => {
        setLoading(true)
        const find_course_use_case = new ReadCourseUseCase();
        const res = await find_course_use_case.read();
        const courses = res.data;
        const courseData = courses?.find((course: CourseProps) => course.courseID === courseID);
        setCourse(courseData);
        setLoading(false)
    }

    const readTree = async () => {
        const nodeList: UnorganizedNodeProps[] = []

        const read_lecture = new ReadLectureUseCase();
        const read_chapter = new ReadChapterUseCase();
        const read_node = new ReadNodeOneUseCase();


        const lec_res = await read_lecture.read(courseID, lectureID)
        const lecture = lec_res.data

        const chap_res = await read_chapter.read(courseID, lectureID)
        const chapterList = chap_res.data as ChapterProps[]

        async function processChapter(chapter: ChapterProps) {
            const node_res = await read_node.read(courseID, lectureID, chapter.chapterID);
            node_res.data.forEach((node: any) => {
                nodeList.push({
                    ...node,
                    chapterID: chapter.chapterID,
                });
            });
        }
        const chapterPromises = chapterList.map(chapter => processChapter(chapter));

        await Promise.all(chapterPromises);

        const { initialNodes, initialEdges } = NodeConverter(
            lecture,
            chapterList,
            nodeList
        );
        setNodes(initialNodes);
        setEdges(initialEdges);
    }

    useEffect(() => {
        readTree();
        readCourseData()
    }, [])

    return (
        <Container.MainContainer>
            <div className="h-full flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-end">
                    <GlobalComponents.CourseName name={course?.courseName} />
                    <GlobalComponents.CourseCode code={course?.courseCode} />
                </div>
                <div className="flex-grow">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
            {loading && <Loader />}
        </Container.MainContainer>
    );
}
