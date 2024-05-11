import '../css/academy.css';
<<<<<<< HEAD

function App4() {
=======
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

>>>>>>> origin/hj
    return (
        <div id="App">
            <div id="header_academy"/>
            <div id="academy_write">
                <div id='academy_write_buttons'>
                    <a>본인 확인을 위한 신청자 이름과 전화번호를 입력해주세요</a>
<<<<<<< HEAD
                    <input type="name" placeholder="이름"/><hr/>
                    <input type="phonenumber" placeholder="전화번호"/><hr/>
                    <div id="btn_academy">
                        <input type="submit" value="신청서 제출" id="submit_btn"/>
=======
                    <input type="name" placeholder="이름" value={inputDirectorName} onChange={handleInputChange1}/><hr/>
                    <input type="phonenumber" placeholder="010-0000-0000" value={inputsDirectorPhoneNumber} onChange={handleInputChange2}/><hr/>
                    <div id="btn_academy">
                        <input type="submit" value="신청서 제출" id="submit_btn" onClick={GoAcademyRegister}/>
>>>>>>> origin/hj
                        <input type="submit" value="제출한 신청서 확인" id="check_btn"/>
                    </div>
                </div>
            </div>
            <div id="footer_academy"/>
        </div>
    );
}

export default App4;