import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function DirectorSubjectManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const GoSubjectAdd=()=>{
        navigate('/director/subject/regist', { state: { user: user } })
    }

    return (
        <button onClick={GoSubjectAdd}>과목 등록</button>
    );
}

export default DirectorSubjectManage;