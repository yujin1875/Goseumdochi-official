import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MessageList() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [messageType, setMessageType] = useState('receive'); // 기본값은 '받은쪽지'
    const [messageList, setMessageList] = useState([]); // 메세지 리스트
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingInfo, setPagingInfo] = useState({});

    const fetchMessageList = async (messageType, page) => {
        try {
            const response = await axios.get(`/api/message/${user.role}/${user.id}/${messageType}/paging?page=${page}`);
            setMessageList(response.data.message.content); // 메시지 내용 설정
            setPagingInfo({
                startPage: response.data.startPage,
                endPage: response.data.endPage,
                totalPages: response.data.message.totalPages,
            });
        } catch (error) {
            console.error("메시지를 가져오는 데 오류가 발생했습니다:", error);
        }
    };

    // 컴포넌트가 처음 마운트될 때와 messageType이 변경될 때 호출
    useEffect(() => {
        fetchMessageList(messageType, currentPage);
    }, [messageType, currentPage]);

    const handleChange = (event) => {
        setMessageType(event.target.value);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const GoMessageWrite=() => {
        navigate('/message/write', { state: { user: user } });
    }

    // 받은쪽지 열람
    const handleViewReceiveMessage = (message) => {
        navigate('/message/view/receive', { state: { user: user, message: message } });
    };

    // 보낸쪽지 열람
    const handleViewSendMessage = (message) => {
        navigate('/message/view/send', { state: { user: user, message: message } });
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
        <div>
            <h1>쪽지</h1>
            <select value={messageType} onChange={handleChange}>
                <option value="receive">받은쪽지</option>
                <option value="send">보낸쪽지</option>
            </select>

            <button onClick={GoMessageWrite}>
                <span>쪽지쓰기</span>
            </button>

            <div>
                {messageType === 'receive' ? (
                    /*받은쪽지 리스트*/
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>발신자</th>
                            <th>제목</th>
                            <th>날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {messageList.map((message) => (
                            // onClick을 이렇게 사용해야 클릭 이벤트가 실행됐을 때 함수 실행됨
                            <tr key={message.id} onClick={() => handleViewReceiveMessage(message)}>
                                <td>{message.viewState}</td>
                                <td>{message.senderName}</td>
                                <td>{message.title}</td>
                                <td>{formatLocalDateTime(message.sendDate)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    /*보낸쪽지 리스트*/
                    <table>
                        <thead>
                        <tr>
                            <th>수신자</th>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>수신확인</th>
                        </tr>
                        </thead>
                        <tbody>
                        {messageList.map((message) => (
                            <tr key={message.id} onClick={() => handleViewSendMessage(message)}>
                                <td>{message.receiverName}</td>
                                <td>{message.title}</td>
                                <td>{formatLocalDateTime(message.sendDate)}</td>
                                <td>{message.viewState}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {/* 페이징 버튼 */}
                <button onClick={() => goToPage(1)}>&lt;&lt;</button>
                <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)}>&lt;</button>
                {/* 현재 페이지 기준으로 페이지 버튼 생성 */}
                {Array.from({ length: pagingInfo.endPage - pagingInfo.startPage + 1 }, (_, i) => i + pagingInfo.startPage).map(page => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        style={{ backgroundColor: page === currentPage ? '#007BFF' : 'transparent', color: page === currentPage ? 'white' : 'black' }}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => currentPage < pagingInfo.totalPages && goToPage(currentPage + 1)}>&gt;</button>
                <button onClick={() => goToPage(pagingInfo.totalPages)}>&gt;&gt;</button>
            </div>
        </div>
    );
}

export default MessageList;