import '../css/mypage.css';
import logo from './images/goseumdochi.png';
import React, { useState } from 'react';
import axios from 'axios';

function App12() {
    const Gomain=()=>{
        window.location.href='/main'
    }
    const Gonotice=()=>{
        window.location.href='/notice'
    }

    const Gomypage=()=>{
        window.location.href='/mypage'
    }

    const [visibleDiv, setVisibleDiv] = useState('Profile');

    const showDivProfile = () => {
        setVisibleDiv('Profile');
    };

    const showDivChangePW = () => {
        setVisibleDiv('ChangePW');
    };

    const [inputs, setInputs] = useState({
        currentPassword:'',
        newPassword:'',
        confirmNewPassword:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", inputs);
        try {
            const response = await axios.post('/api/student/changePassword', inputs);
            console.log('Form Submit success:', response.data);
            window.location.href='/login';
        } catch (error) {
            console.error('Form Submit error:', error);
            if (error.response) {
                console.log("Error response data:", error.response.data);
                alert(`${error.response.data}`);
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div id="App">
            <div id="mypage-menu">
                <div id="header_mypage">
                    <img src={logo} onClick={Gomain}/>
                    <div id="user_info"></div>
                </div>
                <div id="buttons_mypage">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice}/>
                    <input type="submit" value="커뮤니티" id="community_btn"/>
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage}/>
                    <div id="rect"/>
                </div>
                <div id="contents_mypage">
                    <div id="contents1_mypage">
                        <div id="userphoto_mypage">
                            <div id="photo">
                                <div id="header_photo"/>
                                등록된<hr/>사진이<hr/>없습니다
                            </div>
                            <button id="my" onClick={showDivProfile}>
                                <span>내 프로필</span>
                            </button><hr/>
                            <button id="changePW" onClick={showDivChangePW}>
                                <span>비밀번호 변경</span>
                            </button><hr/>
                            <button id="logout">
                                <span>로그아웃</span>
                            </button>
                        </div>
                        <div id="info_mypage">
                            {visibleDiv === 'Profile' && (
                              <>
                                <div id="category_info_mypage">
                                    <div id="cate_name">이름</div>
                                    <div id="cate_phonenum">휴대전화</div>
                                    <div id="cate_birthdate">생년월일</div>
                                    <div id="cate_email">이메일</div>
                                    <div id="cate_academy">등록된 학원</div>
                                </div>
                                <div id="user_info_mypage">
                                    <div id="blank"/>
                                    <div id="user_name">학생이름</div>
                                    <div id="user_phonenum">000-0000-0000</div>
                                    <div id="user_birthdate">0000.00.00</div>
                                    <div id="user_email">abc@gmail.com</div>
                                    <div id="user_academy">컴퓨터 학원, 코딩학원</div>
                                </div>

                              </>
                            )}
                            {visibleDiv === 'ChangePW' && (
                              <>
                                <form id="ChangePassWord_mypage" onSubmit={handleSubmit}>
                                    <h2>비밀번호 변경</h2>
                                    <input
                                        type="text"
                                        name="currentPassword"
                                        value={inputs.currentPassword}
                                        placeholder="현재 비밀번호"
                                        id="currentPassword"
                                        required
                                    /><hr/>
                                    <input
                                        type="text"
                                        name="newPassword"
                                        value={inputs.newPassword}
                                        placeholder="새 비밀번호"
                                        id="newPassword"
                                        required
                                    /><hr/>
                                    <input
                                        type="text"
                                        name="confirmNewPassword"
                                        value={inputs.confirmNewPassword}
                                        placeholder="새 비밀번호 확인"
                                        id="confirmNewPassword"
                                        required
                                    /><hr/>
                                </form>
                              </>
                            )}
                        </div>
                    </div>
                </div>
                <div id="b_mypage">
                    <button id="change_btn">
                        <span>수정</span>
                    </button><hr/>
                    <button id="save_btn">
                        <span>저장</span>
                    </button><hr/>
                </div>
                <div id="footer_mypage">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App12;