import SampleData from '@/app/sample_data';
import React from 'react';
import Tree from 'react-d3-tree';

export const transformData = (courses) => {
  return courses.map((course) => ({
    name: `${course.courseName} (${course.courseCode})`,
    attributes: {
      professor: course.profName,
      createdAt: course.createdAt.toLocaleDateString(),
    },
    children: course.lectures.map((lecture) => ({
      name: `${lecture.lectureName}`,
      attributes: {
        createdAt: lecture.createdAt.toLocaleDateString(),
      },
      children: lecture.chapters
        ? lecture.chapters.map((chapter) => ({
            name: `${chapter.chapterName}`,
            attributes: {
              createdAt: chapter.createdAt.toLocaleDateString(),
            },
            children: chapter.nodes.map((node) => ({
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


const courses = [
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
              },
            ],
          },
        ],
      },
      {
        lectureID: "2",
        lectureName: "미술의 기본",
        createdAt: new Date(),
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
  },
];

const transformedData = transformData(courses);

const CustomTree: React.FC = () => {
  const containerStyles = {
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={containerStyles}>
      <Tree
        data={transformedData}
        orientation="horizontal"
        pathFunc="diagonal"
        translate={{ x: 200, y: 50 }}
        nodeSize={{ x: 300, y: 200 }}
        renderCustomNodeElement={({ nodeDatum }) => (
          <g>
            <circle r="15" style={{ fill: '#ff6b6b' }}></circle>
            <text fill="white" strokeWidth="0.5" x="20">
              {nodeDatum.name}
            </text>
            {nodeDatum.attributes && (
              <text fill="black" x="20" y="20">
                {Object.entries(nodeDatum.attributes)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')}
              </text>
            )}
          </g>
        )}
      />
    </div>
  );
};

export default CustomTree;