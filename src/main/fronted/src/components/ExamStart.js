import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ExamStart() {
    const location = useLocation();
    const { user, lecture } = location.state;
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const examId = location.pathname.split('/').pop();

    // 시험 문제 불러오기
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/api/teacher/exams/${examId}/questions`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [examId]);

    // 답안 입력 시 상태 업데이트
    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    // 답안 제출
    const submitAnswers = async () => {
        try {
            const submissionData = questions.map((question) => ({
                questionId: question.id,
                answer: answers[question.id] || ""
            }));
            await axios.post(`/api/student/exams/${examId}/answers`, {
                studentId: user.id,
                examId: examId,
                submissionData
            });
            alert('답안이 성공적으로 제출되었습니다.');
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    return (
        <div>
            <h2>{lecture.name} - 시험 문제</h2>
            {questions.map((question, index) => (
                <div key={question.id}>
                    <h3>문제 {index + 1}: {question.text}</h3>
                    {question.type === 'multipleChoice' ? (
                        <div>
                            {question.answers.map((option, i) => (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value={option}
                                        checked={answers[question.id] === option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <textarea
                            rows="4"
                            value={answers[question.id] || ""}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            placeholder="서술형 답안을 입력하세요"
                        />
                    )}
                </div>
            ))}
            <button onClick={submitAnswers}>제출</button>
        </div>
    );
}

export default ExamStart;
