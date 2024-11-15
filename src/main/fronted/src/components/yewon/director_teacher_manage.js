import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/director_teacher_manage.css';

function DirectorTeacherManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [teacherList, setTeacherList] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        birthdate: "",
        email: "",
    });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(`/api/teacher/academy/${user.id}/all`);
                setTeacherList(response.data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
                alert(error.response.data)
            }
        };

        fetchTeachers();
    }, [user]);

    const openEditPopup = (teacher) => {
        setSelectedTeacher(teacher);
        setFormData({
            name: teacher.name,
            phoneNumber: teacher.phoneNumber,
            birthdate: teacher.birthdate,
            email: teacher.email,
        });
        setIsEditPopupOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 선생 수정
    const handleUpdateTeacher = async () => {
        if (!selectedTeacher) return;

        try {
            const response = await axios.post(
                `/api/teacher/${selectedTeacher.id}/update`,
                formData
            );

            // 업데이트 후 목록 다시 불러오기
            const updatedTeacherList = teacherList.map((teacher) =>
                teacher.id === selectedTeacher.id ? { ...teacher, ...formData } : teacher
            );
            setTeacherList(updatedTeacherList);
            setIsEditPopupOpen(false);
        } catch (error) {
            console.error("Error updating teacher:", error);
            alert(error.response.data);
        }
    };

    // 선생 삭제
    const deleteTeacher = async (teacherId) => {
        try {
            const response = await axios.put(`/api/teacher/${teacherId}/delete`);

            // 삭제된 선생님을 목록에서 제거
            setTeacherList(teacherList.filter((teacher) => teacher.id !== teacherId));
            alert(response.data);
        } catch (error) {
            console.error("Error deleting teacher:", error);
            alert(error.response.data);
        }
    };

    const GoTeacherAdd=()=>{
        navigate('/director/teacher/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="director_teacher_manage_header"/>
            <div id="director_teacher_manage_frame">
                <h1>선생 관리</h1>
                <div id="contents_director_teacher_manage">
                    <button onClick={GoTeacherAdd}>
                        <span>+ 선생 등록</span>
                    </button>
                    <div id="director_showing_teacher_manage">
                        <table id="teacher_manage_table">
                            <thead>
                            <tr id="teacher_manage_table_head">
                                <th>이름</th>
                                <th>강의</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {teacherList.length > 0 ? (
                                teacherList.map((teacher) => (
                                    <tr key={teacher.id} id="manage_table_info_teacher">
                                        <td id="info_teacher_name">
                                            <span>{teacher.name}</span>
                                        </td>
                                        <td id="info_teacher_subject">
                                            {teacher.lectureNameDTOList.length > 0 ? (
                                                <span>
                                                    {teacher.lectureNameDTOList.map((lecture) => lecture.name).join(", ")}
                                                </span>
                                            ) : (
                                                <span>강의가 없습니다</span>
                                            )}
                                        </td>
                                        <td>
                                            <button id="EditTeacher" onClick={() => openEditPopup(teacher)}>
                                                <span>수정</span>
                                            </button>
                                        </td>
                                        <td>
                                            <button id="DeleteTeacher" onClick={() => deleteTeacher(teacher.id)}>
                                                <span>삭제</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <div className="no_item">등록된 선생님이 없습니다</div>
                            )
                            }
                            </tbody>
                        </table>

                        {/* 수정 팝업 */}
                        {isEditPopupOpen && (
                            <div className="popup-overlay">
                                <div className="popup">
                                    <h3>선생님 정보 수정</h3>
                                    <label>
                                        이름:
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        전화번호:
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        생년월일:
                                        <input
                                            type="date"
                                            name="birthdate"
                                            value={formData.birthdate}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        이메일:
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button onClick={handleUpdateTeacher}>저장</button>
                                        <button onClick={() => setIsEditPopupOpen(false)}>취소</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div id="director_teacher_manage_footer"/>
        </div>
    );
}

export default DirectorTeacherManage;