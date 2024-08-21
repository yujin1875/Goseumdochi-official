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
                <h1>학생 관리</h1>
                <div id="contents_director_student_manage">
                    <button id="AddStudent" onClick={GoStudentAdd}>
                        <span>+ 학생 등록</span>
                    </button>
                    <div id="director_showing_student_manage">
                        <div id="info_student1">
                            <div id="info_student1_name">
                                <span>하하</span>
                            </div>
                            <a href="">상세정보</a>
                            <button id="DeleteStudent">
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="director_student_manage_footer"/>
        </div>
    );
}

export default DirectorStudentManage;