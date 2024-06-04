import React, { useEffect, useState } from 'react';
import '../css/adminmain.css';
import logo from './images/goseumdochi.png';

function App18() {
    const [adminName, setAdminName] = useState(""); // 관리자 이름 상태 변수

    useEffect(() => {
        // 백엔드에서 관리자 이름 가져오기
        fetch("/api/admin/main/info")
            .then(response => response.text())
            .then(data => setAdminName(data))
            .catch(error => console.error('Error fetching admin info:', error));
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div id="App">
            <div id="header_adminmain">
                <img src={logo} alt="Logo"/>
            </div>
            <div id="admin_info">
                <div id="info">
                    <a>관리자: {adminName} </a>
                    <div id="logout">
                        로그아웃
                    </div>
                </div>
            </div>
            <div id="button_adminmain">
                <ul>
                    <li><a>전체 공지사항</a></li>
                    <li><a>학원 신청서</a></li>
                    <li><a>학원 관리</a></li>
                    <li><a>학생 관리</a></li>
                    <li><a>커뮤니티</a></li>
                </ul>
            </div>
        </div>
    );
}

export default App18;
