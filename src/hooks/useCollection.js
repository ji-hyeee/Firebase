// 일기를 쓰고 저장하는 것까지 완료
// 특정 계정으로 로그인시 일기 목록을 보고 싶다 - 데이터 가져오기
import { useEffect, useState } from "react";

import { appFireStore } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

// 두번째 인자 추가 - myQuery - 배열이 들어감
export const useCollection = (transaction, myQuery) => {

    // 문서들의 데이터를 관리합니다.
    const [documents, setDocuments] = useState(null);
    // 에러 상태를 관리합니다.
    const [error, setError] = useState(null);

    // collection에 변화가 생길때마다 실행합니다. 때문에 항상 최신의 컬랙션 상태를 반환 받을 수 있습니다.
    useEffect(() => {

        let q;
        if (myQuery) {
            // 첫번쨰 조건 - 로그인 유저의 id와 도큐먼트의 유저 id가 일치하는 것만 가져오겠다
            // 두번째 조건 - 시간에 따른 정렬 - orderBy - 내림차순 desc(최신 - 오래된) / 오름차순 asc
            q = query(collection(appFireStore, transaction), where(...myQuery),
                orderBy('createdTime', 'desc'));
        }

        // onSnapshot - firebase에서 제공하는 collection의 내용을 가져오는 함수(메서드)
        // onSnapshot 함수는 가장 최신의 컬랙션의 내용을 반환하는 함수입니다. 함수는 데이터 수신을 중단하기 위한 unsubscribe 함수를 반환합니다. 더 이상 데이터를 수신 대기할 필요가 없을때 사용합니다.
        const unsubscribe = onSnapshot(myQuery ? q : (collection(appFireStore, transaction)),

            // 응답받은 컬랙션이 snapshot에 저장됩니다. - 컬랙션에 접근 가능
            (snapshot) => {
                let result = [];

                // docs 는 문서를 배열로 저장하고 있습니다. - forEach 배열 메서드 사용 가능
                snapshot.docs.forEach((doc) => {

                    // 전개구문을 이용해 문서의 데이터를 가져오는 data()함수의 반환값을 객체에 나열합니다. 
                    // 그리고 나중에 사용할 수 있도록 문서 id 값을 추가합니다.
                    result.push({ ...doc.data(), id: doc.id });
                })

                setDocuments(result);
                setError(null);
            },
            (error) => {
                setError(error.message);
            });

        // useEffect 훅의 return 값에 함수를 반환하면 clean-up 함수가 됩니다.  
        // 외부에서 데이터를 구독하는 경우 clean-up 함수는 useEffect훅을 사용하는 컴포넌트가 마운트 해제될때 실행되어 구독을 종료하게 됩니다.
        // 참고 : https://ko.reactjs.org/docs/hooks-effect.html#example-using-hooks-1
        return unsubscribe;
    }, [collection])

    return { documents, error }
}

