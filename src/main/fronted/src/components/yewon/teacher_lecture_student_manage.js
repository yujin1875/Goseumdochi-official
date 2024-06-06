import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TeacherLectureStudentManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, lecture } = location.state;

    const [existingStudents, setExistingStudents] = useState([]);
    const [nonExistingStudents, setNonExistingStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const [existResponse, nonExistResponse] = await Promise.all([
                    axios.get(`/api/teacher/lecture/${lecture.id}/student/exist`),
                    axios.get(`/api/teacher/lecture/${lecture.id}/student/non-exist`),
                ]);
                setExistingStudents(existResponse.data);
                setNonExistingStudents(nonExistResponse.data);
            } catch (error) {
                alert("에러1")
            }
        };

        fetchStudents();
    }, []);

    const handleRegist = async (studentId) => {
        //e.preventDefault();
        try {
            const response = await axios.post(`/api/teacher/lecture/${lecture.id}/student/regist`, null, {
                params: { studentId: studentId }
            });
            alert('학생 등록 완료.');
        } catch (error) {
            console.error('에러2.', error);
        }
    };

    return (
        <div>
            <h1>강의 학생관리</h1>
            <div>
                <h3>강의 상세 정보</h3>
                <div>
                    <h2>{lecture.name}</h2>
                    <p>수강 인원 {lecture.headCount}/{lecture.maxCount}</p>
                    <p>강의 시간</p>
                    <ul>
                        {lecture.lectureTimeDTOList.map((time, index) => (
                            <li key={index}>
                                {time.day} {time.startTime.slice(0, 5)} ~ {time.endTime.slice(0, 5)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <div>
                    <h3>수강중인 학생</h3>
                    <ul>
                        {existingStudents.map((student) => (
                            <li key={student.id}>
                                {student.studentName} ({student.studentId})
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>수강하지 않는 학생</h3>
                    <ul>
                        {nonExistingStudents.map((student) => (
                            <li key={student.id}>
                                {student.studentName} ({student.studentId})
                                <button onClick={() => handleRegist(student.id)}>등록</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default TeacherLectureStudentManage;