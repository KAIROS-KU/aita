import React, { useMemo } from 'react';
import ReactFlow, { Controls } from 'reactflow';
import NodeTypes from './node';
import 'reactflow/dist/style.css';
import { CourseProps } from '@/app/sample_data';

function NodeConverter(currentCourse: CourseProps) {
  const initialNodes: any[] = [];
  const initialEdges: any[] = [];

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
  return { initialNodes, initialEdges };
}

export default function Tree({
  courseID
}: {
  courseID: string
}) {
  const nodeTypes = useMemo(() => NodeTypes, []);

  const { initialNodes, initialEdges} = NodeConverter({ courseID } as CourseProps); // TODO: course - lecture - chapter - node까지 가져오는 유즈케이스 필요

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
