import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/director_student_manage.css';

function DirectorStudentManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoStudentAdd=()=>{
        navigate('/director/student/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="director_student_manage_header"/>
            <div id="director_student_manage_frame">
                <h2>학생 관리</h2>
                <div id="director_student_manage">
                </div>
                <button onClick={GoStudentAdd}>학생 등록</button>
            </div>
            <div id="director_student_manage_footer"/>
        </div>
    );
}

export default DirectorStudentManage;