import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function AiRecommendUniv() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [majorSubject, setMajorSubject] = useState('');
    const [nRecommendations, setNRecommendations] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        try {
            const response = await
                axios.get('/api/ai/recommend/univ', {
                params: {
                    major_subject: majorSubject,
                    n_recommendations: nRecommendations,
                },
            });
            // 여기서 response.data를 사용하여 결과를 처리합니다.
            console.log(response.data);

            setRecommendations(response.data);

        } catch (error) {
            console.error('추천 받기 실패:', error);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="majorSubject">관심 있는 과목: </label>
                        <input
                            id="majorSubject"
                            value={majorSubject}
                            onChange={(e) => setMajorSubject(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nRecommendations">출력 갯수: </label>
                        <input
                            id="nRecommendations"
                            type="number"
                            value={nRecommendations}
                            onChange={(e) => setNRecommendations(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">추천받기</button>


                </form>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>거리</th>
                        <th>관련 직업명</th>
                        <th>단과대학명</th>
                        <th>대학 자체 계열명</th>
                        <th>수업연한</th>
                        <th>입학 정원수</th>
                        <th>졸업자수</th>
                        <th>주야과정명</th>
                        <th>주요 교과목명</th>
                        <th>학과명</th>
                        <th>학교 구분명</th>
                        <th>학교명</th>
                        <th>학교 학과 특성명</th>
                        <th>학위 과정명</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recommendations.length > 0 ? (
                        recommendations.map((recommendation, index) => (
                            <tr key={index}>
                                <td>{recommendation.distance}</td>
                                <td>{recommendation.관련직업명}</td>
                                <td>{recommendation.단과대학명}</td>
                                <td>{recommendation.대학자체계열명}</td>
                                <td>{recommendation.수업연한}</td>
                                <td>{recommendation.입학정원수}</td>
                                <td>{recommendation.졸업자수}</td>
                                <td>{recommendation.주야과정명}</td>
                                <td>{recommendation.주요교과목명}</td>
                                <td>{recommendation.학과명}</td>
                                <td>{recommendation.학교구분명}</td>
                                <td>{recommendation.학교명}</td>
                                <td>{recommendation.학교학과특성명}</td>
                                <td>{recommendation.학위과정명}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">추천 결과가 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default AiRecommendUniv;