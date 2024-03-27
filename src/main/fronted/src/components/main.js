import '../css/main.css';
import logo from './images/goseumdochi_moving.gif';

function App6() {
    return (
        <div id="App">
            <div id="main-menu">
                <div id="header_main">
                    <img src={logo}/>
                    <div id="user_info"></div>
                </div>
                <div id="buttons_main">
                    <input type="submit" value="공지사항" id="notice_btn"/>
                    <input type="submit" value="커뮤니티" id="community_btn"/>
                    <input type="submit" value="마이페이지" id="mypage_btn"/>
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