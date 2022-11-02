import { useReducer } from "react";
import { appFireStore } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

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
    document: null,
    isPending: false,
    error: null,
    success: false
}

// 전달 받는 action에 따른 state 업데이트를 위한 함수입니다.
const storeReducer = (state, action) => {
    switch (action.type) {

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
    const addDocument = (doc) => {

    }

    // 컬렉션에서 문서를 제거합니다.
    // id 에는 나중에 삭제할 document의 id가 들어갈 것
    const deleteDocument = (id) => {

    }

    // response - firestore를 통해서 전달받는 결과값
    return { addDocument, deleteDocument, response }

}