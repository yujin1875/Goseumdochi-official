import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './subcss/message_write.css'

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
        <div id="App">
            <div id="header_message" />
            <div className="container_box">
                <h1>답장쓰기</h1>
                <form className="message_write_form" onSubmit={handleSubmit}>
                    <table className="form_table">
                        <tbody>
                        <tr>
                            <td className="form_label">
                                <label>제목</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form_input"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="form_label">
                                <label>받는사람</label>
                            </td>
                            <td>
                                <span className="form_input">{message.senderName}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="form_label">
                                <label>내용</label>
                            </td>
                            <td>
                            <textarea
                                className="form_textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="button_container">
                        <button type="button" className="form_button" onClick={GoMessageList}>목록</button>
                        <button type="submit" className="form_button form_button_submit">전송</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MessageReply;