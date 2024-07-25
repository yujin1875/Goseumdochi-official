import '../css/main.css';
import logo from './images/goseumdochi_moving.gif';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App6() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [lectureList, setLectureList] = useState([]);

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

    const GoLecturePotal = (lecture) => {
        navigate('/lectureportal', { state: { user: user, lecture: lecture } });
    };

    const GoRecommendUniv = () => {
        navigate('/student/recommend/univ', { state: { user: user } });
    };

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        // console.log("User id from localStorage:", userIdFromLocalStorage); // 로컬 스토리지에서 사용자 이름 확인
        setUserName(userIdFromLocalStorage); // 사용자 이름 상태 업데이트
    }, []);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await
                    axios.get(`/api/student/${user.id}/lecture`);
                setLectureList(response.data);
            } catch (error) {
                console.error('Error fetching lectures:', error);
            }
        };

        fetchLectures();
    }, []);


        return (
            <div id="App">
                <div id="main-menu">
                    <div id="header_main">
                        <img src={logo} onClick={Gomain}/>
                        <div id="user_info">
                            {userName && `${userName}님`}
                            <button>
                                <span>로그아웃</span>
                            </button>
                        </div>
                    </div>
                <div id="buttons_main">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice}/>
                    <input type="submit" value="커뮤니티" id="community_btn" onClick={Gocommunity}/>
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage}/>
                    <div id="rect"/>
                </div>
                <div>
                    <button onClick={GoRecommendUniv}>대학 학과추천</button>
                </div>
                <div id="contents_main">
                    <div id="contents1_main">
                        <div id="main_calendar">
                            <h2>캘린더</h2>
                            <div id="content_calendar">
                            </div>
                            <div id="more_calendar">
                            </div>
                        </div>
                        {/* 수강과목 리스트*/}
                        <div id="main_subject">
                            <h2>수강과목</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>과목명</th>
                                    <th>시간</th>
                                </tr>
                                </thead>
                                <tbody>
                                {lectureList.map((lecture) => (
                                    <tr key={lecture.id} onClick={() => GoLecturePotal(lecture)} style={{ cursor: 'pointer' }}>
                                        <td>{lecture.name}</td>
                                        <td>
                                            {lecture.lectureTimeDTOList.map((time, index) => (
                                                <div key={time.id}>
                                                    {time.day} {time.startTime} - {time.endTime}{lecture.lectureTimeDTOList.length - 1 !== index && ", "}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="contents2_main">
                        <div id="main_schedule">
                            <h2>수업일정</h2>
                            <div id="content_schedule">
                            </div>
                        </div>
                        <div id="main_submission">
                            <h2>남은 제출</h2>
                            <div id="content_submission">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer_main">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App6;