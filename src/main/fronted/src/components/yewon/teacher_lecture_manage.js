import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/teacher_lecture_manage.css';

function TeacherLectureManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [lectureList, setLectureList] = useState([]);

    // 선생의 모든 강의 리스트 가져오기
    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`/api/teacher/${user.id}/lecture`);
                setLectureList(response.data);
            } catch (error) {
                console.error('Error fetching lectures:', error);
            }
        };
        fetchLectures();
    }, [user]);

    // 강의 삭제 함수
    const handleDelete = async (lectureId) => {
        try {
            const response = await axios.delete(`/api/lecture/${lectureId}/delete`);
            if (response.status === 200) {
                setLectureList((prevLectures) => prevLectures.filter((lecture) => lecture.id !== lectureId));
                alert(response.data);
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('Error deleting lecture:', error);
            alert('강의 삭제 실패');
        }
    };

    const GoLectureAdd=()=>{
        navigate('/teacher/lecture/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="teacher_lecture_manage_header"/>
            <div id="teacher_lecture_manage_frame">
                <h1>강의 관리</h1>
                <div id="contents_teacher_lecture_manage">
                    <button onClick={GoLectureAdd}>강의 등록</button>
                    <div id="teacher_showing_lecture_manage">
                        {lectureList.map((lecture) => (
                            <div key={lecture.id} id="info_lecture">
                                <div id="info_lecture_name">
                                    <span>{lecture.name}</span>
                                </div>
                                <div id="info_lecture_subject" className="info_lecture_meta">
                                    <span>{lecture.subjectName}</span>
                                </div>
                                <div className="info_lecture_meta">
                                    <span>{lecture.headCount} / {lecture.maxCount}</span>
                                </div>
                                <div id="info_lecture_time" className="info_lecture_meta">
                                    {lecture.lectureTimeDTOList.map((time, index) => (
                                        <span key={time.id}>
                                            {time.day} {time.startTime.slice(0, 5)} - {time.endTime.slice(0, 5)}
                                            {lecture.lectureTimeDTOList.length - 1 !== index && ', '}
                                        </span>
                                    ))}
                                </div>
                                <button id="Deletelecture" onClick={() => handleDelete(lecture.id)}>
                                    <span>삭제</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="teacher_lecture_manage_footer"/>
        </div>
    );
}

export default TeacherLectureManage;