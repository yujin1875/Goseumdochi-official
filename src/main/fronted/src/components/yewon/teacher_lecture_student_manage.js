import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TeacherLectureStudentManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, lecture } = location.state;

    const [existingStudentList, setExistingStudentList] = useState([]);
    const [nonExistingStudentList, setNonExistingStudentList] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const [existResponse, nonExistResponse] = await Promise.all([
                    axios.get(`/api/teacher/lecture/${lecture.id}/student/exist`),
                    axios.get(`/api/teacher/lecture/${lecture.id}/student/non-exist`),
                ]);
                setExistingStudentList(existResponse.data);
                setNonExistingStudentList(nonExistResponse.data);
            } catch (error) {
                alert("에러1")
            }
        };

        fetchStudents();
    }, []);

    const handleRegist = async (student) => {
        //e.preventDefault();
        try {
            const response = await
                axios.post(`/api/teacher/lecture/${lecture.id}/student/regist`, null, {
                params: { studentId: student.id }
            });
            alert('학생 등록 완료.');

            // 등록된 학생을 nonExistingStudentList 제거하고 existingStudentList에 맨 앞에 추가
            setNonExistingStudentList(nonExistingStudentList.filter(s => s.id !== student.id)); // 제거
            setExistingStudentList([student, ...existingStudentList]); // 추가
        } catch (error) {
            console.error('에러2.', error);
        }
    };

    const handleDelete = async (student) => {
        try {
            const response = await
                axios.post(`/api/teacher/lecture/${lecture.id}/student/delete`, null, {
                params: { studentId: student.id }
            });
            alert('수강 삭제 성공');
            // 삭제시 existingStudentList 에서 학생을 제거하고 nonExistingStudentList 맨 앞에 추가
            setExistingStudentList(existingStudentList.filter(s => s.id !== student.id)); // 제거
            setNonExistingStudentList([student, ...nonExistingStudentList]); // 추가
        } catch (err) {
            alert('에러3');
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
                        {existingStudentList.map((student) => (
                            <li key={student.id}>
                                {student.studentName} ({student.studentId})
                                <button onClick={() => handleDelete(student)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>수강하지 않는 학생</h3>
                    <ul>
                        {nonExistingStudentList.map((student) => (
                            <li key={student.id}>
                                {student.studentName} ({student.studentId})
                                <button onClick={() => handleRegist(student)}>등록</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default TeacherLectureStudentManage;