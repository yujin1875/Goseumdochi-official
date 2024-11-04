import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/teacher_lecture_manage.css';

function TeacherLectureManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoLectureAdd=()=>{
        navigate('/teacher/lecture/regist', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="teacher_lecture_manage_header"/>
            <div id="teacher_lecture_manage_frame">
                <h1>강의 관리</h1>
                <div id="contents_teacher_lecture_manage">
                    <button onClick={GoLectureAdd}>강의 등록</button>
                    <div id="teacher_showing_lecture_manage">
                        <div id="info_lecture">
                            <div id="info_lecture_name">
                                <span>강의명</span>
                            </div>
                            <div id="info_lecture_subject">
                                강의과목
                            </div>
                            <button id="Editlecture">
                                <span>수정</span>
                            </button>
                            <button id="Deletelecture">
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="teacher_lecture_manage_footer"/>
        </div>
    );
}

export default TeacherLectureManage;