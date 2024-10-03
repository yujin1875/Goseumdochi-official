import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/message.css';

function Message() {
    const [messageType, setMessageType] = useState('get');

    const handleSelectChange = (e) => {
        setMessageType(e.target.value);
    };

    const GomessageWrite = () => {
        window.location.href = '/messageWrite';
    };

    return (
        <div id="App">
            <div id="header_message" />
            <div id="message">
                <h1>쪽지</h1>
                <select name="TypeOfMessage" value={messageType} onChange={handleSelectChange}>
                    <option value="get">받은 쪽지함</option>
                    <option value="send">보낸 쪽지함</option>
                </select>
                <button id="letSendMessage" onClick={GomessageWrite}>
                    쪽지 쓰기
                </button>

                {messageType === 'get' ? (
                    <div id="getMessageBox">
                        <div id="ReadOrNot">
                            <div className="readornot" />
                        </div>
                        <div id="Sender">
                            <div className="sender">
                                <span id="topsender">발신자</span>
                            </div>
                        </div>
                        <div id="Title">
                            <div className="title">
                                <span id="toptitle">제목</span>
                            </div>
                        </div>
                        <div id="Dates">
                            <div className="dates">
                                <span id="topdates">날짜</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="sendMessageBox">
                        <div id="SendTo">
                            <div className="sendto">
                                <span id="topsendto">수신자</span>
                            </div>
                        </div>
                        <div id="Title">
                            <div className="title">
                                <span id="toptitle">제목</span>
                            </div>
                        </div>
                        <div id="Dates_send">
                            <div className="dates_send">
                                <span id="topdates_send">날짜</span>
                            </div>
                        </div>
                        <div id="ReadOrNot">
                            <div className="readornot">
                                <span id="topreadornot">수신 확인</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div id="footer_message" />
        </div>
    );
}

export default Message;