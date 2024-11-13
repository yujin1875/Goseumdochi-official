import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './subcss/teacher_lecture_student_manage.css';

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
            <div id="header_teacher_lecture_student_manage"/>
            <div id="teacher_lecture_student_manage_frame">
                <h1>강의 학생관리</h1>
                <div id="LectureInfo_teacher_lecture_student_manage">
                    <h3>강의 상세 정보</h3>
                    <div id="LecturePeople_teacher_lecture_student_manage">
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
                <div id="StudentList_teacher_lecture_student_manage">
                    <div id="LectureStudentList">
                        <h3>수강중인 학생</h3>
                        <table>
                            <thead className="thead-height">
                                <tr>
                                    <th>학생 이름</th>
                                    <th>학번</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {existingStudentList.map((student) => (
                                <tr key={student.id}  className="tbody-height">
                                    <td>{student.studentName}</td>
                                    <td>{student.studentId}</td>
                                    <td>
                                        <button onClick={() => handleDelete(student)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="NotLectureStudentList">
                        <h3>수강하지 않는 학생</h3>
                        <table>
                            <thead className="thead-height">
                            <tr>
                                <th>학생 이름</th>
                                <th>학생 ID</th>
                                <th>동작</th>
                            </tr>
                            </thead>
                            <tbody>
                            {nonExistingStudentList.map((student) => (
                                <tr key={student.id}  className="tbody-height">
                                    <td>{student.studentName}</td>
                                    <td>{student.studentId}</td>
                                    <td>
                                        <button onClick={() => handleRegist(student)}>등록</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="footer_teacher_lecture_student_manage"/>
        </div>

    );
}

export default TeacherLectureStudentManage;