import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function DirectorSubjectRegist() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {}; // id, role 전달

    const [inputSubjectName, setInputSubjectName] = useState('');
    const [subjectList, setSubjectList] = useState([]);

    useEffect(() => {
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

    return (
        <div>
            <div>
                <h1>과목 등록</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>과목 이름:</label>
                        <input
                            type="text"
                            value={inputSubjectName}
                            onChange={(e) => setInputSubjectName(e.target.value)}
                        />
                    </div>
                    <button type="submit">등록</button>
                </form>
            </div>
            <div>
                <h1>등록된 과목 리스트</h1>
                {(subjectList.length === 0)? (<div>등록된 과목이 없습니다.</div>)
                    : (subjectList.map(subject => (
                    <li key={subject.id}>{subject.name}</li>
                )))}
            </div>
        </div>
    );
}

export default DirectorSubjectRegist;