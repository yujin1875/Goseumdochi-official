import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/director_teacher_manage.css';

function DirectorTeacherManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoTeacherAdd=()=>{
        navigate('/director/teacher/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="director_teacher_manage_header"/>
            <div id="director_teacher_manage_frame">
                <h2>선생 관리</h2>
                <div id="director_teacher_manage">
                </div>
                <button onClick={GoTeacherAdd}>선생 등록</button>
            </div>
            <div id="director_teacher_manage_footer"/>
        </div>
    );
}

export default DirectorTeacherManage;