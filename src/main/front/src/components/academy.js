import '../css/academy.css';

function App4() {
    return (
        <div id="App">
            <div id="header_academy"/>
            <div id="academy_write">
                <div id='academy_write_buttons'>
                    <a>본인 확인을 위한 신청자 이름과 전화번호를 입력해주세요</a>
                    <input type="name" placeholder="이름"/><hr/>
                    <input type="phonenumber" placeholder="전화번호"/><hr/>
                    <div id="btn_academy">
                        <input type="submit" value="신청서 제출" id="submit_btn"/>
                        <input type="submit" value="제출한 신청서 확인" id="check_btn"/>
                    </div>
                </div>
            </div>
            <div id="footer_academy"/>
        </div>
    );
}

export default App4;