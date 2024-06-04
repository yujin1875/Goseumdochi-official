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

    const Gocommunity=()=>{
        window.location.href='/community'
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
        if (!inputs.currentPassword || !inputs.newPassword || !inputs.confirmNewPassword) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }
        console.log("폼 데이터:", inputs);
        try {
            const response = await axios.post('/api/student/changePassword', inputs, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('폼 제출 성공:', response.data);
            alert('비밀번호가 변경되었습니다.');
            window.location.href = '/login';
        } catch (error) {
            console.error('폼 제출 오류:', error);
            if (error.response) {
                console.log("오류 응답 데이터:", error.response.data);
                switch (error.response.data) {
                    case "현재 비밀번호가 일치하지 않습니다.":
                    case "새 비밀번호는 현재 비밀번호와 달라야 합니다.":
                    case "새 비밀번호 확인이 일치하지 않습니다.":
                    case "로그인이 필요합니다.":
                        alert(error.response.data);
                        break;
                    default:
                        alert('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
                }
            } else {
                alert('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
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
                    <input type="submit" value="커뮤니티" id="community_btn" onClick={Gocommunity}/>
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
                                          type="password"
                                          name="currentPassword"
                                          value={inputs.currentPassword}
                                          placeholder="현재 비밀번호"
                                          onChange={handleChange}
                                          id="currentPassword"
                                          required
                                      />
                                      <hr/>
                                      <input
                                          type="password"
                                          name="newPassword"
                                          value={inputs.newPassword}
                                          placeholder="새 비밀번호"
                                          onChange={handleChange}
                                          id="newPassword"
                                          required
                                      />
                                      <hr/>
                                      <input
                                          type="password"
                                          name="confirmNewPassword"
                                          value={inputs.confirmNewPassword}
                                          placeholder="새 비밀번호 확인"
                                          onChange={handleChange}
                                          id="confirmNewPassword"
                                          required
                                      />
                                      <hr/>
                                      <input type="submit" value="비밀번호 변경"/>
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