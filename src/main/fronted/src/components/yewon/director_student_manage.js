import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function DirectorStudentManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoStudentAdd=()=>{
        navigate('/director/student/regist', { state: { user: user } })
    }

    return (
        <button onClick={GoStudentAdd}>학생 등록</button>
    );
}

export default DirectorStudentManage;