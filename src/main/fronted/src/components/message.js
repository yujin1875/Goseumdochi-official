import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/message.css';

function Message() {

    return (
        <div id="App">
            <div id="header_message"/>
            <div id="message">
                <h1>쪽지</h1>
                <select name="TypeOfMessage">
                    <option value="get">받은 쪽지함</option>
                    <option value="send">보낸 쪽지함</option>
                </select>
                <button id="letSendMessage">
                    쪽지 쓰기
                </button>
                <div id="getMessageBox">
                    <div id="ReadOrNot">
                        <div class="readornot">

                        </div>
                    </div>
                    <div id="Sender">
                        <div class="sender">
                            <span id="topsender">발신자</span>
                        </div>
                    </div>
                    <div id="Title">
                        <div class="title">
                            <span id="toptitle">
                                제목
                            </span>
                        </div>
                    </div>
                    <div id="Dates">
                        <div class="dates">
                            <span id="topdates">
                                날짜
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer_message"/>
        </div>
    );
}

export default Message;