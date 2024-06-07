import '../css/academy.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function App4() {
    const GoAcademyRegister=()=>{
        navigate('/academyform', { state: { inputDirectorName, inputsDirectorPhoneNumber } });
    }

    const [inputDirectorName, setInputValue1] = useState('');
    const [inputsDirectorPhoneNumber, setInputValue2] = useState('');
    const navigate = useNavigate();

    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
    };

    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    };

    const handleOpen = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        try {
            const response = await axios.get('/api/academy/form/find', {
                params: {
                    directorName: inputDirectorName,
                    directorPhoneNumber: inputsDirectorPhoneNumber,
                },
            });
            console.log(response.data);

            if (response.status === 200) { // 조회 성공
                navigate('/academy/form/update', { state: { responseData: response.data } });
            }

        } catch (error) {
            console.error('실패:', error.response || error);
            // 실패 처리 로직 (예: 에러 메시지 표시)
            alert(`${error.response.data}`)
        }
    };

    return (
        <div id="App">
            <div id="header_academy"/>
            <form id="academy_write" onSubmit={handleOpen}>
                <div id='academy_write_buttons'>
                    <a>본인 확인을 위한 신청자 이름과 전화번호를 입력해주세요</a>
                    <input type="name" placeholder="이름" value={inputDirectorName} onChange={handleInputChange1}/><hr/>
                    <input type="phonenumber" placeholder="010-0000-0000" value={inputsDirectorPhoneNumber} onChange={handleInputChange2}/><hr/>
                    <div id="btn_academy">
                        <input type="submit" value="제출한 신청서 확인" id="check_btn"/>
                    </div>
                </div>
            </form>
            <div id="footer_academy"/>
        </div>
    );
}

export default App4;