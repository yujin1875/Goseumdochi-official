import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

import SubmitAssignment from "../SubmitAssignment";

function LectureAssignmentPaging({ user, lecture }) { // props로 user와 lecture 받기
    const navigate = useNavigate();

    const [assignmentList, setAssignmentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingInfo, setPagingInfo] = useState({});

    const [selectedAssignmentId, setSelectedAssignmentId] = useState();

    useEffect(() => {
        fetchAssignments(currentPage);
    }, [currentPage]);

    const fetchAssignments = async (page) => {
        try {
            // 기본 과제 데이터를 가져옴
            const response = await axios.get(`/api/lecture/${lecture.id}/assignment/paging?page=${page}`);
            const assignments = response.data.assignment.content;

            // 각 과제에 대해 점수 정보를 추가 (isScoreVisible이 true인 경우에만 요청)
            const assignmentsWithScores = await Promise.all(
                assignments.map(async (assignment) => {
                    if (assignment.isScoreVisible) {
                        try {
                            // 학생이 제출한 과제 점수 정보를 가져옴
                            const scoreResponse = await axios.get(`/api/student/submittedAssignment/${assignment.id}`, {
                                params: { studentId: user.id },
                            });

                            // score가 null 또는 undefined가 아닌 경우에만 점수를 표시
                            return {
                                ...assignment,
                                score: scoreResponse.data && scoreResponse.data.score !== null ? scoreResponse.data.score : '점수 없음',
                            };
                        } catch (error) {
                            return { ...assignment, score: '점수 없음' };
                        }
                    }
                    return { ...assignment, score: '비공개' };
                })
            );

            // 과제 리스트와 페이징 정보 설정
            setAssignmentList(assignmentsWithScores);
            setPagingInfo({
                startPage: response.data.startPage,
                endPage: response.data.endPage,
                totalPages: response.data.assignment.totalPages,
            });
        } catch (error) {
            console.error('Failed to fetch assignments:', error);
        }
    };


    const goToPage = (page) => {
        setCurrentPage(page);
    };

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 
        ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        return formattedDate;
    }

    // 과제 제출 버튼 클릭 시 과제 제출 페이지로 이동하는 함수 수정
    const submitAssignment = (assignmentId) => {
        // 학생의 ID와 이름을 상태에서 가져옴
        const studentId = user.id;
        const studentName = user.name;

        setSelectedAssignmentId(assignmentId);
    };

    return (
        <div>
            {selectedAssignmentId == null ? (
                // selectedAssignment가 true일 때 보여줄 화면 (과제 목록과 페이징 버튼)
                <div>
                    {/* 과제 목록 출력 */}
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성자</th>
                            <th>공개일</th>
                            <th>마감일</th>
                            <th>배점</th>
                            <th>제출방식</th>
                            <th>첨부파일</th>
                            <th>점수</th>
                        </tr>
                        </thead>
                        <tbody>
                        {assignmentList.map((assignment) => (
                            <tr key={assignment.id}>
                                <td>{assignment.id}</td>
                                <td>{assignment.title}</td>
                                <td>{assignment.content}</td>
                                <td>{assignment.author}</td>
                                <td>{formatDateTime(assignment.createdAt)}</td>
                                <td>{formatDateTime(assignment.deadline)}</td>
                                <td>{assignment.points}</td>
                                <td>{assignment.examType}</td>
                                <td><a href={assignment.attachmentPath} download>첨부파일</a></td>
                                <td>
                                    {assignment.isScoreVisible ? (
                                        assignment.score !== null ? assignment.score : "점수 없음"
                                    ) : "비공개"}
                                </td>
                                <td>
                                    <button onClick={() => submitAssignment(assignment.id)}>과제 제출</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* 페이징 버튼 */}
                    <button onClick={() => goToPage(1)}>&lt;&lt;</button>
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)}>&lt;</button>
                    {Array.from({ length: pagingInfo.endPage - pagingInfo.startPage + 1 }, (_, i) => i + pagingInfo.startPage).map(page => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            style={{ backgroundColor: page === currentPage ? '#007BFF' : 'transparent', color: page === currentPage ? 'white' : 'black' }}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={() => currentPage < pagingInfo.totalPages && goToPage(currentPage + 1)}>&gt;</button>
                    <button onClick={() => goToPage(pagingInfo.totalPages)}>&gt;&gt;</button>
                </div>
            ) : (
                // selectedAssignment가 false일 때 보여줄 다른 화면
                <div>
                    <SubmitAssignment studentId={user.id} studentName={user.name} assignmentId={selectedAssignmentId} />
                </div>
            )}
        </div>
    );
}

export default LectureAssignmentPaging;