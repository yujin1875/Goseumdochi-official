import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function TeacherLectureManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoLectureAdd=()=>{
        navigate('/teacher/lecture/regist', { state: { user: user } })
    }

    return (
        <button onClick={GoLectureAdd}>강의 등록</button>
    );
}

export default TeacherLectureManage;