import '../css/teacherportal.css';
import logo from './images/goseumdochi.png';

function App26() {
return (
        <div id="App">
            <div id="menu_teacherportal">
                <div id="teacher_info">
                    <img src={logo}/>
                    <h2>고슴도치</h2>
                </div>
                <ul>
                    <li><a>자유 게시판</a></li>
                    <li><a>HOT 게시물</a></li>
                    <li><a>대입 게시판</a></li>
                    <li><a>질문 게시판</a></li>
                    <li><a>대학 입결 정보</a></li>
                    <li><a>학원 리뷰</a></li>
                    <li><a>마이페이지</a></li>
                    <li><a>마이페이지</a></li>
                </ul>
            </div>
            <div id="teacherportal_header">
                <div id="menu_btn"/>
                <div id="home_btn"/>
                <div id="title">

                </div>
            </div>
            <div id="contents_teacherportal">

            </div>
        </div>
    );
}

export default App26;