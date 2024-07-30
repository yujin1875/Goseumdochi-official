import React, { useState, useEffect } from 'react';
import logo from './images/goseumdochi.png';

function App18() {
    const [adminInfo, setAdminInfo] = useState(null);

    useEffect(() => {
        fetch('/api/admin/adminInfo', {
            credentials: 'include' // 세션 쿠키를 포함하여 요청
        })
            .then(response => response.json())
            .then(data => setAdminInfo(data))
            .catch(error => console.error('Error fetching admin info:', error));
    }, []);

    const handleLogout = () => {
        fetch('/api/admin/logout', {
            method: 'POST',
            credentials: 'include' // 세션 쿠키를 포함하여 요청
        })
            .then(response => {
                if (response.ok) {
                    // Clear adminInfo from session on logout
                    sessionStorage.removeItem('adminInfo');
                    // Redirect to home page after logout
                    window.location.href = '/';
                } else {
                    console.error('Failed to logout');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    const GoAdminNotice = () => {
        window.location.href = '/adminnotice';
    }

    const GoAdminAcademyFormManage = () => {
        window.location.href = '/admin/academy/form/manage';
    }

    const GoAdminAcademy = () => {
        window.location.href = '/adminacademymanage'; // Redirect to admin academy management page
    }

    const GoAdminStudent = () => {
        window.location.href = '/adminstudentmanage'; // Redirect to admin student management page
    }

    return (
        <div id="App">
            <div id="header_adminmain">
                <img src={logo} alt="Logo"/>
            </div>
            <div id="admin_info">
                <div id="info">
                    {adminInfo && <a>관리자 : {adminInfo.username} 님</a>}
                    <button id="logout" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>
            <div id="button_adminmain">
                <ul>
                    <li><button onClick={GoAdminNotice}>공지사항</button></li>
                    <li><button onClick={GoAdminAcademyFormManage}>학원 신청서</button></li>
                    <li><button onClick={GoAdminAcademy}>학원 관리</button></li>
                    <li><button onClick={GoAdminStudent}>학생 관리</button></li>
                    <li><a>커뮤니티</a></li>
                </ul>
            </div>
        </div>
    );
}

export default App18;
