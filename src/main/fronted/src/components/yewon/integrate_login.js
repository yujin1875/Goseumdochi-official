import './subcss/integrate_login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function IntegrateLogin() {
    const [loginid, setLoginid] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const GoFindID=()=>{
        window.location.href='/findID'
    }
    const GoFindPW=()=>{
        window.location.href='/findPW'
    }

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

            const {id, role, } = response.data;
            if (role === 'director') { // 원장 로그인 성공
                alert("환영합니다 원장님");
                console.log(response.data)

                // sessionStorage에 로그인 ID 저장
                sessionStorage.setItem('directorId', id);

                navigate('/director/main', { state: { user: response.data } }) // id, role, academyId 전달
            }
            else if (role === 'teacher') { // 선생 로그인 성공
                alert("환영합니다 선생님")
                console.log(response.data)
                navigate('/teachermain', { state: { user: response.data } })
            }
            else if (role === 'student') {
                console.log(response.data)
                alert("환영합니다 학생");
                navigate('/main', { state: { user: response.data } })
            }
        } catch (error) {
            console.error('로그인 실패:', error.response || error);
            // 실패 처리 로직 (예: 에러 메시지 표시)
            alert(`${error.response.data}`)
        }
    };

    return (
        <div id="App">
            <div id="header_IntegrateLogin"/>
            <div id="IntegrateLogin_write">
                <div id="IntegrateLogin_write_header">
                    <a>통합로그인</a>
                </div>
                <form onSubmit={handleLogin}>
                    <div id="id_IntegrateLogin">
                            <input
                                type="text"
                                id="loginid"
                                value={loginid}
                                placeholder="아이디"
                                onChange={(e) => setLoginid(e.target.value)}
                            />
                    </div>
                    <div id="password_IntegrateLogin">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="비밀번호"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <div id="but_inte">
                        <button type="submit">로그인</button>
                    </div>
                    <div id="letter_Login">
                        <button id='findid' onClick={GoFindID}>학생 아이디 찾기</button>
                        <button id='findpw' onClick={GoFindPW}>학생 비밀번호 찾기</button>
                    </div>
                </form>
            </div>
            <div id="footer_IntegrateLogin"/>
        </div>
    );
}

export default IntegrateLogin;