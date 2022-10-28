import { useState } from 'react';
import styles from './Signup.module.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');


    const handleData = (event) => {
        if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        } else if (event.target.type === "text") {
            setDisplayName(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
    }

    return (
        <form className={styles.signup_form} onSubmit={handleSubmit} >
            <fieldset>
                <legend>회원가입</legend>
                <label htmlFor="myEmail">email : </label>
                <input type="email" id="myEmail" required onChange={handleData} value={email} />

                <label htmlFor="myPassWord">password : </label>
                <input type="password" id="myPassWord" required onChange={handleData} value={password} />

                <label htmlFor="myNickName">닉네임 : </label>
                <input type="test" id="myNickName" required onChange={handleData} value={displayName} />

                <button type="submit" className={styles.btn}>회원가입</button>
            </fieldset>
        </form>

    )
}