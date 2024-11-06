import React, { useState, useEffect } from 'react';
import '../css/lectureportal.css';
import logo from './images/goseumdochi.png';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function App10() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, lecture } = location.state;

    const Gomain = () => {
        window.location.href = '/main';
    }

    const Gonotice = () => {
        window.location.href = '/notice';
    }

    const Gomypage = () => {
        window.location.href = '/mypage';
    }

    const GoLectureMaterial = () => {
        navigate('/lecture/material/paging', { state: { user: user, lecture: lecture } });
    };

    const GoLectureAssignment = () => {
        navigate('/lecture/assignment/paging', { state: { user: user, lecture: lecture } });
    };

    // 인강 시작
    const [videoList, setVideoList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 강의 영상 상태
    const [showOnlineLectures, setShowOnlineLectures] = useState(false); // 온라인 강의 클릭 여부 상태

    const fetchVideoList = async (lectureId) => {
        try {
            const response = await axios.get(`/api/video/student/videoList/${lectureId}`);
            setVideoList(response.data);
        } catch (error) {
            console.error('Error fetching video list:', error);
        }
    };

    useEffect(() => {
        if (lecture && user && user.id && showOnlineLectures) { // 클릭되었을 때만 강의 목록 가져오기
            fetchVideoList(lecture.id);
        }
    }, [lecture, user, showOnlineLectures]);

    // 온라인 강의 버튼 클릭 시 강의 목록 표시
    const GoOnlineLecture = () => {
        setShowOnlineLectures(true);
        setSelectedVideo(null); // 클릭 시 선택된 강의 초기화
    };

    // 강의 제목 클릭 시 선택된 영상 설정
    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };
    // 인강 끝

    // 시험 관련 상태 및 함수 추가
    const [examList, setExamList] = useState([]);
    const [showExams, setShowExams] = useState(false); // 시험 클릭 여부 상태

    const fetchExamList = async (lectureId) => {
        try {
            const response = await axios.get(`/api/student/exams/${lectureId}`);
            setExamList(response.data);
        } catch (error) {
            console.error('Error fetching exam list:', error);
        }
    };

// 시험 버튼 클릭 시 시험 목록 표시
    const GoExam = () => {
        setShowExams(true);
        setShowOnlineLectures(false); // 온라인 강의 초기화
        setSelectedVideo(null); // 선택된 강의 초기화
        fetchExamList(lecture.id);
    };


    return (
        <div id="App">
            <div id="lectureportal-menu">
                <div id="header_lectureportal">
                    <img src={logo} onClick={Gomain} alt="logo" />
                    <div id="user_info"></div>
                </div>
                <div id="buttons_lectureportal">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice} />
                    <input type="submit" value="커뮤니티" id="community_btn" />
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage} />
                    <div id="rect" />
                </div>
                <div id="contents_lectureportal">
                    <div id="aboutNotice_lectureportal">
                        <div id="category_aboutNotice_lectureportal">
                            <ul>
                                <li><a>공지사항</a></li>
                                <li><a onClick={GoLectureMaterial}>강의자료</a></li>
                                <li><a onClick={GoOnlineLecture}>온라인강의</a></li>
                                <li><a onClick={GoLectureAssignment}>과제</a></li>
                                <li><a onClick={GoExam}>시험</a></li>
                            </ul>
                        </div>
                        <div id="contents_aboutNotice_lectureportal">
                            <div id="category_contents_lectureportal">
                                <div id="num">
                                    번호
                                </div>
                                <div id="title">
                                    제목
                                </div>
                                <div id="postperson">
                                    게시자
                                </div>
                                <div id="postdate">
                                    게시일
                                </div>
                                <div id="visit">
                                    조회수
                                </div>
                            </div>
                            <div id="body_contents_lectureportal">
                                {showOnlineLectures && !selectedVideo && ( // 온라인 강의 클릭 시에만 목록 표시, 선택된 강의 없을 때
                                    <>
                                        <h2>온라인 강의 목록</h2>
                                        {videoList.length === 0 ? (
                                            <p>강의가 없습니다.</p>
                                        ) : (
                                            <ul>
                                                {videoList.map((video, index) => (
                                                    <li key={index}>
                                                        <p
                                                          style={{ cursor: 'pointer', color: 'blue' }}
                                                          onClick={() => handleVideoSelect(video)}
                                                        >
                                                            {video.title}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                                {selectedVideo && ( // 선택된 강의가 있을 때 해당 영상만 표시
                                    <>
                                        <h2>{selectedVideo.title}</h2>
                                        <video width="640" height="360" controls>
                                            <source src={selectedVideo.videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <button onClick={() => setSelectedVideo(null)}>뒤로 가기</button>
                                    </>
                                )}
                                {showExams && (
                                    <>
                                        <h2>시험 목록</h2>
                                        <div id="exam_list">
                                            <div className="exam_header">
                                                <div>No</div>
                                                <div>제목</div>
                                                <div>시험 방식</div>
                                                <div>공개일</div>
                                                <div>응시기간</div>
                                                <div>시험 시간</div>
                                                <div>배점</div>
                                                <div>점수</div>
                                                <div>시험 시작</div>
                                            </div>
                                            {examList.length === 0 ? (
                                                <p>시험이 없습니다.</p>
                                            ) : (
                                                examList.map((exam, index) => (
                                                    <div className="exam_row" key={index}>
                                                        <div>{index + 1}</div>
                                                        <div>{exam.title}</div>
                                                        <div>{exam.examMethod}</div>
                                                        <div>{exam.openDate}</div>
                                                        <div>{exam.examPeriodStart} ~ {exam.examPeriodEnd}</div>
                                                        <div>{exam.duration}분</div>
                                                        <div>{exam.points}</div>
                                                        <div>{exam.score ?? "점수 미등록"}</div>
                                                        <div>
                                                            <button onClick={() => navigate(`/exam/start/${exam.id}`, { state: { user: user, lecture: lecture } })}>
                                                                시작
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer_lectureportal">
                    <a>문의 | midas2024.ver01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default App10;
