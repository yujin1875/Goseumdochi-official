import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

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

            // 여기서 response.data를 사용하여 결과를 처리합니다.
            console.log(response.data);
            setBadWordResponse(response.data);
        } catch (error) {
            console.error('비속어 체크 실패:', error);
        }
    };

    return (
        <div>
            <h1>비속어 체크</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="텍스트를 입력하세요"
                />
                <button type="submit">체크</button>
            </form>
            {badWordResponse && (
                <div>
                    <h2>결과</h2>
                    <pre>{JSON.stringify(badWordResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default BadWordCheck;
