import './subcss/academyForm_Update.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import '../../css/academy_register.css';
import logo from '../images/goseumdochi.png';
import Post from "../../components/util/post";

function AcademyFormUpdate() {
    const location = useLocation();
    const navigate = useNavigate();

    const inputDirectorName = location.state?.inputDirectorName || '이름';
    const inputDirectorEmail = location.state?.inputDirectorEmail || 'example@goseumdochi.com';
    const inputsDirectorPhoneNumber = location.state?.inputsDirectorPhoneNumber || '010XXXXXXXX';

    const [popup, setPopup] = useState(false);
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    const { responseData } = location.state || {};
    const [academyForm, setAcademyForm] = useState({
        id: responseData?.id || '',
        academyName: responseData?.academyName || '',
        academyPhoneNumber: responseData?.academyPhoneNumber || '',
        academyPostcode: responseData?.academyPostcode || '',
        academyAddress: responseData?.academyAddress || '',
        academyAddressDetail: responseData?.academyAddressDetail || '',
        directorName: responseData?.directorName || '',
        directorEmail: responseData?.directorEmail || '',
        directorPhoneNumber: responseData?.directorPhoneNumber || '',
        authStatus: responseData?.authStatus,
        authNumber: '',
    });
    if (!responseData) { // 혹시나 받은 학원신청서 정보가 비어있다면
        return <div>조회 데이터가 없습니다.</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAcademyForm(prevAcademyForm => ({
            ...prevAcademyForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await
                axios.post('/api/academy/form/update', academyForm);
            console.log('Form Submit success:', response.data);
            alert("학원신청서 수정 성공")
            navigate('/');
        } catch (error) {
            console.error('Form Submit error:', error);
            alert(`${error.response.data}`);
        }
    };


    return (
        <div id="App">
            <div id="header_academy_register"/>
            <div id="body_academy_register">
                <form id="write_academy_register" onSubmit={handleSubmit}>
                    <div id="write_header_academy_register">
                        <div id="hd">
                            <img src={logo}/>
                            <a>학원 신청폼 수정</a>
                        </div>
                    </div>

                    <div>
                        <span>신청서 수락 현황: </span>
                        {academyForm.authStatus === 0 ? '대기' : academyForm.authStatus === 1 ? '수락' : '실패'}
                    </div>

                    <div id="write1_academy_register">
                        <a>원장 정보 입력</a>
                        <input
                            type="text"
                            name="directorName"
                            value={academyForm.directorName} // inputDirectorName
                            onChange={handleChange}
                            placeholder={inputDirectorName}
                            id="name"
                            required
                        /><hr/>
                        <input
                            type="email"
                            name="directorEmail"
                            value={academyForm.directorEmail} // inputDirectorEmail
                            onChange={handleChange}
                            placeholder={inputDirectorEmail}
                            required
                        />
                        <input
                            type="text"
                            name="directorPhoneNumber"
                            value={academyForm.directorPhoneNumber} // inputsDirectorPhoneNumber
                            onChange={handleChange}
                            placeholder={inputsDirectorPhoneNumber}
                            required
                        />
                        <input type="submit" value="인증" id="sub1_btn"/><hr/>
                        <input
                            type="text"
                            name="authNumber"
                            value={academyForm.authNumber}
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
                            value={academyForm.academyName}
                            onChange={handleChange}
                            placeholder="이름"
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="academyPhoneNumber"
                            value={academyForm.academyPhoneNumber}
                            onChange={handleChange}
                            placeholder="전화번호"
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="academyPostcode"
                            value={academyForm.academyPostcode}
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
                        />{popup && <Post home={academyForm} setHome={setAcademyForm}></Post>}<hr/>
                        <input
                            type="text"
                            name="academyAddress"
                            value={academyForm.academyAddress}
                            onChange={handleChange}
                            placeholder="주소"
                            readOnly
                            required
                        /><hr/>
                        <input
                            type="text"
                            name="academyAddressDetail"
                            value={academyForm.academyAddressDetail}
                            onChange={handleChange}
                            placeholder="상세주소"
                            required
                        /><hr/>
                    </div>
                    <div id="write_footer_academy_register">
                        {/*신청서가 대기 상태일 때만 수정할 수 있게*/}
                        {academyForm.authStatus === 0 ? (
                            <input type="submit" value="신청서 수정" id="submit_btn"/>
                        ) : "신청서를 수정할 수 없습니다"}
                    </div>
                </form>
            </div>
            <div id="footer_academy_register">
                <a>문의 | midas2024.ver01@gmail.com</a>
            </div>
        </div>
    );
}

export default AcademyFormUpdate;