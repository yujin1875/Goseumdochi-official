import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/notice.css';
import logo from './images/goseumdochi.png';

function NoticePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const studentId = location.state?.studentId; // 메인에서 전달받은 studentId
    const [notices, setNotices] = useState([]);

    // 메인 페이지로 이동
    const goToMain = () => {
        navigate('/main', {state: {studentId}});
    };
    const Gonotice = () => {
        navigate('/notice', { state: { studentId } });
    };
    const Gocommunity = () => {
        navigate('/community', { state: { studentId } });
    };
    const Gomypage = () => {
        navigate('/mypage', { state: { studentId } });
    };

    // 공지사항 데이터 불러오기
    useEffect(() => {
        if (studentId) {
            axios.get(`/api/academyNotice/student/${studentId}`)
                .then(response => {
                    console.log(response.data);
                    setNotices(response.data);
                })
                .catch(error => console.error('Error fetching notices:', error));
        }
    }, [studentId]);

    return (
        <div id="App">
            <div id="notice-menu">
                <div id="header_notice">
                    <img src={logo} onClick={goToMain} alt="Logo"/>
                    <div id="user_info">ID: {studentId}</div>
                </div>
                <div id="buttons_notice">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice} />
                    <input type="submit" value="커뮤니티" id="community_btn" onClick={Gocommunity} />
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage} />
                    <div id="rect" />
                </div>
                <div id="contents_notice">
                    <div id="aboutNotice_notice">
                        <div id="category_aboutNotice_notice">
                            <ul>
                                <li><a>공지사항</a></li>
                                <li><a>강의자료</a></li>
                                <li><a>온라인강의</a></li>
                                <li><a>과제</a></li>
                                <li><a>시험</a></li>
                            </ul>
                        </div>
                        <div id="contents_aboutNotice_notice">
                            <div id="category_contents_notice">
                                <div id="num">번호</div>
                                <div id="title">제목</div>
                                <div id="postperson">게시자</div>
                                <div id="postdate">게시일</div>
                                <div id="visit">조회수</div>
                            </div>
                            <div id="body_contents_notice">
                                {notices.length === 0 ? (
                                    <div>공지사항이 없습니다.</div>
                                ) : (
                                    notices.map((notice, index) => (
                                        <div key={notice.num} className="notice-item">
                                            <div className="num">{index + 1}</div>
                                            <div className="title">{notice.title}</div>
                                            <div className="postperson">관리자</div>
                                            <div className="postdate">{new Date(notice.regdate).toLocaleDateString()}</div>
                                            <div className="visit">0</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer_notice">
                    <a href="mailto:midas2024.ver01@gmail.com">문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default NoticePage;
