import styles from './Home.module.css';

import DiaryForm from './DiaryForm';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Home() {

    // user 정보 어디서 관리하고 있나요? context
    const { user } = useAuthContext();

    return (
        <main className={styles.cont}>
            <aside className={styles.side_menu}>
                {/* 범용적으로 사용하는 컴포넌트가 아니므로 home 폴더 안에 만들겠다 */}
                <DiaryForm uid={user.uid}></DiaryForm>
            </aside>
            <ul className={styles.content_list}>
                dairy list
            </ul>
        </main>
    )
}