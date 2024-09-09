import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function LectureAssignmentPaging() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, lecture } = location.state;

    const [assignmentList, setAssignmentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingInfo, setPagingInfo] = useState({});

    useEffect(() => {
        fetchAssignments(currentPage);
    }, [currentPage]);

    const fetchAssignments = async (page) => {
        try {
            const response = await axios.get(`/api/lecture/${lecture.id}/assignment/paging?page=${page}`);
            setAssignmentList(response.data.assignment.content);
            setPagingInfo({
                startPage: response.data.startPage,
                endPage: response.data.endPage,
                totalPages: response.data.assignment.totalPages,
            });
        } catch (error) {
            console.error('Failed to fetch materials:', error);
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

        // 과제 제출 페이지로 이동 (과제 ID도 함께 전달)
        navigate('/submit-assignment', {
            state: { studentId, studentName, assignmentId },
        });
    };

    return (
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
                    {/* 기타 정보에 대한 헤더 */}
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
                        {/* 과제 제출 버튼 추가 (assignment.id를 전달) */}
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
            {/* 현재 페이지 기준으로 페이지 버튼 생성 */}
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
    );
}

export default LectureAssignmentPaging;