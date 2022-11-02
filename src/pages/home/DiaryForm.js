import { useState } from "react";

export default function DiaryForm() {
    // 폼 컨트롤을 useState로 관리해보자
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleData = (event) => {
        if (event.target.id === 'title') {
            setTitle(event.target.value);
        } else if (event.target.id === 'text') {
            setText(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, text)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    {/* 제목 */}
                    <legend>일기 쓰기</legend>
                    <label htmlFor="title">일기 제목 : </label>
                    {/* required - 필수 입력 요소 */}
                    <input id="title" type="text" required onChange={handleData} />

                    <label htmlFor="text">일기 내용 : </label>
                    <textarea id="text" type="text" required onChange={handleData}></textarea>

                    <button type="submit">저장하기</button>
                </fieldset>
            </form>
        </>
    )
}

