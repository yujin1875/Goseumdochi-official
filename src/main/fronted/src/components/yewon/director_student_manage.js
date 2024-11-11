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
                        {studentList.map((student) => (
                            <div key={student.id} id="info_student1">
                                <div id="info_student1_name">
                                    <span>{student.studentName}</span>
                                </div>
                                <span>{student.studentPhoneNumber}</span>
                                <button id="DeleteStudent" onClick={() => handleDelete(student.id)}>
                                    <span>삭제</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="director_student_manage_footer"/>
        </div>
    );
}

export default DirectorStudentManage;