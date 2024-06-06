import '../css/teacherportal.css';
import logo from './images/goseumdochi.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App26() {
    const [visibleDiv, setVisibleDiv] = useState('Home');
    const [visiblesubDiv, setVisiblesubDiv] = useState('List');
    const [materials, setMaterials] = useState([]);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (visibleDiv === 'Lecturedata' && visiblesubDiv === 'List') {
            fetchMaterials();
        }
    }, [visibleDiv, visiblesubDiv]);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get('/api/teacher/lecture-material/list');
            setMaterials(response.data);
        } catch (error) {
            console.error("There was an error fetching the materials!", error);
        }
    };

    const handleMaterialClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/lecture-material/${id}`);
            setCurrentMaterial(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            showsubDivView();
        } catch (error) {
            console.error("There was an error fetching the material!", error);
        }
    };

    const handleUpdateMaterial = async () => {
        const formData = new FormData();
        formData.append('material', new Blob([JSON.stringify({ title, content })], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }
        try {
            await axios.put(`/api/teacher/lecture-material/${currentMaterial.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showsubDivList();
            fetchMaterials();
        } catch (error) {
            console.error("There was an error updating the material!", error);
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

    const showDivHome = () => {
        setVisibleDiv('Home');
    };

    const showDivAssignment = () => {
        setVisibleDiv('Assignment');
    };
    const showDivAssignmentadd = () => {
        setVisibleDiv('Assignmentadd');
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
                                <button id="add_btn" onClick={showDivAssignmentadd}>
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
                                <div id="rect" />
                                <div id="body_Assignment">
                                    <div id="Ano">번호</div>
                                    <div id="Atitle">제목</div>
                                    <div id="Asubmission">제출인원</div>
                                    <div id="Ascore">배점</div>
                                    <div id="Aestimation">평가</div>
                                    <div id="Aopendate">공개일</div>
                                    <div id="Aclosedate">마감일</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'Assignmentadd' && (
                    <>
                        <div id="Assignmentadd_teacherportal">

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
                                        <button id="save" onClick={handleUpdateMaterial}>
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
