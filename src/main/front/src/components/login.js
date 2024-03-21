import '../css/login.css';
import logo from './images/goseumdochi.png';

function App3() {
    const GoAfterlogin=()=>{
        window.location.href='/afterlogin'
    }

    return (
        <div id="App">
            <div id="header_Login"/>
            <div id="login_write">
                <div id="login_write_header">
                    <img src={logo}/>
                    <a>로그인</a>
                </div>
                <div id="login_write_buttons">
                    <input type="text" placeholder="ID"/><hr/>
                    <input type="password" placeholder="PW"/><hr/>
                    <div id="letter_Login">
                        &nbsp;<a>아이디 찾기 | 비밀번호 찾기</a>&nbsp;
                    </div>
                    <input type="submit" value="Login" id="Login_btn" onClick={GoAfterlogin}/>
                </div>
            </div>
            <div id="footer_Login"/>
        </div>
    );
}

export default App3;