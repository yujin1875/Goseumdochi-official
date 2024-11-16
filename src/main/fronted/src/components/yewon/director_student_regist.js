import './subcss/director_student_regist.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function DirectorStudentRegist() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {}; // id, role 전달

    const [inputStudentName, setInputStudentName] = useState('');
    const [inputStudentPhoneNumber, setInputStudentPhoneNumber] = useState('');
    const [student, setStudent] = useState(null);
    const [studentAcademyId, setStudentAcademyId] = useState(null);
    const [error, setError] = useState(null);
    const [isFind, setIsFind] = useState(false); // 찾은 결과

    // 학생 찾기
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // 제출 시 기존 오류 초기화

        try {
            const response = await axios.get(`/api/director/academy/${user.academyId}/findStudent`, {
                params: {
                    inputStudentName,
                    inputStudentPhoneNumber,
                },
            });

            if (response.data) {
                setStudent(response.data.student);
                setStudentAcademyId(response.data.studentAcademyId);
                setIsFind(true);
            }
            console.log(student)
            console.log(studentAcademyId)
        } catch (err) {
            setIsFind(false);

            if (err.response && err.response.status === 401) {
                setError(err.response.data);
                alert(err.response.data); // setError이 비동기적이라 바로 업데이트되지 않음;;;
            } else {
                setError('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    // 학생 등록
    const handleRegist = async (e) => {
        e.preventDefault();
        setError(null); // 제출 시 기존 오류 초기화

        try {
            const response = await axios.post(`/api/director/academy/${user.academyId}/registStudent`, null, {
                params: {
                    studentId: student.id,
                },
            });

            // 학생 등록 성공
            setStudentAcademyId(response.data.id) // 학생-학원 id 설정
            console.log(response.data)
            alert("학생 등록 성공")

        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError(err.response.data);
                alert(error);
            } else {
                setError('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <div id="director_student_regist_frame">
            <div id="header">
                <h1>학생 찾기</h1>
            </div>
            <div id="rect"/>
            <form onSubmit={handleSubmit}>
                <div id="name">
                    <label>학생 이름:</label>
                    <input
                        type="text"
                        value={inputStudentName}
                        onChange={(e) => setInputStudentName(e.target.value)}
                    />
                </div>
                <div id="num">
                    <label>학생 전화번호:</label>
                    <input
                        type="text"
                        value={inputStudentPhoneNumber}
                        onChange={(e) => setInputStudentPhoneNumber(e.target.value)}
                    />
                </div>
                <button className="director_student_regist_btn" type="submit">찾기</button>
            </form>
            <div id="result">
                {error && <p>{error}</p>}
                {isFind && student && (
                    <div id="info_result">
                        <h2>학생 정보</h2>
                        <div className="student_info">
                            <p>ID: {student.id}</p>
                            <p>이름: {student.studentName}</p>
                            <p>생년월일: {student.studentBirthDate}</p>
                            <p>전화번호: {student.studentPhoneNumber}</p>
                            <p>이메일: {student.studentEmail}</p>
                            <p>프로필 사진 URL: {student.profilePictureUrl}</p>
                            <p>학원 등록 여부: {studentAcademyId ? (
                                <div className="alreadyRegist">이미 등록된 학생입니다</div>
                                ) : (<button onClick={handleRegist}>등록하기</button>)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DirectorStudentRegist;