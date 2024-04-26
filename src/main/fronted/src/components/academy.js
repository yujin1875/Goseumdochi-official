import '../css/academy.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div id="App">
            <div id="header_academy"/>
            <div id="academy_write">
                <div id='academy_write_buttons'>
                    <a>본인 확인을 위한 신청자 이름과 전화번호를 입력해주세요</a>
                    <input type="name" placeholder="이름" value={inputDirectorName} onChange={handleInputChange1}/><hr/>
                    <input type="phonenumber" placeholder="전화번호" value={inputsDirectorPhoneNumber} onChange={handleInputChange2}/><hr/>
                    <div id="btn_academy">
                        <input type="submit" value="신청서 제출" id="submit_btn" onClick={GoAcademyRegister}/>
                        <input type="submit" value="제출한 신청서 확인" id="check_btn"/>
                    </div>
                </div>
            </div>
            <div id="footer_academy"/>
        </div>
    );
}

export default App4;