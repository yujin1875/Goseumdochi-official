import '../css/afterlogin.css';
import logo from './images/goseumdochi.png';

function App5() {
    return (
        <div id="App">
            <div id="header_afterlogin">
                <div id='user_afterlogin'>
                </div>
            </div>
            <div id="logo_afterlogin">
                <img src={logo}/>
                <a>바로가기</a>
                <div id="notice_afterlogin">
                    <a>공지사항</a>
                </div>
            </div>
            <div id="buttons_afterlogin">
                <div id="btn_afterlogin">
                    <div id="commu_btn">

                    </div>
                    <div id="learn_btn">
                        
                    </div>
                    <div id="aca_btn">
                        
                    </div>
                </div>
            </div>
            <div id="footer_afterlogin">
                <a>문의 | midas2024.ver01@gmail.com</a>
            </div>
        </div>
    );
}

export default App5;