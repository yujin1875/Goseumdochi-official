import React, { useState } from 'react';
import axios from 'axios';

function LoginIntegrate() {
    const [loginid, setLoginid] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        try {
            const response = await axios.post('/api/integrate/login', null, {
                params: {
                    loginid: loginid,
                    password: password,
                },
            });
            console.log(response.data);
            // 로그인 성공

            const {id, role} = response.data;
            if (role === 'director') { // 원장 로그인 성공
                alert("환영합니다 원장님");
            }
            else if (role === 'teacher') { // 선생 로그인 성공
                alert("환영합니다 선생님")
            }
            else if (role === 'student') {
                alert("환영합니다 학생");
            }
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