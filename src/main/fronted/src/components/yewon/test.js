import { useNavigate } from 'react-router-dom';

function Yewon() {
    const navigate = useNavigate();

    const GologinAdmin=()=>{
        window.location.href='/admin/login'
    }

    const GologinIntegrate=()=>{
        window.location.href='/integrate/login'
    }

    return (
        <div id="App">
            <div id="buttons_start">
                <input type="submit" value="관리자로그인" id="membership_btn" onClick={GologinAdmin}/>
                <input type="submit" value="통합로그인" id="membership_btn" onClick={GologinIntegrate}/>
            </div>
        </div>
    );
}

export default Yewon;