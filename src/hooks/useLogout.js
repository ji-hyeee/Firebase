import { useState } from "react";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    // error 관리
    const [error, setError] = useState(null);

    // 통신 상태 관리
    const [isPending, setIsPending] = useState(false);

    // useAuthContext 메서드 호출
    const { dispatch } = useAuthContext();

    const logout = () => {
        setError(null);
        setIsPending(true); // 통신 시작

        // signOut - 로그아웃 구현을 도와주는 파이어베이스 메서드
        // 인자로 사용자의 인증정보만 넘겨주면 된다
        // 인증정보 === firebase > confing.js 에서 appAuth 를 export 해준다
        signOut(appAuth).then(() => {
            // Sign-out successful.
            // 유저정보가 사라져야한다 -context를 관리하는 dispatch 함수 실행
            dispatch({ type: 'logout' });
            setError(null);
            setIsPending(false);

        }).catch((error) => {
            // An error happened.
            setError(error.message);
            setIsPending(false);
        });
    }

    return { error, isPending, logout }
}