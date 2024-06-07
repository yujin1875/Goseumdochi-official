import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function DirectorTeacherManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoTeacherAdd=()=>{
        navigate('/director/teacher/regist', { state: { user: user } })
    }

    return (
        <button onClick={GoTeacherAdd}>선생 등록</button>
    );
}

export default DirectorTeacherManage;