import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/SubmitAssignment.css';

function SubmitAssignment({studentId, studentName, assignmentId}) {
    const location = useLocation();

    const [submittedAssignment, setSubmittedAssignment] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // 수정 모드 활성화 여부

    useEffect(() => {
        // 과제 제출 여부 확인
        axios.get(`/api/student/submittedAssignment/${assignmentId}`)
            .then(response => {
                setSubmittedAssignment(response.data);
                if (response.data) {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    // 과제가 제출되지 않았을 경우, 새 과제 제출 폼을 표시
                    console.log("제출한 과제가 없습니다. 새로 제출할 수 있습니다.");
                    setSubmittedAssignment(null); // 폼을 띄우도록 상태 설정
                } else {
                    // 404 외의 오류는 콘솔에 표시
                    console.error('Failed to fetch assignment submission:', error);
                }
            });
    }, [assignmentId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('assignmentId', assignmentId);
        formData.append('title', title);
        formData.append('content', content);
        if (file) formData.append('file', file);

        axios.post('/api/student/submitAssignment', formData)
            .then(response => {
                alert('과제가 성공적으로 제출되었습니다.');
                // 제출 후 데이터 다시 불러오기
                axios.get(`/api/student/submittedAssignment/${assignmentId}`)
                    .then(response => {
                        setSubmittedAssignment(response.data);
                        setIsEditing(false); // 수정 모드 종료
                    })
                    .catch(error => {
                        console.error('Failed to fetch submitted assignment:', error);
                    });
            })
            .catch(error => {
                console.error('Failed to submit assignment:', error);
            });
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('assignmentId', assignmentId);
        formData.append('title', title);
        formData.append('content', content);
        if (file) formData.append('file', file);

        axios.post('/api/student/updateAssignment', formData)
            .then(response => {
                alert('과제가 성공적으로 수정되었습니다.');
                // 수정 후 데이터 다시 불러오기
                axios.get(`/api/student/submittedAssignment/${assignmentId}`)
                    .then(response => {
                        setSubmittedAssignment(response.data);
                        setIsEditing(false); // 수정 모드 종료
                    })
                    .catch(error => {
                        console.error('Failed to fetch submitted assignment:', error);
                    });
            })
            .catch(error => {
                console.error('Failed to update assignment:', error);
            });
    };

    const handleEdit = () => {
        setIsEditing(true); // 수정 모드 활성화
    };

    const handleDelete = () => {
        axios.delete(`/api/student/deleteAssignment/${assignmentId}`)
            .then(response => {
                alert('과제가 삭제되었습니다.');
                // 과제 삭제 후 입력 폼과 제출된 과제 정보 초기화
                setSubmittedAssignment(null);
                setTitle('');    // 제목 필드 초기화
                setContent('');  // 내용 필드 초기화
                setFile(null);   // 첨부파일 필드 초기화
                setIsEditing(false);  // 수정 모드도 종료
            })
            .catch(error => {
                console.error('Failed to delete assignment:', error);
            });
    };

    return (
        <div className="SubmitAssignment">
            <h1>과제 제출 페이지</h1>
            <div className="SubmitAssignment_frame">
                {submittedAssignment && !isEditing ? (
                    <div className="alreadysubmit_SubmitAssignment">
                        <h2>제출한 과제</h2>
                        <div className="Contentalreadysubmit_SubmitAssignment">
                            <p>제목: {title}</p>
                            <p>내용: {content}</p>
                            <a href={submittedAssignment.attachmentPath} download>첨부파일 다운로드</a>
                        </div>
                        <div className="Btnalreadysubmit_SubmitAssignment">
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </div>
                    </div>
                ) : (
                    <div className="nowsubmit_SubmitAssignment">
                        <h2>{isEditing ? "과제 수정" : "새 과제 제출"}</h2>
                        <div className="Contentnowsubmit_SubmitAssignment">
                            <label>
                                제목: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <br />
                            <label>
                                내용: <br/><textarea value={content} onChange={(e) => setContent(e.target.value)} />
                            </label>
                            <br />
                            <label>
                                첨부파일: <input type="file" onChange={handleFileChange} />
                            </label>
                        </div>
                        <br />
                        <div className="Btnnowsubmit_SubmitAssignment">
                            <button onClick={isEditing ? handleUpdate : handleSubmit}>{isEditing ? "수정 완료" : "저장"}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SubmitAssignment;
