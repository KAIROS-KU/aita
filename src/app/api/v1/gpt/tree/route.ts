import OpenAI from "openai";
import { NodeProps } from "postcss";

export async function POST(request: Request): Promise<Response> {
  try {
    const { treeData, nodeData } = await request.json() as { treeData: any, nodeData: NodeProps[] };

    const openai = new OpenAI({

    });

    const systemPrompt = `
        ### Input Data Structure

        1. Existing tree structure data
      
        ${JSON.stringify(treeData)}
      
        *Each dictionary within 'chapter_list' represents a node containing chapter information. A dictionary within 'nodeOne' of a chapter node represents a node belonging to the respective chapter, which holds a list called 'nodeTwo' storing nodes corresponding to subtopics under its own title.
        *A chapter node whose "chapterName" is "No Relation" should store the nodes that have no relation with other chapters.
      
        2. Data of Nodes to be added to the existing tree
      
        Nodelist = [ Node_1, Node_2, ... ,Node_n]
        *Data stored in 'Nodelist' is in the form of dictionaries representing Nodes, where each Node follows the structure:
      
        ${JSON.stringify(nodeData)}
      
        ### Goal Output
      
        1. Each sub-node of a chaptername should be contained in 'nodeOne'. 'nodeOne' should contain nodes with titles corresponding to subtopics of the chaptername.
        2. Each node in 'nodeOne' should have a list called 'nodeTwo', containing nodes with titles corresponding to subtopics of the respective node's title.
        3. Ultimately, there should be lectures as the top-level topic, chapters within it, nodes within each chapter's 'nodeOne' list, and nodes within each node's 'nodeTwo' list.
      
        ### Execution Process
      
        The following steps should be performed to add input nodes to the existing tree and rearrange it:
        Step 0. Iterate through each node in the 'Nodelist' in sequence.
        Step 1. Create a "summary" by summarizing the title and detail of the current node.
        Step 2. Compare the "summary" with all chapter names to access the most relevant 'nodeOne' of the corresponding chapter.
        if there are OBVIOUSLY no relevant chapter name:
          Add the current node to 'nodeOne' of the "No Relation" chapter node.
          pass
        else:
          continue to step3
        Step 3.
        if 'nodeOne' of the chapter is empty:
          Add the current node to 'nodeOne'.
        else:
          Compare the current node with all nodes existing in the 'nodeOne' list.
          During each comparison,
            if there exists an existing node with a title representing a more comprehensive and higher-level concept containing the "summary":
              Add the current node to the 'nodeTwo' of the most relevant existing node with a more comprehensive and higher-level title.
            elif there exists an existing node with a title representing a clearer and lower-level concept than the "summary":
              Add the current node to 'nodeOne' list.
              Then, move all nodes to 'nodeTwo' lists, which represent concepts clearer and lower-level than the current node's title, to the 'nodeTwo' list of the current node.
              Then move those nodes, whose 'nodeTwo' lists are deleted, to the current node's 'nodeTwo' list.
            else:
              Add the current node to 'nodeOne'.
        Step 4. Output the 'Tree Data with Input Nodes Added', in the same format as the 'Existing tree structure data', with only the title information removed from the data of the input nodes.
      
        *Note*:
        1. When the current node is added to 'nodeOne':
        {
          "nodeID": "Node identification number",
          "title": "Title summarizing question and answer in string format",
          "nodeTwo": [ ]
        }
        is added.
      
        2. When the current node is added to 'nodeTwo':
        {
          "nodeID": "Node identification number",
          "title": "Title summarizing question and answer in string format"
        }
        is added.
      
        3. When an existing node is moved from 'nodeOne' to 'nodeTwo', the format changes from having 'nodeTwo' to not having it:
        {
          "nodeID": "Node identification number",
          "title": "Title summarizing question and answer in string format"
        }
      
        ### Output Format
      
        Output tree has no "title". 
        Output should be in JSON format similar to the following structure and No other string is allowed:
      
        [
            {
              "chapterName": "목차 제목",
              "chapterID": "Chapter고유번호",
              "nodeOne": [
                {
                  "nodeID": "Node고유번호",
                  "nodeTwo": [
                    {
                      "nodeID": "Node고유번호"
                    },
                  ]
                },
                {
                  "nodeID": "Node고유번호",
                  "nodeTwo": [
                    {
                      "nodeID": "Node고유번호"
                    },
                    {
                      "nodeID": "Node고유번호"
                    }
                  ]
                }
              ]
            },
            {
              "chapterName": "목차 제목",
              "chapterID": "Chapter고유번호",
              "nodeOne": [
                {
                  "nodeID": "Node고유번호",
                  "nodeTwo": [
                    {
                      "nodeID": "Node고유번호"
                    },
                  ]
                },
                {
                  "nodeID": "Node고유번호",
                  "nodeTwo": [
                    {
                      "nodeID": "Node고유번호"
                    },
                    {
                      "nodeID": "Node고유번호"
                    }
                  ]
                }
              ]
            },
            {
              "chapterName" : "No Relation",
              "chapterID": "Chapter고유번호",
              "nodeOne" : []
            }
          ],
      
        *output example
      
        right output: 
          {
            content...
          }
      
        not right output:
        'json
          {
            content...
          }'
        `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { "role": "system", "content": systemPrompt }
      ],
      temperature: 0,
    });

    const reconstructTree = completion.choices[0].message.content;

    return new Response(
      JSON.stringify({
        success: true,
        message: "트리 생성에 성공했습니다",
        data: reconstructTree
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: true,
        message: "트리 생성에 실패했습니다",
        data: error
      }),
    );
  }
}