import { Link } from 'react-router-dom';
import styles from './Nav.module.css'

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Nav() {
    const { logout } = useLogout();
    // user의 상태에 따라 link 보여주기
    // context 에서 user 상태를 불러와줍니다
    const { user } = useAuthContext();

    return (
        <nav className={styles.nav}>
            <h1 className={styles.tit}>나의 일기</h1>
            <ul className={styles.list_nav}>
                {/* user 정보가 없을 경우 */}
                {!user &&
                    <>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
                    </>
                }
                {/* user 정보가 있을 경우 */}
                {user &&
                    <>
                        <li>
                            <strong>환영합니다 {user.displayName}님 🥳</strong>
                            <button type='button' onClick={logout}>로그아웃</button>
                        </li>
                    </>
                }

            </ul>
        </nav>
    )
}

