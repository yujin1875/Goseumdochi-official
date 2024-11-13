import React, { useEffect, useState } from 'react';
import logo from './images/goseumdochi_moving.gif';
import message_icon from './images/message.png';
import logout_icon from './images/logout.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/notice.css';

function NoticePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const studentId = location.state?.studentId; // 메인에서 전달받은 studentId
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항 저장

    // 날짜와 시간을 YYYY-MM-DD HH:mm 형식으로 변환
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
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

    // 공지사항 제목 클릭 시 상세 보기
    const viewNoticeDetails = (notice) => {
        setSelectedNotice(notice);  // 클릭한 공지사항 저장
    };

    // 모달 닫기
    const closeModal = () => {
        setSelectedNotice(null);  // 선택된 공지사항 초기화
    };

    return (
        <div id="App">
            <div id="notice-menu">
                <div id="header_notice">
                    <img src={logo} onClick={() => navigate('/main', { state: { studentId } })} alt="Logo" />
                    <div id="user_info">
                        <button className="icon" onClick={() => navigate('/message/list', { state: { studentId } })}>
                            <img src={message_icon} alt="쪽지" style={{ width: '20px', height: '20px' }} />
                        </button>
                        <button className="icon" onClick={() => navigate('/integrate/login', { state: { studentId } })}>
                            <img src={logout_icon} alt="로그아웃" style={{ width: '20px', height: '20px' }} />
                        </button>
                    </div>
                </div>
                <div id="buttons_notice">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={() => navigate('/notice', { state: { studentId } })} />
                    <input type="submit" value="커뮤니티" id="community_btn" onClick={() => navigate('/community', { state: { studentId } })} />
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={() => navigate('/mypage', { state: { studentId } })} />
                    <div id="rect" />
                </div>
                <div id="contents_notice">
                    <div id="aboutNotice_notice">
                        <div id="category_aboutNotice_notice">
                            <a>공지사항</a>
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
                                        <div
                                            key={notice.num}
                                            className="notice-item"
                                            onClick={() => viewNoticeDetails(notice)} // 제목 클릭 시 상세 보기
                                        >
                                            <div className="num">{index + 1}</div>
                                            <div className="title">{notice.title}</div>
                                            <div className="academy-name">[{notice.academyName}]</div>
                                            <div className="postperson">{notice.directorName}</div>
                                            <div className="postdate">{formatDateTime(notice.regdate)}</div>
                                            <div className="visit">0</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 공지사항 상세보기 모달 */}
                {selectedNotice && (
                    <div id="notice-modal" className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={closeModal}>&times;</span>
                            <h2>{selectedNotice.title}</h2>
                            <p><strong>작성자:</strong> {selectedNotice.directorName}</p>
                            <p><strong>학원:</strong> {selectedNotice.academyName}</p>
                            <p><strong>게시일:</strong> {formatDateTime(selectedNotice.regdate)}</p>
                            <p><strong>내용:</strong></p>
                            <p>{selectedNotice.body}</p>
                        </div>
                    </div>
                )}

                <div id="footer_notice">
                    <a href="mailto:midas2024.ver01@gmail.com">문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default NoticePage;
