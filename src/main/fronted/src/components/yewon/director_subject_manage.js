import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './subcss/director_subject_manage.css';

function DirectorSubjectManage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [inputSubjectName, setInputSubjectName] = useState('');
    const [subjectList, setSubjectList] = useState([]);

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [currentSubjectId, setCurrentSubjectId] = useState(null);
    const [newSubjectName, setNewSubjectName] = useState("");

    useEffect(() => {
        // 등록된 과목 리스트
        const fetchSubjectList = async () => {
            try {
                const response = await axios.get(`/api/subject/findList/academy/${user.academyId}`);
                setSubjectList(response.data);
            } catch (error) {
                console.error(error);
            }
            console.log(subjectList)
        };

        fetchSubjectList();
    }, []);

    // 과목 등록
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        try {
            const response = await axios.post(`/api/subject/regist/academy/${user.academyId}`, null, {
                params: {
                    inputSubjectName: inputSubjectName,
                },
            });

            setInputSubjectName(''); // 입력 필드 초기화
            console.log(response);

            const newSubject = response.data; // 서버에서 반환된 새로운 과목 데이터
            // 기존 과목 리스트에 새로 등록된 과목 추가
            setSubjectList((prevSubjectList) => [...prevSubjectList, newSubject]);
        } catch (error) {
            if (error.response) {
                // 서버에서 정의된 에러 메시지 사용
                alert(error.response.data)
            } else {
                // 기타 네트워크 에러 처리
                alert("기타 에러")
            }
        }
    };

    // 수정 팝업 열기
    const openEditPopup = (subjectId, currentName) => {
        setCurrentSubjectId(subjectId);
        setNewSubjectName(currentName);
        setIsEditPopupOpen(true);
    };

    // 수정 요청 핸들러
    const handleEditSubmit = async () => {
        try {
            const response = await axios.post(`/api/subject/${currentSubjectId}/update`, null, {
                params: { inputSubjectName: newSubjectName },
            });

            if (response.status === 200) {
                alert(response.data);

                // 수정된 과목 이름으로 리스트 업데이트
                setSubjectList(
                    subjectList.map((subject) =>
                        subject.id === currentSubjectId ? { ...subject, name: newSubjectName } : subject
                    )
                );

                setIsEditPopupOpen(false);
            }
        } catch (error) {
            alert("과목 수정 실패: " + error.response?.data || error.message);
        }
    };

    // 과목 삭제
    const handleDelete = async (subjectId) => {
        try {
            const response = await axios.post(`/api/subject/delete/subject/${subjectId}`);

            if (response.status === 200) {
                alert(response.data);
                // 과목 삭제 후 UI 업데이트
                setSubjectList(subjectList.filter(subject => subject.id !== subjectId));
            }
        } catch (error) {
            alert("과목 삭제 실패: " + error.response?.data || error.message);
        }
    };

    // const GoSubjectAdd=()=>{
    //     navigate('/director/subject/regist', { state: { user: user } })
    // }

    return (
        <div id="App">
            <div id="director_subject_manage_header"/>
            <div id="director_subject_manage_frame">
                <h1>과목 관리</h1>
                <div id="contents_director_subject_manage">
                    <form id="director_subject_manageForm" onSubmit={handleSubmit}>
                        <div id="director_subject_write">
                            <span>과목 등록</span>
                            <input
                                type="text"
                                value={inputSubjectName}
                                onChange={(e) => setInputSubjectName(e.target.value)}
                            />
                            <button type="submit">등록</button>
                        </div>
                    </form>
                    <div id="director_showing_subject_manage">
                        {subjectList.length !== 0 ? (
                            subjectList.map((subject) => (
                                <div key={subject.id} id="info_subject1">
                                    <div id="info_subject1_name">
                                        <span>{subject.name}</span>
                                    </div>
                                    <button id="EditSubject" onClick={() => openEditPopup(subject.id, subject.name)}>
                                        <span>수정</span>
                                    </button>
                                    <button id="DeleteSubject" onClick={() => handleDelete(subject.id)}>
                                        <span>삭제</span>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>등록된 과목이 없습니다.</div>
                        )}

                        {/* 수정 팝업 */}
                        {isEditPopupOpen && (
                            <div id="editPopup">
                                <h3>과목 이름 수정</h3>
                                <input
                                    type="text"
                                    value={newSubjectName}
                                    onChange={(e) => setNewSubjectName(e.target.value)}
                                />
                                <button onClick={handleEditSubmit}>확인</button>
                                <button onClick={() => setIsEditPopupOpen(false)}>취소</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div id="director_subject_manage_footer"/>
        </div>
    );
}

export default DirectorSubjectManage;