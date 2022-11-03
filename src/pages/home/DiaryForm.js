import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// 어디서 받아오나요? Home.js
export default function DiaryForm({ uid }) {
    // 폼 컨트롤을 useState로 관리해보자
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    // useFirestore에 들어가야하는 건 뭐에여 
    // 우리가 만들 collection의 이름이 인자로 들어가야한다 - 일기장이니까 단순하게 diary라고 하겠습니다
    const { addDocument, response } = useFirestore('diary');

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
        // uid - 일기를 작성한 유저의 아이디 - props로 전달받기
        addDocument({ uid, title, text })
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

