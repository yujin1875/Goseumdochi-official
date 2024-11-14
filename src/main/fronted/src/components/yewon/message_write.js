import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './subcss/message_write.css'

function MessageWrite() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;

    const [title, setTitle] = useState(''); // [강의명] + 제목
    const [inputTitle, setInputTitle] = useState(''); // 입력한 제목만 저장
    const [content, setContent] = useState('');
    const [lectureList, setLectureList] = useState([]);
    const [receiverList, setReceiverList] = useState([]);
    const [selectedLectureId, setSelectedLectureId] = useState('');
    //const [selectedLectureName, setSelectedLectureName] = useState('');
    const [selectedReceiverId, setSelectedReceiverId] = useState('');

    // 강의 리스트를 가져오는 함수
    const fetchLectureList = async () => {
        try {
            const response = await axios.get(`/api/${user.role}/${user.id}/lecture/name/list`);
            setLectureList(response.data); // 강의 리스트 업데이트
        } catch (error) {
            console.error("강의 리스트를 가져오는 데 오류가 발생했습니다:", error);
        }
    };

    // 받는사람 리스트를 가져오는 함수
    const fetchReceiverList = async (lectureId) => {
        try {
            const receiverType = (user.role === 'student')? 'teacher' : 'student';
            const response = await axios.get(`/api/lecture/${lectureId}/${receiverType}/name`);
            setReceiverList(response.data); // 받는사람 리스트 업데이트
            console.log(receiverList)
        } catch (error) {
            console.error("받는사람 리스트를 가져오는 데 오류가 발생했습니다:", error);
        }
    };

    // 컴포넌트가 처음 마운트될 때 강의 리스트를 가져옴
    useEffect(() => {
        fetchLectureList();
    }, []);

    // 제목 변경 핸들러 (강의를 여러번 변경해도 제목 유지)
    const changeTitle = (e) => {
        setTitle(e.target.value);
        setInputTitle(e.target.value);
    };

    // 강의 선택 핸들러
    const handleLectureSelect = (event) => {
        const lectureId = event.target.value;
        setSelectedLectureId(lectureId); // 선택된 강의 ID 상태 업데이트
        const lecture = lectureList.find((lec) => lec.id === parseInt(lectureId)); // 선택된 강의
        //setSelectedLectureName((lecture.name)); // 선택된 강의 이름 업데이트
        setTitle('[' + lecture.name + '] ' + inputTitle)

        fetchReceiverList(lectureId); // 받는사람 리스트 업데이트
    };

    // 받는사람 선택 핸들러
    const handleReceiverSelect = (event) => {
        setSelectedReceiverId(event.target.value); // 선택된 강의 ID 상태 업데이트
    };

    // 폼 초기화
    const initialForm = () => {
        // 강의리스트 빼고 초기화
        setTitle('');
        setContent('');
        setReceiverList([]);
        setSelectedLectureId('');
        //setSelectedLectureName('');
        setSelectedReceiverId('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        const messageDTO = {
            title,
            content,
            studentId: user.role === 'student' ? user.id : parseInt(selectedReceiverId), // 학생일 때만 studentId 필요
            teacherId: user.role === 'teacher' ? user.id : parseInt(selectedReceiverId), // 선생님일 때만 teacherId 필요
        };

        console.log(messageDTO);

        try {
            const response = await
                axios.post(`/api/message/${user.role}/send`, messageDTO);

            // 폼 초기화
            initialForm()

            alert(response.data); // 쪽지 전송 성공 메시지
        } catch (error) {
            console.error("쪽지 전송 실패", error);
        }
    };

    const GoMessageList = () => {
        navigate('/message/list', { state: { user: user } });
    };

    return (
        <div id="App">
            <div id="header_message" />
            <div className="container_box">
                <h1>쪽지쓰기</h1>
                <form className="message_write_form" onSubmit={handleSubmit}>
                    <table className="form_table">
                        <tbody>
                        <tr>
                            <td className="form_label">
                                <label>제목</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form_input"
                                    value={title}
                                    onChange={changeTitle}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="form_label">
                                <label>강의</label>
                            </td>
                            <td>
                                <select className="form_select" value={selectedLectureId} onChange={handleLectureSelect}>
                                    <option value="" disabled>선택</option>
                                    {lectureList.map((lecture) => (
                                        <option key={lecture.id} value={lecture.id}>{lecture.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="form_label">
                                <label>받는사람</label>
                            </td>
                            <td>
                                {receiverList && (
                                    <select className="form_select" value={selectedReceiverId} onChange={handleReceiverSelect}>
                                        <option value="" disabled>선택</option>
                                        {receiverList.map((receiver) => (
                                            <option key={receiver.id} value={receiver.id}>{receiver.name}</option>
                                        ))}
                                    </select>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="form_label">
                                <label>내용</label>
                            </td>
                            <td>
                    <textarea
                        className="form_textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="button_container">
                        <button type="button" className="form_button" onClick={GoMessageList}>목록</button>
                        <button type="submit" className="form_button form_button_submit">전송</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MessageWrite;