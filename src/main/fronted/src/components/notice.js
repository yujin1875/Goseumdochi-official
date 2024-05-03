import '../css/notice.css';
import logo from './images/goseumdochi.png';

function App10() {

    const Gonotice=()=>{
        window.location.href='/notice'
    }

    const Gomypage=()=>{
        window.location.href='/mypage'
    }

    return (
        <div id="App">
            <div id="notice-menu">
                <div id="header_notice">
                    <img src={logo}/>
                    <div id="user_info"></div>
                </div>
                <div id="buttons_notice">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice}/>
                    <input type="submit" value="커뮤니티" id="community_btn"/>
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage}/>
                    <div id="rect"/>
                </div>
                <div id="contents_notice">
                    <div id="contents_notice">

                    </div>
                </div>
                <div id="footer_notice">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App10;