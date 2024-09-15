import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/messageWrite.css';

function MessageWrite2() {

    return (
        <div id="App">
            <div id="header_messageWrite"/>
            <div id="messageWrite">
                <h1>쪽지</h1>
                <select name="TypeOfMessage">
                    <option value="get">받은 쪽지함</option>
                    <option value="send">보낸 쪽지함</option>
                </select>
                <div id="WriteMessageBox">
                    <div id="Title">
                        <div id="title">
                        </div>
                        <div id="write_title">
                        </div>
                    </div>
                    <div id="Lecture">
                        <div id="lecture">
                        </div>
                        <div id="write_lecture">
                        </div>
                    </div>
                    <div id="Receiver">
                        <div id="receiver">
                        </div>
                        <div id="write_receiver">
                        </div>
                    </div>
                    <div id="contents">
                        <div id="title">
                        </div>
                    </div>
                </div>
                <button id="GotoMessageList">
                    목록
                </button>
                <button id="SendingMessage">
                    전송
                </button>
            </div>
            <div id="footer_messageWrite"/>
        </div>
    );
}

export default MessageWrite2;