import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/community_badword_check.css';

function BadWordCheck() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;
    const [inputText, setInputText] = useState('');
    const [badWordResponse, setBadWordResponse] = useState(null);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        try {
            const response = await axios.get('/api/badword/check', {
                params: {
                    text: inputText,
                },
            });

            console.log(response.data);
            setBadWordResponse(response.data);
        } catch (error) {
            console.error('비속어 체크 실패:', error);
        }
    };

    return (
        <div id="badwordcheck">
            <div id="header_badwordcheck">
            </div>
            <div id="body_badwordcheck">
                <form id="badwordcheckForm" onSubmit={handleSubmit}>
                    <h1>비속어 체크</h1>
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="텍스트를 입력하세요"
                    />
                    <button type="submit">체크</button>
                    {badWordResponse && (
                        <div id="badwordcheckResult">
                            <h2>결과</h2>
                            <pre>{JSON.stringify(badWordResponse, null, 2)}</pre>
                        </div>
                    )}
                </form>
            </div>
            <div id="footer_badwordcheck">
                <a>문의 | midas2024.ver01@gmail.com</a>
            </div>
        </div>
    );
}

export default BadWordCheck;
