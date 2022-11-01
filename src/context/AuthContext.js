import { createContext, useReducer } from "react";

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
        user: null
    })

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
