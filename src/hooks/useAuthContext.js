// context 를 이용하기 위해서 hook을 만들어보자
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    // context 에 들어있는 것은 state, dispatch 함수
    return context;
}