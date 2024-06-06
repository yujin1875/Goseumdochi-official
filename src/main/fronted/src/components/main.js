import '../css/main.css';
import logo from './images/goseumdochi_moving.gif';
import React, { useState, useEffect } from 'react';

function App6() {
    const Gomain=()=>{
        window.location.href='/main'
    }
    const Gonotice=()=>{
        window.location.href='/notice'
    }

    const Gocommunity=()=>{
        window.location.href='/community'
    }

    const Gomypage=()=>{
        window.location.href='/mypage'
    }

    const [userName, setUserName] = useState('');
        useEffect(() => {
            const userIdFromLocalStorage = localStorage.getItem('userId');
            // console.log("User id from localStorage:", userIdFromLocalStorage); // 로컬 스토리지에서 사용자 이름 확인
            setUserName(userIdFromLocalStorage); // 사용자 이름 상태 업데이트
        }, []);


        return (
            <div id="App">
                <div id="main-menu">
                    <div id="header_main">
                        <img src={logo} onClick={Gomain}/>
                        <div id="user_info">{userName && `${userName}님`}</div>
                    </div>
                <div id="buttons_main">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice}/>
                    <input type="submit" value="커뮤니티" id="community_btn" onClick={Gocommunity}/>
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage}/>
                    <div id="rect"/>
                </div>
                <div id="contents_main">
                    <div id="contents1_main">

                    </div>
                    <div id="contents2_main">

                    </div>
                </div>
                <div id="footer_main">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App6;