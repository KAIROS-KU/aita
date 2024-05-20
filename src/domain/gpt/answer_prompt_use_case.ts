import route from "@/types/route";


{/*
유저가 쿼리 입력
→ GPT로 어떤 목차에 해당하는지 선택 input(Query, chapterName)
→ 해당 목차의 헤드라인 모두 가져오기
→ GPT로 어떤 페이지에 해당하는지 선택 input(Query, 헤드라인들)
→ GPT로 답변 생성하기 input(Query, 선택된 페이지 내용), output 방식: 스트리밍
→ output형식: {"Title":"","content":["","","",...],"reference_page":["","","",...]} 다른 형식 필요할 경우 얘기해주세요 
→  제목 - 내용 - 참조 페이지(있다면) 구조로 화면에 출력, 
*/}

export default class AnswerPromptUseCase {
    async generate(
        prompt: string,
    ): Promise<ApiResponse> {
        const res = await fetch(`${route}/api/v1/gpt/query`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt
            }),
        })
        const response = await res.json()
        const data = JSON.parse(response.data)
        return {
            success: response.success,
            message: response.message,
            data: data
        }
    }
}