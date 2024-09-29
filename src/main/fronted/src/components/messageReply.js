import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/messageReply.css';

function MessageReply() {

    return (
        <div id="App">
            <div id="header_messageReply"/>
            <div id="messageReply">
                <h1>쪽지</h1>
                <select name="TypeOfMessage">
                    <option value="get">받은 쪽지함</option>
                    <option value="send">보낸 쪽지함</option>
                </select>
                <div id="ReplyMessageBox">
                    <div id="Title">
                        <div id="title">
                            제목
                        </div>
                        <div id="write_title">
                            <input type="text"/>
                        </div>
                    </div>
                    <div id="Lecture">
                        <div id="lecture">
                            강의
                        </div>
                        <div id="write_lecture">
                            <select name="ListOfLecture">
                                <option>강의</option>
                            </select>
                        </div>
                    </div>
                    <div id="Receiver">
                        <div id="receiver">
                            받는 사람
                        </div>
                        <div id="write_receiver">
                            <select name="ListOfReceiver">
                                <option>받는 사람</option>
                            </select>
                        </div>
                    </div>
                    <div id="Contents">
                        <div id="contents">
                            내용
                        </div>
                        <textarea placeholder="내용을 입력해 주세요."/>
                    </div>
                </div>
                <button id="GotoMessageList">
                    목록
                </button>
                <button id="SendingMessage">
                    전송
                </button>
            </div>
            <div id="footer_messageReply"/>
        </div>
    );
}

export default MessageReply;