import '../css/findID.css';

function App8() {
    const Gologin=()=>{
        window.location.href='/login'
    }

    return (
        <div id="App">
            <div id="header_findID"/>
            <div id="write_findID">
                <h2>아이디 찾기</h2>
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
                <input type="submit" value="찾기" id="findID_btn"/><hr/>
            </div>
            <div id="footer_findID"/>
        </div>
    );
}

export default App8;