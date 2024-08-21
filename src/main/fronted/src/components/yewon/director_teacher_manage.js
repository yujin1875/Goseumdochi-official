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
                <h1>선생 관리</h1>
                <div id="contents_director_teacher_manage">
                    <button onClick={GoTeacherAdd}>
                        <span>+ 선생 등록</span>
                    </button>
                    <div id="director_showing_teacher_manage">
                        <div id="info_teacher1">
                            <div id="info_teacher1_name">
                                <span>박명수</span>
                            </div>
                            <div id="info_teacher1_subject">
                                국어, 수학
                            </div>
                            <button id="EditTeacher">
                                <span>수정</span>
                            </button>
                            <button id="DeleteTeacher">
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="director_teacher_manage_footer"/>
        </div>
    );
}

export default DirectorTeacherManage;