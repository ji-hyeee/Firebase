// signup 을 도와주는 hook
import { useState } from "react";

import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// useAuthcontext import
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    // 에러 관리
    const [error, setError] = useState(null);
    // 현재 서버와의 통신 상태
    const [isPending, setIsPanding] = useState(false);

    // useAuthContext hook을 사용해보자
    // 새로운 데이터 추가
    // useAuthContext를 통해 받아올 수 있는 값 2개 - state, dispatch 함수
    const { dispatch } = useAuthContext();

    // email, password는 hook이 실행될 때 인자로 전달 / + 닉네임까지(유저 정보 업데이트시 사용)
    const signup = (email, password, displayName) => {
        // 아직 에러가 없다
        setError(null)
        // 통신 진행중
        setIsPanding(true)

        // 회원가입을 도와주는 함수 / promise 객체를 반환하는 함수
        // 비밀번호 인증 기반 계정 만들기
        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                // 로그인 성공시 user 정보 담아주기
                const user = userCredential.user;
                console.log(user);

                if (!user) {
                    throw new Error('회원가입에 실패했습니다🥲');
                }

                // 회원 닉네임 정보 업데이트 
                // updateProfile - 사용자 프로필 업데이트 함수
                // appAuth.currentUser - 현재 로그인한 유저의 정보 확인
                updateProfile(appAuth.currentUser, { displayName })
                    .then(() => {
                        dispatch({ type: 'login', payload: user });
                        setError(null);
                        setIsPanding(false); // 통신 종료
                    }).catch(err => {
                        setError(err.message);
                        setIsPanding(false);
                    })

            }).catch(err => {
                setError(err.message);
                setIsPanding(false);
            })
    }
    return { error, isPending, signup }
}