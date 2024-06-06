import '../css/teacherportal.css';
import logo from './images/goseumdochi.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function App26() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, lectureId } = location.state || {};
    const [visibleDiv, setVisibleDiv] = useState('Home');
    const [visiblesubDiv, setVisiblesubDiv] = useState('List');
    const [materials, setMaterials] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [points, setPoints] = useState('');
    const [file, setFile] = useState(null);
    const [existingFile, setExistingFile] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (visibleDiv === 'Lecturedata' && visiblesubDiv === 'List') {
            fetchMaterials();
        } else if (visibleDiv === 'Assignment') {
            fetchAssignments();
        }
    }, [visibleDiv, visiblesubDiv]);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture-material/list/${lectureId}`);
            setMaterials(response.data);
        } catch (error) {
            console.error("There was an error fetching the materials!", error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture/${lectureId}/assignments`);
            setAssignments(response.data);
        } catch (error) {
            console.error("There was an error fetching the assignments!", error);
        }
    };

    const handleMaterialClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/lecture-material/${id}`);
            setCurrentMaterial(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setExistingFile(response.data.attachmentPath);
            showsubDivView();
        } catch (error) {
            console.error("There was an error fetching the material!", error);
        }
    };

    const handleAssignmentClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/assignment/${id}`);
            setCurrentAssignment(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setPoints(response.data.points);
            setExistingFile(response.data.attachmentPath);
            showDivAssignmentRead();
        } catch (error) {
            console.error("There was an error fetching the assignment!", error);
        }
    };

    const handleUpdateMaterial = async () => {
        const formData = new FormData();
        formData.append('material', new Blob([JSON.stringify({ title, content })], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }
        try {
            if (currentMaterial) {
                await axios.put(`/api/teacher/lecture-material/${currentMaterial.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('/api/teacher/lecture-material', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            showsubDivList();
            fetchMaterials();
        } catch (error) {
            console.error("There was an error updating the material!", error);
        }
    };

    const handleUpdateAssignment = async () => {
        const formData = new FormData();
        formData.append('assignment', new Blob([JSON.stringify({ title, content, points })], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }
        try {
            if (currentAssignment) {
                await axios.put(`/api/teacher/assignment/${currentAssignment.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post(`/api/teacher/lecture/${lectureId}/assignment/new`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            showDivAssignment();
            fetchAssignments();
        } catch (error) {
            console.error("There was an error updating the assignment!", error);
        }
    };

    const handleDeleteMaterial = async (id) => {
        try {
            await axios.delete(`/api/teacher/lecture-material/${id}`);
            showsubDivList();
            fetchMaterials();
        } catch (error) {
            console.error("There was an error deleting the material!", error);
        }
    };

    const handleDeleteAssignment = async (id) => {
        try {
            await axios.delete(`/api/teacher/assignment/${id}`);
            showDivAssignment();
            fetchAssignments();
        } catch (error) {
            console.error("There was an error deleting the assignment!", error);
        }
    };

    const handleSave = async () => {
        if (!title || !content || !file) {
            alert("제목, 내용, 파일을 모두 입력하세요.");
            return;
        }

        const lectureMaterialDTO = { title, content };

        const formData = new FormData();
        formData.append('material', new Blob([JSON.stringify(lectureMaterialDTO)], { type: "application/json" }));
        formData.append('file', file);
        formData.append('id', user.id);

        try {
            const response = await axios.post(`/api/teacher/lecture/${lectureId}/lecture-material/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert("새로운 강의 자료가 생성되었습니다.");
                showsubDivList();
                fetchMaterials();
            }
        } catch (error) {
            if (error.response) {
                console.error('응답 에러:', error.response.data);
            } else if (error.request) {
                console.error('요청 에러:', error.request);
            } else {
                console.error('에러:', error.message);
            }
            alert("강의 자료 생성에 실패했습니다. 다시 시도하세요.");
        }
    };

    const handleSaveAssignment = async () => {
        if (!title || !content || !file) {
            alert("제목, 내용, 파일을 모두 입력하세요.");
            return;
        }

        const assignmentDTO = { title, content, points };

        const formData = new FormData();
        formData.append('assignment', new Blob([JSON.stringify(assignmentDTO)], { type: "application/json" }));
        formData.append('file', file);
        formData.append('id', user.id);

        try {
            const response = await axios.post(`/api/teacher/lecture/${lectureId}/assignment/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert("새로운 과제가 생성되었습니다.");
                showDivAssignment();
                fetchAssignments();
            }
        } catch (error) {
            if (error.response) {
                console.error('응답 에러:', error.response.data);
            } else if (error.request) {
                console.error('요청 에러:', error.request);
            } else {
                console.error('에러:', error.message);
            }
            alert("과제 생성에 실패했습니다. 다시 시도하세요.");
        }
    };

    const showDivHome = () => {
        setVisibleDiv('Home');
    };

    const showDivAssignment = () => {
        setVisibleDiv('Assignment');
    };

    const showDivAssignmentAdd = () => {
        setVisibleDiv('Assignmentadd');
        setTitle('');
        setContent('');
        setPoints('');
        setFile(null);
        setCurrentAssignment(null);
    };

    const showDivAssignmentRead = () => {
        setVisibleDiv('Assignmentread');
    };

    const showDivLecturedata = () => {
        setVisibleDiv('Lecturedata');
        setVisiblesubDiv('List');
    };

    const showsubDivList = () => {
        setVisiblesubDiv('List');
    };

    const showsubDivView = () => {
        setVisiblesubDiv('View');
    };

    const showsubDivWrite = () => {
        setTitle('');
        setContent('');
        setFile(null);
        setCurrentMaterial(null);
        setVisiblesubDiv('Write');
    };

    const showsubDivreviseWrite = () => {
        setVisiblesubDiv('reviseWrite');
    };

    return (
        <div id="App">
            <div id="menu_teacherportal">
                <div id="teacher_info">
                    <img src={logo} />
                    <h2>고슴도치</h2>
                </div>
                <ul>
                    <li onClick={showDivHome}><a>교과정보</a></li>
                    <li><a>강의관리</a></li>
                    <li onClick={showDivLecturedata}><a>수업자료</a></li>
                    <li onClick={showDivAssignment}><a>과제조회/제출</a></li>
                    <li><a>평가관리</a></li>
                    <li><a>시험관리</a></li>
                    <li><a>과목공지</a></li>
                    <li><a>강의실 나가기</a></li>
                </ul>
            </div>
            <div id="teacherportal_header">
                <div id="menu_btn" />
                <div id="home_btn" />
                <div id="title">

                </div>
            </div>
            <div id="contents_teacherportal">
                {visibleDiv === 'Home' && (
                    <>
                        <div id="Home_teacherportal">

                        </div>
                    </>
                )}
                {visibleDiv === 'Assignment' && (
                    <>
                        <div id="Assignment_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                                <button id="add_btn" onClick={showDivAssignmentAdd}>
                                    추가
                                </button>
                            </div>
                            <div id="Assignment">
                                <div id="cate_Assignment">
                                    <div id="no">번호</div>
                                    <div id="title">제목</div>
                                    <div id="submission">제출인원</div>
                                    <div id="score">배점</div>
                                    <div id="estimation">평가</div>
                                    <div id="opendate">공개일</div>
                                    <div id="closedate">마감일</div>
                                </div>
                                {assignments.map(assignment => (
                                    <div key={assignment.id} id="body_Assignment">
                                        <div id="Ano">{assignment.id}</div>
                                        <div id="Atitle" onClick={() => handleAssignmentClick(assignment.id)}>{assignment.title}</div>
                                        <div id="Asubmission">제출인원</div>
                                        <div id="Ascore">{assignment.points}</div>
                                        <div id="Aestimation">평가</div>
                                        <div id="Aopendate">{assignment.createdAt}</div>
                                        <div id="Aclosedate">{assignment.deadline}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'Assignmentadd' && (
                    <>
                        <div id="Assignmentadd_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                            </div>
                        </div>
                        <div id="title_Assignmentadd">
                            <h2>제목</h2>
                            <input type="text" id="Assignmentadd_title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div id="method_Assignmentadd">
                            <h2>제출 방식</h2>
                            <select id="numbers">
                                <option value="1">온라인</option>
                                <option value="2">오프라인</option>
                            </select>
                        </div>
                        <div id="date_Assignmentadd">
                            <h2 id="open">공개일</h2>
                            <input type="date" id="Assignmentadd_opendate" />
                            <h2 id="close">마감일</h2>
                            <input type="date" id="Assignmentadd_closedate" />
                        </div>
                        <div id="score_Assignmentadd">
                            <h2>배점</h2>
                            <input type="text" id="Assignmentadd_score" value={points} onChange={(e) => setPoints(e.target.value)} />
                        </div>
                        <div id="content_Assignmentadd">
                            <input type="text" id="Assignmentadd_content" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div id="file_Assignmentadd">
                            <input type="file" id="Assignmentadd_file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div id="buttons_Assignmentadd">
                            <button id="save" onClick={handleSaveAssignment}>
                                저장
                            </button>
                            <button id="back" onClick={showDivAssignment}>
                                취소
                            </button>
                        </div>
                    </>
                )}
                {visibleDiv === 'Assignmentread' && (
                    <>
                        <div id="Assignmentread_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                            </div>
                        </div>
                        <div id="title_Assignmentread">
                            <h2>제목</h2>
                            <div id="Assignmentread_title">{currentAssignment?.title}</div>
                        </div>
                        <div id="method_Assignmentread">
                            <h2>제출 방식</h2>
                            <div id="Assignmentread_method">온라인</div>
                        </div>
                        <div id="date_Assignmentread">
                            <h2 id="open">공개일</h2>
                            <div id="Assignmentread_opendate">{currentAssignment?.createdAt}</div>
                            <h2 id="close">마감일</h2>
                            <div id="Assignmentread_closedate">{currentAssignment?.deadline}</div>
                        </div>
                        <div id="score_Assignmentread">
                            <h2>배점</h2>
                            <div id="Assignmentread_score">{currentAssignment?.points}</div>
                        </div>
                        <div id="content_Assignmentread">
                            <div id="Assignmentread_content">{currentAssignment?.content}</div>
                        </div>
                        <div id="file_Assignmentread">
                            <div id="Assignmentread_file"><a href={currentAssignment?.attachmentPath} download>첨부파일</a></div>
                        </div>
                        <div id="buttons_Assignmentread">
                            <button id="save" onClick={handleUpdateAssignment}>
                                수정
                            </button>
                            <button id="delete" onClick={() => handleDeleteAssignment(currentAssignment.id)}>
                                삭제
                            </button>
                            <button id="back" onClick={showDivAssignment}>
                                목록
                            </button>
                        </div>
                    </>
                )}
                {visibleDiv === 'Lecturedata' && (
                    <>
                        <div id="Lecturedata_teacherportal">
                            <h2>수업자료실</h2>
                            <div id="Lecturedata">
                                {visiblesubDiv === 'List' && (
                                    <div id="List_teacherportal">
                                        <div id="cate_List">
                                            <div id="no">no</div>
                                            <div id="title">제목</div>
                                            <div id="writer">작성자</div>
                                            <div id="writedate">작성일자</div>
                                        </div>
                                        {materials.map(material => (
                                            <div key={material.id} id="body_List">
                                                <div id="body_no">{material.id}</div>
                                                <div id="body_title" onClick={() => handleMaterialClick(material.id)}>
                                                    {material.title}
                                                </div>
                                                <div id="body_writer">{material.author}</div>
                                                <div id="body_writedate">{material.createdAt}</div>
                                            </div>
                                        ))}
                                        <button id="newRegister" onClick={showsubDivWrite}>
                                            <span>새로 등록하기</span>
                                        </button>
                                    </div>
                                )}
                                {visiblesubDiv === 'View' && (
                                    <div id="View_teacherportal">
                                        <div id="title_View">{currentMaterial?.title}</div>
                                        <div id="content_View">{currentMaterial?.content}</div>
                                        <div id="file_View">
                                            <a href={currentMaterial?.attachmentPath} download>첨부파일</a>
                                        </div>
                                        <button id="back" onClick={showsubDivList}>
                                            <span>뒤로가기</span>
                                        </button>
                                        <button id="revise" onClick={showsubDivreviseWrite}>
                                            <span>수정</span>
                                        </button>
                                        <button id="delete" onClick={() => handleDeleteMaterial(currentMaterial.id)}>
                                            <span>삭제</span>
                                        </button>
                                    </div>
                                )}
                                {visiblesubDiv === 'Write' && (
                                    <div id="Write_teacherportal">
                                        <div id="Write">
                                            <div id="title_Write">
                                                <div id="tWrite">제목</div>
                                                <input type="text" id="titleWrite" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                            <div id="content_Write">
                                                <div id="cWrite">내용</div>
                                                <input type="text" id="contentWrite" value={content} onChange={(e) => setContent(e.target.value)} />
                                            </div>
                                            <div id="file_Write">
                                                <div id="fWrite">첨부파일</div>
                                                <input type="file" id="fileWrite" onChange={(e) => setFile(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <button id="save" onClick={handleSave}>
                                            <span>저장</span>
                                        </button>
                                    </div>
                                )}
                                {visiblesubDiv === 'reviseWrite' && (
                                    <div id="reviseWrite_teacherportal">
                                        <div id="reviseWrite">
                                            <div id="title_reviseWrite">
                                                <div id="treviseWrite">제목</div>
                                                <input type="text" id="titlereviseWrite" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                            <div id="content_reviseWrite">
                                                <div id="creviseWrite">내용</div>
                                                <input type="text" id="contentreviseWrite" value={content} onChange={(e) => setContent(e.target.value)} />
                                            </div>
                                            <div id="file_reviseWrite">
                                                <div id="freviseWrite">첨부파일</div>
                                                <input type="file" id="filereviseWrite" onChange={(e) => setFile(e.target.files[0])} />
                                                {existingFile && <div><a href={existingFile} download>기존 첨부파일</a></div>}
                                            </div>
                                        </div>
                                        <button id="revise_save" onClick={handleUpdateMaterial}>
                                            <span>저장</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App26;
