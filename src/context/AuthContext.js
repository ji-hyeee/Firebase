import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "../firebase/config";

// context 객체 생성
const AuthContext = createContext();

// action을 다룰 때 switch를 사용한다
const authReducer = (state, action) => {
    switch (action.type) {
        // 로그인에서 사용해보기 - case 추가
        // 회원가입이 완료되면 파이어베이스는 그 유저를 로그인 되이있다고 판단하므로 따로 회원가입 case 를 구분하지 않겠다 - 로그인으로 통합
        case 'login':
            // 전개구문을 이용해서 객체를 병합시킨다
            // state 에 있던 기존 유저 정보에 action payload 로부터 받아온 새로운 유저 정보를 결합시킨다
            return { ...state, user: action.payload }


        // logout case 추가 - user 정보는 null 로 없다 !
        case 'logout':
            return { ...state, user: null }

        // isAuthReady case 추가
        case 'isAuthReady':
            return { ...state, user: action.payload, isAuthReady: true }

        // 타입이 안 들어가있을 경우 기본값을 state로 정해준다
        default:
            return state
    }
}

// context를 구독할 컴포넌트의 묶음 범위를 설정
// 매개변수로 children 객체를 받는다
const AuthContextProvider = ({ children }) => {
    // user 정보 관리를 위한 useReduer hook
    // 첫번째 인자는 함수, 두번째 인자는 state의(관리할 유저 정보)초기값
    // 객체와 같이 복잡한 형태의 데이터를 다룰 때 reducer를 많이 사용한다
    const [state, dispatch] = useReducer(authReducer, {
        user: null,

        // 사용자 인증정보가 인증정보가 준비되어있는지 판단할 수 있는 변수
        isAuthReady: false

        // 새로운 기능 추가 - 리액트에서 사용자의 정보가 변경이 되는지 관찰하는 함수
        // 만약에 변경이 됐을 경우 실행- 로그인, 로그아웃

        // 리액트가 화면을 렌더링 하기 전에 재빠르게 파이어베이스와 통신해야하므로
        // onAuthStateChanged 함수를 사용해보자
        // Auth 객체의 관찰자를 설정
        // 사용자가 로그인이 되었을 때 인증 정보를 받아오기 전까지 리액트 렌더링을 차단했다가
        // 인증 정보를 받아오면 그때 렌더링이 되도록 기능을 구현하자
    })

    // useEffect - 컴포넌트가 렌더링되고 그 후에 업데이트 될 때마다 실행되는 함수
    useEffect(() => {
        // 첫번째 인자 - 인증정보
        // 두번째 인자 - user를 인자로 하는 콜백함수
        // 이 함수는 user 정보를 계속 관찰해요 - 구독을 중지하기 전까지
        const unSubscribe = onAuthStateChanged(appAuth, (user) => {
            // 유저의 정보가 바뀜 - dispatch 함수 실행
            // payload 는 유저 정보 전달
            dispatch({ type: 'isAuthReady', payload: user })

        })
        // 시작할 때 한 번만 유저의 상태를 관찰하면 되므로 dispatch 함수 뒤에 실행해주기 - 구독 취소
        // useEffect 의 경우 clean-up 개념이 있다
        // 함수를 반환하면 정리가 필요한 때에 실행시킬 것이다 라고 적혀있다
        // unSubscribe() 를 실행시키지말고 return 으로 전달해서 함수가 실행되게 만들자
        return unSubscribe;

        // useEffect 를 한 번만 실행해야하므로 두번째 인자에 [] 빈배열 적어주기
    }, [])

    // state 가 제대로 관리되고 있는지 확인해보자
    console.log('user state:', state);

    return (
        // AuthContext 객체에 Provider 키를 통해서 컴포넌트를 만들어줄것이다
        // vaule 값으로 유저에 관한 정보가 전달될 것

        // 어떤 값을 공유할 것인지 - 유저 정보
        // 유저 정보를 관리하는 reducer hook에서 유저 정보는 state에 담겨있다
        // 전개구문을 이용해서 앞으로 데이터가 추가될 확장성을 고려한다

        // dispatch 함수를 추가해준다
        // authReducer 함수를 호출할 수 있고 authReducer 함수는 state를 업데이트할 수 있다
        // dispatch 함수를 context에 담아 전역으로 공유해서 회원정보가 바뀔 때마다 dispatch 함수를 실행시켜서 user 의 정보를 계속 업데이트할 목적으로 공유한다
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/* children에 있는 컴포넌트들은 vaule 값을 공유받을 수 있다 */}
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
