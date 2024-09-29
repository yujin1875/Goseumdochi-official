import '../css/teachermain.css';
import logo from './images/goseumdochi_moving.gif';
import {useLocation, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App25() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [lectures, setLectures] = useState([]);
    const [selectedLectureId, setSelectedLectureId] = useState(null);

    const [lectureList, setLectureList] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트 상태
    const [isModalOpen, setIsModalOpen] = useState(false);    // 모달 상태


    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`/api/teacher/${user.id}/lecture`);
                setLectures(response.data);
            } catch (error) {
                console.error('Failed to fetch lectures:', error);
            }
        };

        const fetchCalendarEvents = async () => {
            try {
                const assignmentsResponse = await axios.get(`/api/calendar/assignments/teacher/${user.id}`);
                const examsResponse = await axios.get(`/api/calendar/exams/teacher/${user.id}`);

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
    }, [user.id]);

    const GoLectureManage = () => {
        navigate('/teacher/lecture/manage', { state: { user: user } });
    };

    const GoTeacherPortal = () => {
        if (selectedLectureId) {
            navigate('/teacherportal', { state: { user: user, lectureId: selectedLectureId } });
        } else {
            alert("강의를 선택해주세요.");
        }
    };

    const GoLectureFind=()=>{
        navigate('/teacher/lecture/find', { state: { user: user } })
    }

    const GoMessageList = () => {
        navigate('/message/list', { state: { user: user } });
    };

    const GoLecturePotal = (lecture) => {
        navigate('/lectureportal', { state: { user: user, lecture: lecture } });
    };

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
            <div id="teachermain-menu">
                <div id="header_teachermain">
                    <img src={logo}/>
                </div>
                <div id="user_info">
                    <button onClick={GoMessageList}>
                        <span>쪽지</span>
                    </button>
                </div>
                <div id="buttons_teachermain">
                    <input type="submit" value="강의관리" id="lecture_btn" onClick={GoLectureManage}/>
                    <input type="submit" value="학생관리" id="studentmanage_btn" onClick={GoLectureFind}/>
                    <input type="submit" value="학생문의함" id="mypage_btn"/>
                    <input type="submit" value="Teacher Portal" id="teacherportal_btn" onClick={GoTeacherPortal}/>
                    <div id="rect"/>
                </div>
                <div id="contents_teachermain">
                    <div id="contents1_teachermain">
                        <div id="Scheduler_teachermain">
                            <h2>일정</h2>
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
                        <div id="notice_teachermain">
                            <h2>공지사항</h2>
                            <div id="content_notice">
                            </div>
                        </div>
                    </div>
                    <div id="contents2_teachermain">
                        <div id="Quickmenu_teachermain">
                            <h2>Quick Menu</h2>
                            <div id="content_Quickmenu">
                            </div>
                        </div>
                        <div id="lectureSchedule">
                            <h2>강의 선택</h2>
                            <select onChange={(e) => setSelectedLectureId(e.target.value)}>
                                <option value="">강의를 선택해주세요</option>
                                {lectures.map((lecture) => (
                                    <option key={lecture.id} value={lecture.id}>{lecture.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div id="footer_teachermain">
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

export default App25;