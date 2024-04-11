// React와 필요한 훅을 react 라이브러리에서 불러옵니다.
import React, {useState, useEffect} from 'react';

// App7이라는 이름의 함수형 컴포넌트를 선언합니다.
function Test() {
    // message라는 이름의 상태 변수와 이를 변경할 수 있는 setMessage 함수를 선언합니다.
    // useState 훅을 사용하여 초기 상태를 빈 배열로 설정합니다.
    const [message, setMessage]=useState([]);

    // useEffect 훅을 사용하여 컴포넌트가 마운트(화면에 처음 나타날 때)될 때 실행할 코드를 정의합니다.
    useEffect(()=>{
        // 웹 API 주소로 HTTP 요청을 보내고, 응답을 받습니다.
        fetch("/api/demo-web")
            .then((response)=>{
                // 응답을 JSON 형태로 변환합니다.
                return response.json();
            })
            .then((data)=>{
                // 변환된 데이터를 message 상태 변수에 저장합니다.
                setMessage(data);
            });
    },[]); // useEffect의 두 번째 인자로 빈 배열을 전달하여, 이 코드가 컴포넌트 마운트 시 단 한 번만 실행되도록 합니다.

    // 컴포넌트가 화면에 렌더링할 JSX를 정의합니다.
    return (
        <div>
            {/* message 상태 변수의 값을 화면에 표시합니다. */}
            {message}
        </div>
    );
}

// App7 컴포넌트를 다른 파일에서 불러와 사용할 수 있도록 내보냅니다.
export default Test;
