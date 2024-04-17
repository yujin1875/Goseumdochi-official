import '../css/start.css';
import logo from './images/goseumdochi.png';

function App1() {
    const Gologin=()=>{
        window.location.href='/login'
    }

    const GoMem=()=>{
        window.location.href='/membership'
    }

    const Goaca=()=>{
        window.location.href='/academy'
    }

    const GoTest=()=>{
        window.location.href='/test'
    }

    const GoAcademyRegister=()=>{
        window.location.href='/academyform'
    }

    return (
        <div id="App">
            <div id="header_start">
                <div id="hd_start"/>
                <img src={logo}/>
            </div>
            <div id="buttons_start">
                <input type="submit" value="회원가입 (학생 전용)" id="membership_btn" onClick={GoMem}/>
                <hr/>
                <input type="submit" value="로그인" id="login_btn" onClick={Gologin}/>
                <hr/>
                <div id="btn_start">
                    <input type="submit" value="학원등록1" id="academy1_btn" onClick={Goaca}/>
                    <input type="submit" value="학원등록2" id="academy2_btn" onClick={GoAcademyRegister}/>
                </div>
            </div>
            <div id="footer_start">
                <a>문의 | midas2024.ver01@gmail.com</a>
            </div>
        </div>
    );
}

export default App1;