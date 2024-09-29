import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MessageReply() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, message } = location.state;

    const [title, setTitle] = useState("Re: " + message.title); // 제목
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        const messageDTO = {
            title,
            content,
            studentId: message.studentId,
            teacherId: message.teacherId,
        };

        console.log(messageDTO);

        try {
            const response = await
                axios.post(`/api/message/${user.role}/send`, messageDTO);

            alert(response.data); // 쪽지 전송 성공 메시지
            GoMessageList();
        } catch (error) {
            console.error("쪽지 답장 실패", error);
        }
    };

    const GoMessageList = () => {
        navigate('/message/list', { state: { user: user } });
    };

    return (
        <div>
            <h1>쪽지쓰기</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label>제목</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>받는사람</label>
                        </td>
                        <td>
                            <span>{message.senderName}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>내용</label>
                        </td>
                        <td>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={GoMessageList}>목록</button>
                    <button type="submit">전송</button>
                </div>
            </form>
        </div>
    );
}

export default MessageReply;