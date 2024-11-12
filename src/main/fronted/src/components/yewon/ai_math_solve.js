import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import loadingGIF from "../images/loading.gif";
import '../../css/ai_math_solve.css';

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
        <div id="ai_math_solve_container">
            <h1 id="ai_math_solve_header">AI 수학문제풀이</h1>
            <div id="ai_math_solve_form_container">
                <form onSubmit={handleSubmit} id="ai_math_solve_form">
                    <div id="ai_math_solve_input_container">
                        <label htmlFor="problem" id="ai_math_solve_label">수학문제 입력: </label>
                        <textarea
                            id="ai_math_solve_problem"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="내용을 입력해주세요."
                            style={{ width: '100%', height: '7.25em' }} // 크기 고정
                            required
                        />
                    </div>
                    <button type="submit" id="ai_math_solve_submit_button" disabled={loading}>풀이</button> {/* 로딩 중 버튼 비활성화 */}
                </form>
            </div>
            <div id="ai_math_solve_result_container">
                {loading ? ( // 풀이 중일 때 표시
                    <div id="ai_math_solve_loading">
                        <img
                            src={loadingGIF}
                            alt="풀이 중..."
                            id="ai_math_solve_loading_image"
                            style={{ width: '200px', height: '150px' }}
                        />
                    </div>
                ) : (
                    <div id="ai_math_solve_solution">
                        <h4 id="ai_math_solve_solution_header">풀이 해답: </h4>
                        <span id="ai_math_solve_solution_text">{solution}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AiMathSolve;
