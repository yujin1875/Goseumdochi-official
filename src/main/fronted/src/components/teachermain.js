import '../css/teachermain.css';
import logo from './images/goseumdochi_moving.gif';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App25() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [lectures, setLectures] = useState([]);
    const [selectedLectureId, setSelectedLectureId] = useState(null);


    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`/api/teacher/${user.id}/lecture`);
                setLectures(response.data);
            } catch (error) {
                console.error('Failed to fetch lectures:', error);
            }
        };

        fetchLectures();
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

    return (
        <div id="App">
            <div id="teachermain-menu">
                <div id="header_teachermain">
                    <img src={logo}/>
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
                            <div id="content_Scheduler">
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
        </div>
    );
}

export default App25;