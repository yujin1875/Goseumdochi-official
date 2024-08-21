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
                <h1>과목 관리</h1>
                <div id="contents_director_subject_manage">
                    <button onClick={GoSubjectAdd}>
                        <span>+ 과목 등록</span>
                    </button>
                    <div id="director_showing_subject_manage">
                        <div id="info_subject1">
                            <div id="info_subject1_name">
                                <span>국어</span>
                            </div>
                            <button id="EditSubject">
                                <span>수정</span>
                            </button>
                            <button id="DeleteSubject">
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="director_subject_manage_footer"/>
        </div>
    );
}

export default DirectorSubjectManage;