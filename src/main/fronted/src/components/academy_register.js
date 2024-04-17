import '../css/academy_register.css';
import logo from './images/goseumdochi.png';
import React, { useState } from 'react';
import axios from 'axios';
//* 에러나누
import { useNavigate } from 'react-router-dom'; // useHistory 훅 말고 useNavigate!! 임포트합니다.
import Post from "../components/util/post";

function App7() {
    // 입력받은 변수 저장 (Controller로 보낼거임)
    const [inputs, setInputs] = useState({
        academyName: '',
        academyPhoneNumber: '',
        academyPostcode: '',
        academyAddress: '',
        academyAddressDetail: '',
        directorName: '',
        directorPhoneNumber: '',
        authNumber: ''
    });
    // 페이지 변경 위해
    const navigate = useNavigate();

    // 우편주소 찾기 팝업 띄우기 변수
    const [popup, setPopup] = useState(false);
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    // 입력이 바뀔때마다 inputs 변수값 변경
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    // 폼 제출하면 실행 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // axios를 사용하여 서버에 신청서 등록 요청을 보냅니다.
            const response = await
                axios.post('/api/academy/form', inputs);
            console.log('Form Submit success:', response.data);
            // 성공 후, 다른 페이지로 리디렉션합니다.
            alert("학원신청서 등록 성공")
            navigate('/');
        } catch (error) {
            console.error('Form Submit error:', error);
            alert(`${error.response.data}`); // 작은따옴표(')가 아니라 왼쪽위(`)
        }
    };


    return (
        <div id="App">
            <div id="header_academy_register"/>
            <div id="body_academy_register">
                <div id="write_academy_register" onSubmit={handleSubmit}>
                    <div id="write_header_academy_register">
                        <div id="hd">
                            <img src={logo}/>
                            <a>학원 등록 신청</a>
                        </div>
                    </div>
                    <div id="write1_academy_register">
                        <a>원장 정보 입력</a>
                        <input
                            type="text"
                            name="directorName"
                            value={inputs.directorName}
                            onChange={handleChange}
                            placeholder="이름"
                            id="name"
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="directorPhoneNumber"
                            value={inputs.directorPhoneNumber}
                            onChange={handleChange}
                            placeholder="010-0000-0000"
                            required
                        />
                        <input type="submit" value="인증" id="sub1_btn"/><hr/>
                        <input
                            type="text"
                            name="authNumber"
                            value={inputs.authNumber}
                            onChange={handleChange}
                            placeholder="인증번호"
                            required
                        />
                        <input type="submit" value="확인" id="sub2_btn"/><hr/>
                    </div>
                    <div id="write2_academy_register">
                        <a>학원 정보 입력</a>
                        <input
                            type="text"
                            name="academyName"
                            value={inputs.academyName}
                            onChange={handleChange}
                            placeholder="이름"
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="academyPhoneNumber"
                            value={inputs.academyPhoneNumber}
                            onChange={handleChange}
                            placeholder="전화번호"
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="academyPostcode"
                            value={inputs.academyPostcode}
                            onChange={handleChange}
                            placeholder="우편주소"
                            id="address_num"
                            readOnly
                            required
                        />
                        <input
                            type="submit"
                            value="검색"
                            onClick={handleComplete}
                            id="sub3_btn"
                        />{popup && <Post home={inputs} setHome={setInputs}></Post>}<hr/>
                        <input
                            type="text"
                            name="academyAddress"
                            value={inputs.academyAddress}
                            onChange={handleChange}
                            placeholder="주소"
                            readOnly
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="academyAddressDetail"
                            value={inputs.academyAddressDetail}
                            onChange={handleChange}
                            placeholder="상세주소"
                            required
                        /><hr/>
                    </div>
                    <div id="write_footer_academy_register">
                        <input type="submit" value="신청서 제출" id="submit_btn"/>
                    </div>
                </div>
            </div>
            <div id="footer_academy_register">
                <a>문의 | midas2024.ver01@gmail.com</a>
            </div>
        </div>
    );
}

export default App7;