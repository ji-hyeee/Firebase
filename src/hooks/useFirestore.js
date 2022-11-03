import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

// 우리가 받을 응답을 저장할 객체입니다. 객체이기 때문에 리듀서로 관리하겠습니다. 
// 그리고 이전까지는 상태를 관리할 때 error나 isPending을 위한 useState을 따로 작성해왔지만 이번에는 useReducer로 한번에 관리해보겠습니다.

// document : 파이어스토어에 document의 생성을 요청하면 우리가 생성한 document를 반환합니다. 
// isPending: 통신중인지 아닌지 상태
// success : 요청에 대한 응답의 성공 유무

// 상태를 관리하기 위한 값들을 만들었었는데 useFirestore 에서는 관리해야할 값들이 몇 개 더 있다
// 1. firestore에서 데이터를 저장하는 단위인 document
// 2. firestore와 통신여부를 위한 success 와 false 
// 여러 데이터를 관리해야 하므로 state 대신 reducer hook을 사용할 것

// 여러 데이터를 객체 형태로 관리한다
const initState = {
    isPending: false,
    document: null,
    success: false,
    error: null
}

// 전달 받는 action에 따른 state 업데이트를 위한 함수입니다.
const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addDoc':
            // document 에는 addDoc함수를 통해서 payload에 docRef를 받아올 수 있었다
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

// transaction - firestore 에 데이터 저장을 요청할 때 그때 우리가 저장할 컬렉션의 이름을 인자로 넣어줄 것이다

// 컬렉션이 뭔가요?
// firestore의 데이터 모델
// firestore는 데이터를 객체의 형태로 저장합니다. 이때 데이터를 객체의 형태로 저장하는 공간을 문서(document) 라고 부릅니다.
// 그리고 여러 문서들을 저장하는 문서의 컨테이너인 컬렉션이란 개념이 존재합니다. 
// firestore는 기존의 데이터베이스처럼 테이블, 행의 개념이 없고 document와 collection 개념으로 다룬다

// 우리가 데이터를 저장할 컬렉션을 인자로 합니다.
export const useFirestore = (transaction) => {

    // response - 관리할 데이터
    // storeReducer - dispatch 를 통해서 호출할 함수
    // initState - 초기값

    // response에는 우리의 요청에 대한 firestore로 부터의 응답을 저장합니다.
    // 주로 데이터의 저장 성공 또는 요청한 문서 데이터일 것이며, 때문에 객체데이터를 다루는데 유용한 useReducer를 사용합니다.
    const [response, dispatch] = useReducer(storeReducer, initState);


    // firestore에 접근하기 위한 코드
    // 컬렉션 레퍼런스 - 컬렉션의 참조를 firestore로부터 요구 / 데이터를 넣고 빼고 할수있도록

    // colRef : 우리가 만들 컬랙션의 참조입니다. 우리가 따로 컬렉션을 만들지는 않았지만, 
    // 원하는 컬렉션의 참조를 요구하기만 해도 파이어스토어는 자동으로 해당 컬렉션을 생성해줍니다. 
    const colRef = collection(appFireStore, transaction);

    // 컬렉션에 문서를 추가합니다.
    // addDoc 함수를 사용하여 document를 추가할 수 있다
    const addDocument = async (doc) => {
        // addDocument가 실행되면 통신중이라는 걸 나타내기
        dispatch({ type: "isPending" });

        // docRef 는 통신기능을 담당하므로 try, catch로 안전하게 예외처리하기
        try {
            // 타임스탬프 추가
            // 특정한 시간을 나타내거나 기록하는 문자열
            // 데이터를 파이어스토어에 저장할 때 저장하는 시간도 타임스탬프를 통해서 같이 넘겨주자
            // 시간을 저장하면 파이어스토어에 저장된 데이터를 시간 순서나 역순서로 정렬할 수 있다
            // config.js 에서 설정하고 import 해오기

            // fromDate 함수를 통해서 js 내장객체 new Date 를 실행
            const createdTime = timestamp.fromDate(new Date())

            // addDoc의 첫번째 인자로 collection의 참조
            // 두번째 인자는 저장할 데이터 - addDocument가 실행될 때 전달받는 인자

            // 시간 추가해주기 - doc을 전개구문으로 바꿔서 추가해주기
            const docRef = await addDoc(colRef, { ...doc, createdTime });

            // docRef가 document의 참조라고 했잖아여 어떤 데이터를 받아오는지 확인해봅시다
            console.log(docRef)

            // 성공적으로 통신이 끝났을 때 - 데이터를 무사히 받아온 것
            dispatch({ type: "addDoc", payload: docRef });
        } catch (error) {
            // 에러 발생시
            dispatch({ type: "error", payload: error.message });
        }
    }

    // 컬렉션에서 문서를 제거합니다.
    // id 에는 나중에 삭제할 document의 id가 들어갈 것
    const deleteDocument = (id) => {

    }

    // response - firestore를 통해서 전달받는 결과값
    return { addDocument, deleteDocument, response }
}

