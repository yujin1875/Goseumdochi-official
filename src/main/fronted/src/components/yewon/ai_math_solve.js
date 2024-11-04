import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import loadingGIF from "../images/loading.gif";

function AiMathSolve() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        setLoading(true); // 로딩 시작

        try {
            const response = await axios.get('/api/ai/math/solve', {
                params: {
                    problem: problem,
                },
            });
            // 수학문제풀이 성공
            console.log(response.data);
            setSolution(response.data);
        } catch (error) { // 수학문제풀이 실패
            console.error('추천 받기 실패:', error);
            alert(error.response.data);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <div>
            <h1>AI 수학문제풀이</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="problem">수학문제 입력: </label>
                        <textarea
                            id="problem"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="내용을 입력해주세요."
                            style={{ width: '40%', height: '6.25em' }} // 크기 고정
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>풀이</button> {/* 로딩 중 버튼 비활성화 */}
                </form>
            </div>
            <div>
                {loading ? ( // 풀이 중일 때 표시
                    <div>
                        <img
                            src={loadingGIF}
                            alt="풀이 중..."
                            style={{ width: '200px', height: '150px' }}
                        />
                    </div>
                ) : (
                    <div>
                        <h4>풀이 해답: </h4>
                        <span>{solution}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AiMathSolve;
