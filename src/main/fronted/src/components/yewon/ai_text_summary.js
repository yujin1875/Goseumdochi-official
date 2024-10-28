import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function AiTextSummary() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [text, setText] = useState('');
    const [textSummary, setTextSummary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        try {
            const response = await
                axios.get('/api/ai/text/summary', {
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
        <div>
            <h1>AI 문서요약</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="text">문서 입력: </label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="내용을 입력해주세요."
                            style={{ width: '40%', height: '7.25em' }} // 크기 고정
                            required
                        />
                    </div>
                    <button type="submit">요약</button>
                </form>
            </div>
            <div>
                <div>
                    <span>{textSummary}</span>
                </div>
            </div>
        </div>

    );
}

export default AiTextSummary;