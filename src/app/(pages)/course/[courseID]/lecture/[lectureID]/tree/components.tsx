import React, { useMemo } from 'react';
import ReactFlow, { Controls } from 'reactflow';
import NodeTypes from './node';
import SampleData from '@/app/sample_data';
import 'reactflow/dist/style.css';

const initialNodes: any[] = [];
const initialEdges: any[] = [];

const a = { id: '1-2', source: '1', target: '2' }

const currentCourse = SampleData.courses.find(course => course.courseID === "123")
if (!currentCourse) throw new Error("Course not found")

currentCourse.lectures.forEach((lecture, lec_id) => {
  initialNodes.push({
    id: "lecture" + lec_id.toString(),
    type: 'LectureItem',
    data: {
      lectureName: lecture.lectureName,
    },
    position: { x: 0, y: lec_id * 100 },
  });

  if (lecture.chapters) {
    lecture.chapters.forEach((chapter, chap_id) => {
      initialNodes.push({
        id: "chapter" + chap_id.toString(),
        type: 'ChapterItem',
        data: {
          chapterName: chapter.chapterName,
        },
        position: { x: 280, y: (lec_id * 110) + (10) },
      });

      initialEdges.push({
        id: "lecture" + lec_id.toString() + "-chapter" + chap_id.toString(),
        source: "lecture" + lec_id.toString(),
        target: "chapter" + chap_id.toString(),
      })

      if (chapter.nodes) {
        chapter.nodes.forEach((node, node_id) => {
          initialNodes.push({
            id: "node" + node_id.toString(),
            type: 'NodeItem',
            data: {
              title: node.title,
              detail: node.detail,
            },
            position: { x: 500, y: (lec_id * 100) - 15 },
          });

          initialEdges.push({
            id: "chapter" + chap_id.toString() + "-node" + node_id.toString(),
            source: "chapter" + chap_id.toString(),
            target: "node" + node_id.toString(),
          })
        });
      }
    });
  }
});

export default function Tree({
  courseID
}: {
  courseID: string
}) {
  const nodeTypes = useMemo(() => NodeTypes, []);


  console.log(initialNodes, initialEdges);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
    </ReactFlow>
  );
}
