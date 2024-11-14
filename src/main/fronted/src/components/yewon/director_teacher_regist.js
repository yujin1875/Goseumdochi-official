import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './subcss/director_teacher_regist.css';

function DirectorTeacherRegist() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {}; // id, role 전달

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        birthdate: '',
        email: '',
        academyId: user.academyId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await
                axios.post('/api/teacher/regist'
                , formData);

            console.log(response.data);
            alert("선생 등록 성공")

        } catch (error) {
            console.error('Form Submit error:', error);
            alert(error.response.data);
        }
    };

    return (
        <div id="App">
            <div id="director_teacher_regist_header"/>
            <div id="director_teacher_regist_frame">
                <h1>선생님 등록</h1>
                <form onSubmit={handleSubmit}>
                    <div className="teacher_name">
                        <label>이름:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="아이디"
                            required />
                    </div>
                    <div className="teacher_number">
                        <label>전화번호:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="010XXXXXXXX"
                            required />
                    </div>
                    <div className="teacher_birth">
                        <label>생년월일:</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            placeholder="생년월일"
                            required />
                    </div>
                    <div className="teacher_email">
                        <label>이메일:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@goseumdochi.com"
                            required />
                    </div>
                    <button type="submit" className="btn_director_teacher_regist">등록</button>
                </form>
            </div>
            <div id="director_teacher_regist_footer"/>
        </div>
    );

}

export default DirectorTeacherRegist;