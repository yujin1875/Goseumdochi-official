import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './subcss/message_view.css'

function MessageViewSend() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, message } = location.state;

    // 쪽지 삭제
    const deleteMessage = async () => {
        try {
            const response = await
                axios.post(`/api/message/${message.id}/${user.role}/delete`); // 쪽지 삭제 API 호출
            alert(response.data);
            return true; // 삭제 성공
        } catch (err) {
            console.error("쪽지 삭제 실패", err);
            return false; // 삭제 실패
        }
    };

    // 쪽지 삭제
    const handleMessageDelete = async () => {
        const isDeleted = await deleteMessage(); // 삭제 시도
        if (isDeleted) { // 삭제가 되고 나서 페이지를 이동해야 리스트가 갱신되어있음!!!
            navigate('/message/list', { state: { user: user } }); // 리스트 페이지로 이동
        }
    };

    // 쪽지 전송취소
    const cancelMessage = async () => {
        try {
            const response = await
                axios.post(`/api/message/${message.id}/cancel`); // API 호출
            alert(response.data);
            return true; // 삭제 성공
        } catch (err) {
            console.error("쪽지 삭제 실패", err);
            alert(err.response.data);
            return false; // 삭제 실패
        }
    };

    // 쪽지 전송취소
    const handleMessageCancel = async () => {
        const isCanceled = await cancelMessage(); // 삭제 시도
        if (isCanceled) { // 삭제가 되고 나서 페이지를 이동해야 리스트가 갱신되어있음!!!
            navigate('/message/list', { state: { user: user } }); // 리스트 페이지로 이동
        }
    };

    const GoMessageWrite=() => {
        navigate('/message/write', { state: { user: user } });
    };

    const GoMessageList = () => {
        navigate('/message/list', { state: { user: user } });
    };

    // LocalDateTime 형 변환
    const formatLocalDateTime = (localDateTime) => {
        const date = new Date(localDateTime); // LocalDateTime 문자열을 Date 객체로 변환

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? '오후' : '오전'; // 오전/오후 결정
        const formattedHours = String(hours % 12 || 12).padStart(2, '0'); // 12시간제로 변환

        return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${minutes}`;
    };

    return (
        <div id="App">
            <div id="header_message"/>
            <div id="message">
                <h1>보낸쪽지</h1>
                <button id="letSendMessage" onClick={GoMessageWrite}>
                    쪽지쓰기
                </button>
                <div className="message_view_box">
                    <table className="message_view_table">
                        <tbody>
                        <tr>
                            <td className="table_label">
                                <label>제목</label>
                            </td>
                            <td className="table_value">
                                <div id="">{message.title}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table_label">
                                <label>수신자</label>
                            </td>
                            <td className="table_value">
                                <div id="">{message.receiverName}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table_label">
                                <label>발신일</label>
                            </td>
                            <td className="table_value">
                                <span>{formatLocalDateTime(message.sendDate)}</span>
                                <span
                                    id="sendDate_text"
                                    style={{
                                        fontSize: "14px", // 원하는 글씨 크기
                                        color: message.viewState === "Y" ? "#5cb85c" : "#d9534f" // 초록색 또는 빨간색
                                    }}>
                                    {message.viewState === "Y" ? "읽음" : "읽지않음"}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td id="table_value_content" colSpan="2">
                                <span>{message.content}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="button_container">
                        <button className="form_button" onClick={GoMessageList}>
                            목록
                        </button>
                        <div className="button_group_right">
                            <button className="form_button form_orange_button" onClick={handleMessageCancel}>
                                전송취소
                            </button>
                            <button className="form_button form_red_button" onClick={handleMessageDelete}>
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer_message"/>
        </div>
    );
}

export default MessageViewSend;