import React, { useState, useEffect } from 'react';
import '../css/lectureportal.css';
import logo from './images/goseumdochi.png';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

import LectureMaterialPaging from "./yewon/lecture_material_paging"; // 강의자료페이징 컴포넌트
import LectureAssignmentPaging from "./yewon/lecture_assignment_paging"; // 과제페이징 컴포넌트

function App10() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, lecture } = location.state;

    // 선택한 메뉴 (공지사항, 강의자료, 온라인영상, 과제, 시험)
    const [menu, setMenu] = useState('notice');

    const Gomain = () => {
        window.location.href = '/main';
    }

    const Gonotice = () => {
        window.location.href = '/notice';
    }

    const Gomypage = () => {
        window.location.href = '/mypage';
    }

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

    // 메뉴 변경 함수 (동일한 메뉴를 눌렀을 때 다시 렌더링(새로고침)하기 위해)
    const handleMenuChange = (newMenu) => {
        if (menu === newMenu) {
            setMenu(""); // 먼저 빈 값으로 리셋
            setTimeout(() => setMenu(newMenu), 0); // 0ms 지연 후 다시 설정
        } else {
            setMenu(newMenu);
        }
    };

    // 온라인 강의 버튼 클릭 시 강의 목록 표시
    const GoOnlineLecture = () => {
        setMenu("online_lecture");
        setShowOnlineLectures(true);
        setSelectedVideo(null); // 클릭 시 선택된 강의 초기화
    };

    // 강의 제목 클릭 시 선택된 영상 설정
    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };
    // 인강 끝

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
                                <li><a onClick={() => handleMenuChange("notice")}>공지사항</a></li>
                                <li><a onClick={() => handleMenuChange("material")}>강의자료</a></li>
                                <li><a onClick={GoOnlineLecture}>온라인강의</a></li>
                                <li><a onClick={() => handleMenuChange("assignment")}>과제</a></li>
                                <li><a onClick={() => handleMenuChange("exam")}>시험</a></li>
                            </ul>
                        </div>
                        <div id="contents_aboutNotice_lectureportal">
                            {/* 공지사항 */}
                            {menu === "notice" && (
                                <div id="category_contents_lectureportal">
                                    <div id="num">번호</div>
                                    <div id="title">제목</div>
                                    <div id="postperson">게시자</div>
                                    <div id="postdate">게시일</div>
                                    <div id="visit">조회수</div>
                                </div>
                            )}

                            {/* 강의자료 */}
                            {menu === "material" && (
                                <div>
                                    {/* props로 user와 lecture 전달 */}
                                    <LectureMaterialPaging user={user} lecture={lecture} />
                                </div>
                            )}

                            {/* 온라인강의 */}
                            {menu === "online_lecture" && ( // 온라인 강의 클릭 시에만 목록 표시, 선택된 강의 없을 때
                                <div id="body_contents_lectureportal">
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
                                    </>
                                </div>
                            )}

                            {/* 과제 */}
                            {menu === "assignment" && (
                                <div>
                                    <LectureAssignmentPaging user={user} lecture={lecture} />
                                </div>
                            )}

                            {/* 시험 */}
                            {menu === "exam" && (
                                <div>

                                </div>
                            )}
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
