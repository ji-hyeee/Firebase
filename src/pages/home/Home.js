import styles from './Home.module.css';
import DiaryForm from './DiaryForm';

export default function Home() {
    return (
        <main className={styles.cont}>
            <aside className={styles.side_menu}>
                {/* 범용적으로 사용하는 컴포넌트가 아니므로 home 폴더 안에 만들겠다 */}
                <DiaryForm></DiaryForm>
            </aside>
            <ul className={styles.content_list}>
                dairy list
            </ul>
        </main>
    )
}