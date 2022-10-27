import { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {

    // form 데이터관리 react hook - useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // event - 이벤트 객체. 사용자가 실행한 이벤트에 관한 정보가 들어있는 객체
    const handleData = (event) => {
        if (event.target.type === "email") {
            // 값을 업데이트하기 위해 함수에 값 전달
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        // submit 기본이벤트 방지(페이지 리로딩)
        event.preventDefault();

        // 개발자 도구에서 입력한 값 확인
        console.log(email, password);
    }

    return (

        // onSubmit - 이벤트가 발생했을 때
        <form className={styles.login_form} onSubmit={handleSubmit} >
            <fieldset>
                <legend>로그인</legend>
                {/* id와 연결해주기 위해 htmlFor 형식 사용 */}
                <label htmlFor="myEmail">email : </label>
                {/* required - 반드시 입력해야한다 */}
                {/* value - 입력 값을 관리하는 주도권을 사용자에서 리액트로 변경시키기 위해 value 설정 */}
                {/* onChange - (값이 변경될 때) 이벤트 발생시 콜백함수 연결 */}
                <input type="email" id="myEmail" required onChange={handleData} value={email} />

                <label htmlFor="myPassWord">password : </label>
                <input type="password" id="myPassWord" required onChange={handleData} value={password} />

                {/* form 제출 버튼 - 명시적으로 type 적어주기 */}
                <button type="submit" className={styles.btn}>로그인</button>
            </fieldset>
        </form>

    )
}