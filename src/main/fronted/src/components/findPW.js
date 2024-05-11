import '../css/findPW.css';

function App9() {
    const Gologin=()=>{
        window.location.href='/login'
    }

    return (
        <div id="App">
            <div id="header_findPW"/>
            <div id="write_findPW">
                <h2>비밀번호 찾기</h2>
                <input
                    type="text"
                    placeholder="아이디"
                /><hr/>
                <input
                    type="text"
                    placeholder="이름"
                /><hr/>
                <input
                    type="text"
                    placeholder="010-0000-0000"
                    id="PhoneNum"
                />
                <input type="submit" value="인증" id="sub_btn"/><hr/>
                <input
                    type="text"
                    placeholder="인증번호"
                />
                <input type="submit" value="찾기" id="findPW_btn"/><hr/>
            </div>
            <div id="footer_findPW"/>
        </div>
    );
}

export default App9;