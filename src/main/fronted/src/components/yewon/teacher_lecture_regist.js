import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './subcss/teacher_lecture_regist.css';

function TeacherLectureRegist() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {}; // id, role 전달

    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [lectureName, setLectureName] = useState('');
    const [maxCount, setMaxCount] = useState('');
    const [lectureTimeList, setLectureTimeList] = useState([{ day: '월', startTime: '', endTime: '' }]);

    useEffect(() => {
        const fetchSubjectList = async () => {
            try {
                const response = await axios.get(`/api/subject/findList/academy/${user.academyId}`);
                setSubjectList(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchSubjectList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const lectureDTO = {
                name: lectureName,
                maxCount: parseInt(maxCount, 10),
                subjectId: selectedSubjectId,
                lectureTimeDTOList: lectureTimeList,
            };
            await axios.post(`/api/teacher/${user.id}/lecture/regist`, lectureDTO);
            alert('강의가 성공적으로 등록되었습니다.');
        } catch (error) {
            console.error('강의 등록에 실패했습니다.', error);
        }
    };

    const handleSelect = (event) => {
        setSelectedSubjectId(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleAddLectureTime = () => {
        setLectureTimeList([...lectureTimeList, { day: '월', startTime: '', endTime: '' }]);
    };

    const handleLectureTimeChange = (index, field, value) => {
        const newLectureTimes = [...lectureTimeList];
        newLectureTimes[index][field] = value;
        setLectureTimeList(newLectureTimes);
    };

    const handleRemoveLectureTime = (index) => {
        const newLectureTimeList = lectureTimeList.filter((_, i) => i !== index);
        setLectureTimeList(newLectureTimeList);
    };

    return (
        <div>
            <div id="header_teacher_lecture_regist"/>
            <div id="teacher_lecture_regist_frame">
                <h1>강의 등록</h1>
                <select onChange={handleSelect} value={selectedSubjectId || ''}>
                    <option value="" disabled>과목</option>
                    {subjectList.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                            {subject.name}
                        </option>
                    ))}
                </select>
                {selectedSubjectId && (
                    <div id="teacher_lecture_regist_form">
                        <form onSubmit={handleSubmit}>
                            <div id="header_teacher_lecture_regist_form">
                                <h2>강의 등록</h2>
                                <button type="submit">등록</button>
                            </div>
                            <div id="LectureName_teacher_lecture_regist_form">
                                <label>
                                    강의 이름 :
                                    <input
                                        type="text"
                                        value={lectureName}
                                        onChange={(e) => setLectureName(e.target.value)}
                                        required />
                                </label>
                            </div>
                            <div id="LecturePeople_teacher_lecture_regist_form">
                                <label>
                                    최대 인원수:
                                    <input
                                        type="text"
                                        value={maxCount}
                                        onChange={(e) => setMaxCount(e.target.value)}
                                        list="maxCountOptions"
                                        required
                                    />
                                    <datalist id="maxCountOptions">
                                        <option value="10"></option>
                                        <option value="20"></option>
                                        <option value="30"></option>
                                        <option value="40"></option>
                                        <option value="50"></option>
                                        <option value="60"></option>
                                        <option value="70"></option>
                                        <option value="80"></option>
                                        <option value="90"></option>
                                        <option value="100"></option>
                                    </datalist>
                                </label>
                            </div>
                            <div id="LectureTime_teacher_lecture_regist_form">
                                <h3>강의 시간</h3>
                                {lectureTimeList.map((lectureTime, index) => (
                                    <div id="LectureTimeLine_teacher_lecture_regist_form" key={index}>
                                        <label>
                                            요일 :
                                            <select value={lectureTime.day} onChange={(e) => handleLectureTimeChange(index, 'day', e.target.value)} required>
                                                <option value="월">월</option>
                                                <option value="화">화</option>
                                                <option value="수">수</option>
                                                <option value="목">목</option>
                                                <option value="금">금</option>
                                                <option value="토">토</option>
                                                <option value="일">일</option>
                                            </select>
                                        </label>
                                        <label>
                                            시작 시간 :
                                            <input type="time"
                                                   id="start_time"
                                                   value={lectureTime.startTime}
                                                   onChange={(e) => handleLectureTimeChange(index, 'startTime', e.target.value)}
                                                   required
                                            />
                                        </label>
                                        <label>
                                            ~  종료 시간 :
                                            <input
                                                type="time"
                                                value={lectureTime.endTime}
                                                onChange={(e) => handleLectureTimeChange(index, 'endTime', e.target.value)}
                                                required
                                            />
                                        </label>
                                        <button type="button" onClick={() => handleRemoveLectureTime(index)}>
                                            삭제
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddLectureTime}>강의 시간 추가</button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
            <div id="footer_teacher_lecture_regist"/>
        </div>
    );

}

export default TeacherLectureRegist;