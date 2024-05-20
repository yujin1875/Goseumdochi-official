import '../css/newPW.css';

function App11() {
    const Gologin=()=>{
        window.location.href='/login'
    }

    return (
        <div id="App">
            <div id="header_newPW"/>
            <div id="write_newPW">
                <h2>새로운 비밀번호 설정</h2>
                <input
                    type="text"
                    placeholder="새 비밀번호"
                /><hr/>
                <input
                    type="text"
                    placeholder="새 비밀번호 확인"
                    id="PWcheck"
                /><hr/>
                <input type="submit" value="찾기" id="newPW_btn" onClick={Gologin}/><hr/>
            </div>
            <div id="footer_newPW"/>
        </div>
    );
}

export default App11;