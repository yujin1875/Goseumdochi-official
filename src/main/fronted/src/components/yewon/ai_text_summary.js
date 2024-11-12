import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/ai_text_summary.css';

function AiTextSummary() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [text, setText] = useState('');
    const [textSummary, setTextSummary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        try {
            const response = await axios.get('/api/ai/text/summary', {
                params: {
                    text: text,
                },
            });
            // 여기서 response.data를 사용하여 결과를 처리합니다.
            console.log(response.data);

            setTextSummary(response.data);

        } catch (error) {
            console.error('추천 받기 실패:', error);
        }
    };

    return (
        <div id="ai_text_summary_container">
            <h1 id="ai_text_summary_header">AI 문서요약</h1>
            <div id="ai_text_summary_form_container">
                <form onSubmit={handleSubmit} id="ai_text_summary_form">
                    <div id="ai_text_summary_input_container">
                        <label htmlFor="text" id="ai_text_summary_label">문서 입력: </label>
                        <textarea
                            id="ai_text_summary_textarea"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="내용을 입력해주세요."
                            style={{ width: '40%', height: '7.25em' }} // 크기 고정
                            required
                        />
                    </div>
                    <button type="submit" id="ai_text_summary_submit_button">요약</button>
                </form>
            </div>
            <div id="ai_text_summary_result_container">
                <div id="ai_text_summary_result">
                    <span id="ai_text_summary_text">{textSummary}</span>
                </div>
            </div>
        </div>
    );
}

export default AiTextSummary;
