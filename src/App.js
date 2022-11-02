import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  // 화면 렌더링도 유저 정보를 받아온 후(통신후)에 렌더링 되도록 바꿔보자
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            {/* user 정보가 참이면(로그인이 되어있는 상태) Home 화면
            아니라면 다른 페이지로 이동 - navigate 컴포넌트 사용 
            replace 속성의 값이 false 라면, 
            브라우저에서 뒤로 가기를 했을 때 리다이렉트 되기 이전의 url로 이동하는것이 가능하지만 
            true 라면 불가능합니다. - 홈화면으로 이동하지 못하도록 막아주기*/}
            <Route
              path='/'
              element={user ? <Home /> : <Navigate replace={true} to="/login" />}>
            </Route>
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate replace={true} to="/" />}></Route>
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate replace={true} to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      ) : "loading..."}
    </div>
  );
}

export default App



