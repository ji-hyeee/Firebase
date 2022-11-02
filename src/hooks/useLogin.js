import { useState } from "react";

import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    // 에러 관리
    const [error, setError] = useState(null);
    // 현재 서버와의 통신 상태
    const [isPending, setIsPanding] = useState(false);
    const { dispatch } = useAuthContext();

    // login시 displayName 필요없음 - 회원가입시 설정
    const login = (email, password) => {
        // 아직 에러가 없다
        setError(null);
        // 통신 진행중
        setIsPanding(true);

        // createUserWithEmailAndPassword - 회원가입 메서드 - 새로운 유저정보를 생성할 때 사용
        // signInWithEmailAndPassword - 로그인
        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // dispatch 함수 실행
                // type : 'login' - AuthContext.js - login case 사용
                dispatch({ type: 'login', payload: user })

                //signin 완료시 에러와 통신정보 관리
                setError(null);
                setIsPanding(false);

                if (!user) {
                    throw new Error('회원가입에 실패했습니다🥲');
                }


            }).catch(err => {
                setError(err.message);
                setIsPanding(false);
            })
    }
    return { error, isPending, login }
}