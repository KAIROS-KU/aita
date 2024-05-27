import React, { useEffect, useMemo } from 'react';
import ReactFlow, { Controls } from 'reactflow';
import NodeTypes from './node';
import 'reactflow/dist/style.css';
import { ChapterProps, LectureProps, NodeProps } from '@/types/route';
import ReadEntireTreeUseCase from '../../../../../../../domain/tree/read_entire_course_use_case';
import ReadLectureUseCase from '../../../../../../../domain/lecture/read_lecture_use_case';
import ReadChapterUseCase from '../../../../../../../domain/chapter/read_chapter_use_case';
import ReadNodeOneUseCase from '../../../../../../../domain/node_one/read_node_one_use_case';

async function NodeConverter(lectures: LectureProps[], courseID: string) {
  const lectureList = []
  const chapterList = []
  const nodeList: NodeProps[] = []

  const initialNodes: any[] = [];
  const initialEdges: any[] = [];

  const read_lecture = new ReadLectureUseCase();
  const read_chapter = new ReadChapterUseCase();
  const read_node = new ReadNodeOneUseCase();

  const lectureID = lectures[0].lectureID;


  const lec_res = await read_lecture.read(courseID, lectureID)
  const lec_data = lec_res.data
  lectureList.push(lec_data)

  const chap_res = await read_chapter.read(courseID, lectureID)
  const chap_data = chap_res.data
  chapterList.concat(chap_data)

  console.log(chapterList)

  chap_data.forEach(async (chapter: ChapterProps) => {
    const node_res = await read_node.read(courseID, lectureID, chapter.chapterID)
    console.log(node_res)
    const node_data = node_res.data
    nodeList.push(node_data)
  });

  lectureList.forEach((lecture: LectureProps, lec_id) => {
    initialNodes.push({
      id: "lecture" + lec_id.toString(),
      type: 'LectureItem',
      data: {
        lectureName: lecture.lectureName,
      },
      position: { x: 0, y: lec_id * 100 },
    });
  })

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
      id: "lecture" + chap_id.toString() + "-chapter" + chap_id.toString(),
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


  // lectures?.forEach((lecture: LectureProps, lec_id) => {
  //   initialNodes.push({
  //     id: "lecture" + lec_id.toString(),
  //     type: 'LectureItem',
  //     data: {
  //       lectureName: lecture.lectureName,
  //     },
  //     position: { x: 0, y: lec_id * 100 },
  //   });

  //   lecture.chapters?.forEach((chapter, chap_id) => {
  //     initialNodes.push({
  //       id: "chapter" + chap_id.toString(),
  //       type: 'ChapterItem',
  //       data: {
  //         chapterName: chapter.chapterName,
  //       },
  //       position: { x: 280, y: (lec_id * 110) + (chap_id * 50) },
  //     });

  //     initialEdges.push({
  //       id: "lecture" + lec_id.toString() + "-chapter" + chap_id.toString(),
  //       source: "lecture" + lec_id.toString(),
  //       target: "chapter" + chap_id.toString(),
  //     });

  //     chapter.nodes?.forEach((node, node_id) => {
  //       initialNodes.push({
  //         id: "node" + node_id.toString(),
  //         type: 'NodeItem',
  //         data: {
  //           title: node.title,
  //           detail: node.detail,
  //         },
  //         position: { x: 500, y: (lec_id * 110) + (chap_id * 50) + (node_id * 30) }, // Ensure unique y position
  //       });

  //       initialEdges.push({
  //         id: "chapter" + chap_id.toString() + "-node" + node_id.toString(),
  //         source: "chapter" + chap_id.toString(),
  //         target: "node" + node_id.toString(),
  //       });
  //     });
  //   }
  //   );
  // }
  // );
  return { initialNodes, initialEdges };
}


export default function Tree({ courseID }: { courseID: string }) {
  const nodeTypes = useMemo(() => NodeTypes, []);
  const [nodes, setNodes] = React.useState([] as any[]);
  const [edges, setEdges] = React.useState([] as any[]);

  const readTree = async () => {
    const read_entire_tree_use_case = new ReadEntireTreeUseCase();
    const treeResponse = await read_entire_tree_use_case.readTree(courseID);
    const treeData = treeResponse.data;

    const { initialNodes, initialEdges } = await NodeConverter(treeData, courseID);
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  useEffect(() => {
    readTree();
  }, [courseID]);


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
    </ReactFlow>
  );
}
