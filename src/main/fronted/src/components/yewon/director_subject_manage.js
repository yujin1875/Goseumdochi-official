import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/director_subject_manage.css';

function DirectorSubjectManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoSubjectAdd=()=>{
        navigate('/director/subject/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="director_subject_manage_header"/>
            <div id="director_subject_manage_frame">
                <h2>과목 관리</h2>
                <div id="director_subject_manage">
                </div>
                <button onClick={GoSubjectAdd}>과목 등록</button>
            </div>
            <div id="director_teacher_manage_footer"/>
        </div>
    );
}

export default DirectorSubjectManage;