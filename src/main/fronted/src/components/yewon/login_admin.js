import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function LoginIntegrate() {
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
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="loginid">ID: </label>
                <input
                    type="text"
                    id="loginid"
                    value={loginid}
                    onChange={(e) => setLoginid(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">로그인</button>
        </form>
    );
}

export default LoginIntegrate;