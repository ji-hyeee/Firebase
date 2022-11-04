import styles from './Home.module.css';

import { useFirestore } from '../../hooks/useFirestore';

export default function DiaryList({ diaries }) {
    const { deleteDocument } = useFirestore('diary');
    return (
        <>
            {
                diaries.map((item) => {
                    return (
                        <li key={item.id}>
                            <strong className={styles.title}>{item.title}</strong>
                            <p className={styles.text}>{item.text}</p>

                            {/* 삭제버튼 만들어주기 */}
                            <button type='button' onClick={() => { deleteDocument(item.id) }}>삭제</button>
                        </li>
                    )
                })
            }
        </>
    )
}