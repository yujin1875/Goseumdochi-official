import '../css/login.css';
import logo from './images/goseumdochi.png';

function App3() {
    const GoAfterlogin=()=>{
        window.location.href='/afterlogin'
    }
    const GoFindID=()=>{
        window.location.href='/findID'
    }
    const GoFindPW=()=>{
        window.location.href='/findPW'
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
                        <button id='findid' onClick={GoFindID}>아이디 찾기</button>
                        <button id='findpw' onClick={GoFindPW}>비밀번호 찾기</button>
                    </div>
                    <input type="submit" value="Login" id="Login_btn" onClick={GoAfterlogin}/>
                </div>
            </div>
            <div id="footer_Login"/>
        </div>
    );
}

export default App3;