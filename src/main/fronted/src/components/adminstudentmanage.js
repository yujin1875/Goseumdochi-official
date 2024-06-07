import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios를 import 합니다.
import '../css/adminstudentmanage.css';
import logo from './images/goseumdochi.png';

function App23() {
    const [students, setStudents] = useState([]); // 학생 정보를 담을 상태 변수를 만듭니다.

    useEffect(() => {
        // 학생 정보를 가져오는 함수를 정의합니다.
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/admin/management/students'); // API를 호출하여 학생 정보를 가져옵니다.
                setStudents(response.data); // 가져온 학생 정보를 상태 변수에 저장합니다.
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents(); // useEffect가 호출될 때 학생 정보를 가져오는 함수를 실행합니다.
    }, []);

    const goBackToAdminNotice = () => {
        window.location.href = '/adminmain';
    }

    return (
        <div id="App">
            <div id="adminstudentmanage_frame">
                <div id="adminstudentmanage_header">
                    <a onClick={goBackToAdminNotice}> &lt; </a>
                    <h2>학생 관리</h2>
                    <div id="find_btn">

                    </div>
                </div>
                <div id="rect"/>
                <div id="adminstudentmanage_body">
                    <div id="adminstudentmanage_category">
                        <div id="studentId">
                            ID
                        </div>
                        <div id="studentName">
                            이름
                        </div>
                        <div id="studentNum">
                            번호
                        </div>
                        <div id="studentEmail">
                            이메일
                        </div>
                        <div id="studentBirthdate">
                            생년월일
                        </div>
                        <div id="SendLetter">
                            쪽지보내기
                        </div>
                    </div>
                    <div id="adminstudentmanage_contents">
                        <table id="student_table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>이름</th>
                                    <th>번호</th>
                                    <th>이메일</th>
                                    <th>생년월일</th>
                                    <th>쪽지보내기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.studentId}</td>
                                        <td>{student.studentName}</td>
                                        <td>{student.studentPhoneNumber}</td>
                                        <td>{student.studentEmail}</td>
                                        <td>{student.studentBirthDate}</td>
                                        <td>
                                            <button>쪽지 보내기</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App23;
