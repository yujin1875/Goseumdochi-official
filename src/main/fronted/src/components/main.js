import '../css/main.css';
import logo from './images/goseumdochi_moving.gif';
import message_icon from './images/message.png';
import logout_icon from './images/logout.jpg';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Link} from "react-router-dom";
import '../css/nav.css';

function App6() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};

    const [lectureList, setLectureList] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트 상태
    const [isModalOpen, setIsModalOpen] = useState(false);    // 모달 상태

    const Gomain = () => {
        window.location.href = '/main';
    };
    const Gonotice = () => {
        window.location.href = '/notice';
    };
    const Gocommunity = () => {
        window.location.href = '/community';
    };
    const Gomypage = () => {
        window.location.href = '/mypage';
    };

    const GoLecturePotal = (lecture) => {
        navigate('/lectureportal', { state: { user: user, lecture: lecture } });
    };

    const GoMessageList = () => {
        navigate('/message/list', { state: { user: user } });
    };

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        setUserName(userIdFromLocalStorage);
    }, []);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`/api/student/${user.id}/lecture`);
                setLectureList(response.data);
            } catch (error) {
                console.error('Error fetching lectures:', error);
            }
        };

        const fetchCalendarEvents = async () => {
            try {
                const assignmentsResponse = await axios.get(`/api/calendar/assignments/${user.id}`);
                const examsResponse = await axios.get(`/api/calendar/exams/${user.id}`);

                const assignments = Array.isArray(assignmentsResponse.data) ? assignmentsResponse.data : [];
                const exams = Array.isArray(examsResponse.data) ? examsResponse.data : [];

                const formattedAssignments = assignments.map((assignment) => ({
                    title: assignment.title,
                    date: assignment.deadline,
                    type: '과제',
                    content: assignment.content, // 과제 내용 추가
                    points: assignment.points,   // 과제 배점 추가
                }));

                const formattedExams = exams.map((exam) => ({
                    title: exam.title,
                    date: exam.examPeriodStart,
                    type: '시험',
                    content: '시험 설명을 입력하세요',  // 시험 설명 추가
                    duration: exam.duration,   // 시험 시간 추가
                }));

                setCalendarEvents([...formattedAssignments, ...formattedExams]);
            } catch (error) {
                console.error('Error fetching calendar events:', error);
            }
        };

        fetchLectures();
        fetchCalendarEvents();
    }, [user]);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventsOnThisDay = calendarEvents.filter(
                (event) => new Date(event.date).toDateString() === date.toDateString()
            );

            return eventsOnThisDay.map((event, index) => (
                <div
                    key={index}
                    className="event"
                    onClick={() => handleEventClick(event)} // 클릭 시 이벤트 정보 표시
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    {event.type}: {event.title}
                </div>
            ));
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event); // 선택된 이벤트 설정
        setIsModalOpen(true);    // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false);   // 모달 닫기
        setSelectedEvent(null);  // 선택된 이벤트 초기화
    };

    return (
        <div id="App">
            <div id="main-menu">
                <div id="header_main">
                    <img src={logo} onClick={Gomain} alt="Logo" />
                    <div id="user_info">
                        {userName && `${userName}님`}
                        <button className="icon" onClick={GoMessageList}>
                            <img src={message_icon} alt="쪽지" style={{ width: '20px', height: '20px' }} />
                        </button>
                        <button className="icon">
                            <img src={logout_icon} alt="로그아웃" style={{ width: '20px', height: '20px' }} />
                        </button>
                    </div>
                </div>
                <div id="buttons_main">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice} />
                    <input type="submit" value="커뮤니티" id="community_btn" onClick={Gocommunity} />
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage} />
                    <div id="rect" />
                </div>
                <div className="navbar">
                    <Link className="navbar-menu" to="/ai/recommend/univ" state={{ user: user }}>대학학과추천</Link>
                    <Link className="navbar-menu" to="/ai/text/summary" state={{ user: user }}>문서요약</Link>
                    <Link className="navbar-menu" to="/ai/math/solve" state={{ user: user }}>수학문제풀이</Link>
                </div>
                <div id="contents_main">
                    <div id="contents1_main">
                        <div id="main_calendar">
                            <h2>캘린더</h2>
                            <div id="content_calendar">
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    tileContent={tileContent}
                                />
                            </div>
                            <div id="more_calendar"></div>
                        </div>
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
                                        <tr
                                            key={lecture.id}
                                            onClick={() => GoLecturePotal(lecture)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{lecture.name}</td>
                                            <td>
                                                {lecture.lectureTimeDTOList.map((time, index) => (
                                                    <div key={time.id}>
                                                        {time.day} {time.startTime} - {time.endTime}
                                                        {lecture.lectureTimeDTOList.length - 1 !== index && ', '}
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
                            <div id="content_schedule"></div>
                        </div>
                        <div id="main_submission">
                            <h2>남은 제출</h2>
                            <div id="content_submission"></div>
                        </div>
                    </div>
                </div>
                <div id="footer_main">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>

            {/* 모달 부분 */}
            {isModalOpen && selectedEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedEvent.type}: {selectedEvent.title}</h2>
                        <p>내용: {selectedEvent.content}</p>
                        {selectedEvent.type === '과제' && <p>배점: {selectedEvent.points}</p>}
                        {selectedEvent.type === '시험' && <p>시험 시간: {selectedEvent.duration}분</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App6;
