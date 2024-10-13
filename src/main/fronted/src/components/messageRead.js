import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/messageRead.css';

function Messageread() {

    const Gomessage=()=>{
        window.location.href='/message'
    }
    const GomessageWrite = () => {
        window.location.href = '/messageWrite';
    };
    const Gomessagereply = () => {
        window.location.href = '/messageReply';
    };

    return (
        <div id="App">
            <div id="header_messageRead" />
            <div id="messageRead">
                <button id="letSendMessageRead" onClick={GomessageWrite}>
                    쪽지 쓰기
                </button>
                <div id="readMessageBox">
                    <div id="Title">
                        <div id="title">
                            제목
                        </div>
                        <div id="read_title">

                        </div>
                    </div>
                    <div id="Sender">
                        <div id="sender">
                            발신자
                        </div>
                        <div id="read_lecture">

                        </div>
                    </div>
                    <div id="SendDate">
                        <div id="senddate">
                            발신일
                        </div>
                        <div id="read_date">

                        </div>
                    </div>
                    <div id="Contents">

                    </div>
                </div>
                <button id="GotoMessageList_messageRead" onClick={Gomessage}>
                    목록
                </button>
                <button id="SendingMessage_messageRead" onClick={Gomessagereply}>
                    답장
                </button>
                <button id="DeleteMessage_messageRead">
                    삭제
                </button>
            </div>
            <div id="footer_messageRead" />
        </div>
    );
}

export default Messageread;