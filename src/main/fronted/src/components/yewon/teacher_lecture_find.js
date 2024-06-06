import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TeacherLectureFind() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};

    const [lectureList, setLectureList] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [searchWord, setSearchWord] = useState('');

    function timeSlicingHM(timeString) {
        return timeString.slice(0, 5);
    }

    const handleLectureClick = (lecture) => {
        setSelectedLecture(lecture);
    };

    const handleSearchWordChange = (e) => {
        setSearchWord(e.target.value);
    };

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await
                    axios.get(`/api/teacher/${user.id}/lecture`);
                setLectureList(response.data);
                console.log(response.data)
            } catch (err) {
                alert("에러가 발생했습니다.")
            }
        };

        fetchLectures();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/teacher/${user.id}/lecture/search`, {
                params: { word: searchWord }
            });
            setLectureList(response.data);
        } catch (err) {
            alert("에러");
        }
    };

    const handleStudentManagement = () => {
        if (selectedLecture) {
            navigate('/teacher/lecture/student/manage', { state: { user: user, lecture: selectedLecture } });
        } else {
            alert("강의를 선택해주세요.");
        }
    };

    return (
        <div>
            <h2>강의 학생관리</h2>
            <h2>강의 검색</h2>
            <input
                type="text"
                placeholder="검색어 입력..."
                value={searchWord}
                onChange={handleSearchWordChange}
            />
            <button onClick={handleSearch}>찾기</button>
            <h2>강의 목록</h2>
            <ul>
                {lectureList.map((lecture) => (
                    <li
                        key={lecture.id}
                        onClick={() => handleLectureClick(lecture)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: selectedLecture && selectedLecture.id === lecture.id ? 'pink' : 'white'
                        }}
                    >
                        <span>{lecture.name}</span>
                        <span>{lecture.headCount}/{lecture.maxCount}</span>
                        <ul>
                            {lecture.lectureTimeDTOList.map((time) => (
                                <li key={time.id}>
                                    {time.day} {timeSlicingHM(time.startTime)} ~ {timeSlicingHM(time.endTime)}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <button onClick={handleStudentManagement}>학생 관리</button>
        </div>
    );
}

export default TeacherLectureFind;