import React, {useState, useEffect} from 'react';
import '../css/lectureportal.css';
import logo from './images/goseumdochi.png';
import {useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';

import LectureMaterialPaging from "./yewon/lecture_material_paging"; // 강의자료페이징 컴포넌트
import LectureAssignmentPaging from "./yewon/lecture_assignment_paging"; // 과제페이징 컴포넌트

function App10() {
    const location = useLocation();
    const navigate = useNavigate();

    const {user, lecture} = location.state;

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
    const [captions, setCaptions] = useState([]); // 자막 상태를 배열로 변경
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
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
        generateCaption(video.videoUrl); // 동영상 URL로 자막 생성 요청
    };

    // 자막 생성 요청
    const generateCaption = async (videoUrl) => {
        setIsLoading(true); // 로딩 시작
        console.log(videoUrl);
        try {
            const response = await axios.post('/api/video/generateCaption', {video_url: videoUrl});
            setCaptions(prevCaptions => [...prevCaptions, response.data.caption]); // 응답에서 자막 추가
        } catch (error) {
            console.error('Error generating caption:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    // 시험 관련 상태 및 함수 추가
    const [examList, setExamList] = useState([]);
    const [showExams, setShowExams] = useState(false); // 시험 클릭 여부 상태

    const fetchExamList = async (lectureId) => {
        try {
            const response = await axios.get(`/api/student/exams/${lectureId}`);
            console.log("Fetched exam data:", response.data); // 응답 데이터 확인

            const exams = await Promise.all(response.data.map(async (exam) => {
                if (exam.scorePublished === true || exam.scorePublished === 1) { // 점수 공개 여부가 true 또는 1일 때
                    const scoreResponse = await axios.get(`/api/student/exams/${exam.id}/answers/${user.id}`);
                    const totalScore = scoreResponse.data.reduce((sum, answer) => sum + (answer.score || 0), 0); // 모든 점수 합산
                    return { ...exam, totalScore: totalScore };
                }
                return { ...exam, totalScore: "비공개" };
            }));

            console.log("Processed exams:", exams); // 콘솔에 처리된 시험 데이터 출력
            setExamList(exams);
        } catch (error) {
            console.error('Error fetching exam list:', error);
        }
    };


// 시험 버튼 클릭 시 시험 목록 표시
    const GoExam = () => {
        setMenu("exam");
        setShowOnlineLectures(false); // 온라인 강의 초기화
        setSelectedVideo(null); // 선택된 강의 초기화
        fetchExamList(lecture.id);
    };

    // 공지사항
    const [noticeList, setNoticeList] = useState([]);

    const fetchNoticeList = async (lectureId) => {
        try {
            const response = await axios.get(`/api/subjectnotice/lecture/${lectureId}`);
            setNoticeList(response.data);
        } catch (error) {
            console.error('Error fetching notice list:', error);
        }
    };

    useEffect(() => {
        if (menu === 'notice' && lecture && lecture.id) {
            fetchNoticeList(lecture.id);
        }
    }, [menu, lecture]);

    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice); // 클릭한 공지사항의 데이터 설정
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`; // 원하는 형식: YYYY-MM-DD HH:mm
    };


    return (
        <div id="App">
            <div id="lectureportal-menu">
                <div id="header_lectureportal">
                    <img src={logo} onClick={Gomain} alt="logo"/>
                    <div id="user_info"></div>
                </div>
                <div id="buttons_lectureportal">
                    <input type="submit" value="공지사항" id="notice_btn" onClick={Gonotice}/>
                    <input type="submit" value="커뮤니티" id="community_btn"/>
                    <input type="submit" value="마이페이지" id="mypage_btn" onClick={Gomypage}/>
                    <div id="rect"/>
                </div>
                <div id="contents_lectureportal">
                    <div id="aboutNotice_lectureportal">
                        <div id="category_aboutNotice_lectureportal">
                            <ul>
                                <li><a onClick={() => handleMenuChange("notice")}>공지사항</a></li>
                                <li><a onClick={() => handleMenuChange("material")}>강의자료</a></li>
                                <li><a onClick={GoOnlineLecture}>온라인강의</a></li>
                                <li><a onClick={() => handleMenuChange("assignment")}>과제</a></li>
                                <li><a onClick={GoExam}>시험</a></li>
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

                                    {noticeList.length === 0 ? (
                                        <p>공지사항이 없습니다.</p>
                                    ) : (
                                        noticeList.map((notice, index) => (
                                            <div key={index} className="notice_row">
                                                <div>{index + 1}</div>
                                                <div>
                                                    <p
                                                        style={{ cursor: 'pointer', color: 'blue' }}
                                                        onClick={() => handleNoticeClick(notice)} // 제목 클릭 시 상세보기
                                                    >
                                                        {notice.title}
                                                    </p>
                                                </div>
                                                <div>{notice.author}</div>
                                                <div>{notice.postDate}</div>
                                                <div>{notice.views}</div>
                                            </div>
                                        ))
                                    )}

                                    {/* 선택된 공지사항 상세보기 */}
                                    {selectedNotice && (
                                        <div id="notice_detail">
                                            <h3>{selectedNotice.title}</h3>
                                            <p><strong>작성자:</strong> {selectedNotice.author}</p>
                                            <p><strong>게시일:</strong> {selectedNotice.createdAt && formatDateTime(selectedNotice.createdAt)}</p>
                                            <p><strong>내용:</strong> {selectedNotice.content}</p> {/* 공지사항 내용 */}
                                            <button onClick={() => setSelectedNotice(null)}>닫기</button>
                                        </div>
                                    )}
                                </div>
                            )}



                            {/* 강의자료 */}
                            {menu === "material" && (
                                <div>
                                    {/* props로 user와 lecture 전달 */}
                                    <LectureMaterialPaging user={user} lecture={lecture}/>
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
                                                        <div>
                                                            {(exam.scorePublished === true || exam.scorePublished === 1) && exam.totalScore !== "비공개" ? (
                                                                exam.totalScore !== null ? exam.totalScore : "점수 미등록"
                                                            ) : "비공개"}
                                                        </div>
                                                        <div>
                                                            <button
                                                                onClick={() => navigate(`/exam/start/${exam.id}`, {
                                                                    state: {
                                                                        user: user,
                                                                        lecture: lecture
                                                                    }
                                                                })}>
                                                                시작
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </>

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
