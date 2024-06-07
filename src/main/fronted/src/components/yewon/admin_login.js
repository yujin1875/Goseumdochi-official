import './subcss/admin_login.css';
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function AdminLogin() {
    const [loginid, setLoginid] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        try {
            const response = await axios.post('/api/admin/login', null, {
                params: {
                    loginid: loginid,
                    password: password,
                },
            });
            console.log(response.data);
            // 로그인 성공
            alert("관리자 로그인 성공")
            navigate('/adminmain')
        } catch (error) {
            console.error('로그인 실패:', error.response || error);
            // 실패 처리 로직 (예: 에러 메시지 표시)
            alert(`${error.response.data}`)
        }
    };

    return (
        <div id="App">
            <div id="header_adminLogin"/>
            <div id="adminLogin_write">
                <div id="adminLogin_write_header">
                    <a>관리자 로그인</a>
                </div>
                <form onSubmit={handleLogin}>
                    <div id="id_adminLogin">
                            <input
                                type="text"
                                id="loginid"
                                value={loginid}
                                placeholder="아이디"
                                onChange={(e) => setLoginid(e.target.value)}
                            />
                    </div>
                    <div id="password_adminLogin">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="비밀번호"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <button type="submit">로그인</button>
                </form>
            </div>
            <div id="footer_adminLogin"/>
        </div>
    );
}

export default AdminLogin;