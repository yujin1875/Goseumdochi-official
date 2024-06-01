import '../css/teachermain.css';
import logo from './images/goseumdochi_moving.gif';

function App25() {

    return (
        <div id="App">
            <div id="teachermain-menu">
                <div id="header_teachermain">
                    <img src={logo}/>
                </div>
                <div id="buttons_teachermain">
                    <input type="submit" value="강의관리" id="lecture_btn"/>
                    <input type="submit" value="학생관리" id="studentmanage_btn"/>
                    <input type="submit" value="학생문의함" id="mypage_btn"/>
                    <div id="rect"/>
                </div>
                <div id="contents_teachermain">
                    <div id="contents1_teachermain">
                        <div id="calendar">
                        </div>

                    </div>
                    <div id="contents2_teachermain">

                    </div>
                </div>
                <div id="footer_teachermain">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App25;