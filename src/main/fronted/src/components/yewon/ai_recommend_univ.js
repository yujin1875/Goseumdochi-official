import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/ai_recommend_univ.css';

function AiRecommendUniv() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [majorSubject, setMajorSubject] = useState('');
    const [nRecommendations, setNRecommendations] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        try {
            const response = await axios.get('/api/ai/recommend/univ', {
                params: {
                    major_subject: majorSubject,
                    n_recommendations: nRecommendations,
                },
            });
            console.log(response.data);
            setRecommendations(response.data);
        } catch (error) {
            console.error('추천 받기 실패:', error);
        }
    };

    return (
        <div id="ai_recommend">
            <div id="aiRecommendFormWrapper">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="majorSubject">관심 있는 과목: </label>
                        <input
                            id="aiMajorSubject"
                            value={majorSubject}
                            onChange={(e) => setMajorSubject(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nRecommendations">출력 갯수: </label>
                        <input
                            id="aiNRecommendations"
                            type="number"
                            value={nRecommendations}
                            onChange={(e) => setNRecommendations(e.target.value)}
                            required
                        />
                    </div>
                    <button id="aiRecommendButton" type="submit">추천받기</button>
                </form>
            </div>

            <div id="aiRecommendationResultsWrapper">
                <table id="aiRecommendationTable">
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
                                    <td title={recommendation.관련직업명}>{recommendation.관련직업명}</td>
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
