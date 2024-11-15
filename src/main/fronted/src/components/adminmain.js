import React, { useState, useEffect } from 'react';
import logo from './images/goseumdochi.png';
import '../css/adminmain.css';
import { FaComments } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { RiNotification3Fill } from "react-icons/ri";
import { LuSchool2 } from "react-icons/lu";
import { GiArchiveRegister } from "react-icons/gi";

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

    const GoAdminCommunity = () => {
            window.location.href = '/community_admin';
        }

    return (
        <div id="App">
            <div id="header_adminmain">
                <img src={logo} alt="Logo"/>
            </div>
            <div id="admin_info">
                <div id="info">
                    {adminInfo && <a>관리자 : {adminInfo.username} 님</a>}
                </div>
            </div>
            <div id="button_adminmain">
                <div id="btn_adminmain">
                    <div id="noti_btn">
                        <button onClick={GoAdminNotice}>
                            <RiNotification3Fill className="img_adminMain" size={100} /> <br/>
                            공지사항
                        </button>
                    </div>
                    <div id="acaform_btn">
                        <button onClick={GoAdminAcademyFormManage}>
                            <GiArchiveRegister className="img_adminMain" size={100} /> <br/>
                            학원 신청서
                        </button>
                    </div>
                    <div id="aca_btn">
                        <button onClick={GoAdminAcademy}>
                            <LuSchool2 className="img_adminMain" size={100} /> <br/>
                            학원 관리
                        </button>
                    </div>
                    <div id="stu_btn">
                        <button onClick={GoAdminStudent}>
                            <PiStudent className="img_adminMain" size={100} /> <br/>
                            학생 관리
                        </button>
                    </div>
                    <div id="commu_btn">
                        <button onClick={GoAdminCommunity}>
                            <FaComments className="img_adminMain" size={100} />  <br/>
                            커뮤니티
                        </button>
                    </div>
                </div>
            </div>
            <div id="footer_adminmain">
                <button id="logout" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default App18;
