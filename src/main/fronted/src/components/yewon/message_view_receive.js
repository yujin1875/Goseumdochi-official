import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MessageViewReceive() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, message } = location.state;

    // 받은쪽지 열람 (최초 열람시 기록하기 위해)
    const fetchMessageOpen = async () => {
        try {
            const response = await
                axios.post(`/api/message/${message.id}/view/receive`, null, {
                    params: {
                        viewState: message.viewState,
                    },
                });
            console.log(response.data);
        } catch (error) {
            console.error("받은쪽지 열람 실패", error);
        }
    };

    // 컴포넌트가 마운트될 때 받은쪽지 열람 최초 한번 실행
    useEffect(() => {
        fetchMessageOpen();
    }, []); // 빈 배열로 의존성 설정하여 컴포넌트가 처음 마운트될 때만 실행

    // 메시지 삭제
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

    // 메시지 삭제
    const handleMessageDelete = async () => {
        const isDeleted = await deleteMessage(); // 삭제 시도
        if (isDeleted) { // 삭제가 되고 나서 페이지를 이동해야 리스트가 갱신되어있음!!!
            navigate('/message/list', { state: { user: user } }); // 리스트 페이지로 이동
        }
    };

    const GoMessageWrite=() => {
        navigate('/message/write', { state: { user: user } });
    };

    const GoMessageList = () => {
        navigate('/message/list', { state: { user: user } });
    };

    // 메시지 답장! **(보충필요)
    const GoMessageReply = () => {
        navigate('/message/write', { state: { user: user } });
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
                <h1>받은쪽지</h1>
                <button id="letSendMessage" onClick={GoMessageWrite}>
                    쪽지 쓰기
                </button>
                <div id="message_view">
                    <div id="category">
                        <div id="">제목</div>
                        <div id="">발신자</div>
                        <div id="">발신일</div>
                    </div>
                    <div>
                        <div id="">{message.title}</div>
                        <div id="">{message.senderName}</div>
                        <div id="">{formatLocalDateTime(message.sendDate)}</div>
                    </div>
                    <div>
                        <span>
                            {message.content}
                        </span>
                    </div>
                </div>
                <button id="GotoMessageList" onClick={GoMessageList}>
                    목록
                </button>
                <button id="" onClick={GoMessageReply}>
                    답장
                </button>
                <button id="" onClick={handleMessageDelete}>
                    삭제
                </button>
            </div>
            <div id="footer_message"/>
        </div>
    );
}

export default MessageViewReceive;