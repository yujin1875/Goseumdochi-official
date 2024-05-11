import '../css/mypage.css';
import logo from './images/goseumdochi.png';

function App12() {
    const Gomain=()=>{
        window.location.href='/main'
    }
    const Gonotice=()=>{
        window.location.href='/notice'
    }

    const Gomypage=()=>{
        window.location.href='/mypage'
    }

    return (
        <div id="App">
            <div id="mypage-menu">
                <div id="header_mypage">
                    <img src={logo} onClick={Gomain}/>
                    <div id="user_info"></div>
                </div>
                <div id="buttons_mypage">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice}/>
                    <input type="submit" value="커뮤니티" id="community_btn"/>
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage}/>
                    <div id="rect"/>
                </div>
                <div id="contents_mypage">
                    <div id="contents1_mypage">
                        <div id="info_mypage">
                            <div id="category_info_mypage">
                                <div id="cate_name">이름</div>
                                <div id="cate_phonenum">휴대전화</div>
                                <div id="cate_birthdate">생년월일</div>
                                <div id="cate_academy">등록된 학원</div>
                            </div>
                            <div id="user_info_mypage">
                                <div id="blank"/>
                                <div id="user_name">학생이름</div>
                                <div id="user_phonenum">000-0000-0000</div>
                                <div id="user_birthdate">0000.00.00</div>
                                <div id="user_academy">컴퓨터 학원, 코딩학원</div>
                            </div>
                        </div>
                        <div id="userphoto_mypage">
                            <div id="photo">
                                <div id="header_photo"/>
                                등록된<hr/>사진이<hr/>없습니다
                            </div>
                            <a>등록</a>
                        </div>
                    </div>
                </div>
                <div id="footer_mypage">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App12;