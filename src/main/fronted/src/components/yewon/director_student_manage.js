import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/director_student_manage.css';

function DirectorStudentManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [studentList, setStudentList] = useState([]);

    // 학원에 등록된 학생 리스트 가져오기
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`/api/director/academy/${user.id}/students`);
                setStudentList(response.data);
                console.log(studentList)
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [user]);

    // 학생 삭제
    const handleDelete = async (studentId) => {
        try {
            const response = await axios.put(`/api/director/academy/${user.id}/student/${studentId}/delete`);
            if (response.status === 200) {
                setStudentList((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
                alert(response.data);
            } else {
                alert('학생 삭제 실패');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('학생 삭제 실패');
        }
    };

    // 날짜형식
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    const GoStudentAdd=()=>{
        navigate('/director/student/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="director_student_manage_header"/>
            <div id="director_student_manage_frame">
                <h1>학생 관리</h1>
                <div id="contents_director_student_manage">
                    <button id="AddStudent" onClick={GoStudentAdd}>
                        <span>+ 학생 등록</span>
                    </button>
                    <div id="director_showing_student_manage">
                        <table id="student_manage_table">
                            <thead>
                            <tr id="student_manage_table_head">
                                <th>이름</th>
                                <th>생년월일</th>
                                <th>전화번호</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentList.length > 0 ? (
                                studentList.map((student) => (
                                    <tr key={student.id} id="manage_table_info_student">
                                        <td>{student.studentName || '없음'}</td>
                                        <td>{student.studentBirthDate ? formatDate(student.studentBirthDate) : '없음'}</td>
                                        <td>{student.studentPhoneNumber || '없음'}</td>
                                        <td>
                                            <button id="DeleteStudent" onClick={() => handleDelete(student.id)}>
                                                <span>삭제</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <div className="no_item">등록된 선생님이 없습니다</div>
                            )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <div id="director_student_manage_footer"/>
        </div>
    );
}

export default DirectorStudentManage;