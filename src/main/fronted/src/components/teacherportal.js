import '../css/teacherportal.css';
import logo from './images/goseumdochi.png';
import React, { useState } from 'react';
import axios from 'axios';

function App26() {
    const [visibleDiv, setVisibleDiv] = useState('Home');
    const [visiblesubDiv, setVisiblesubDiv] = useState('List');

    const showDivHome = () => {
        setVisibleDiv('Home');
    };

    const showDivLecturedata = () => {
        setVisibleDiv('Lecturedata');
        setVisiblesubDiv('List');
    };

    const showsubDivList = () => {
        setVisiblesubDiv('List');
    };

    const showsubDivView= () => {
        setVisiblesubDiv('View');
    };

    const showsubDivWrite = () => {
        setVisiblesubDiv('Write');
    };

return (
        <div id="App">
            <div id="menu_teacherportal">
                <div id="teacher_info">
                    <img src={logo}/>
                    <h2>고슴도치</h2>
                </div>
                <ul>
                    <li onClick={showDivHome}><a>교과정보</a></li>
                    <li><a>강의관리</a></li>
                    <li onClick={showDivLecturedata}><a>수업자료</a></li>
                    <li><a>과제조회/제출</a></li>
                    <li><a>평가관리</a></li>
                    <li><a>시험관리</a></li>
                    <li><a>과목공지</a></li>
                    <li><a>강의실 나가기</a></li>
                </ul>
            </div>
            <div id="teacherportal_header">
                <div id="menu_btn"/>
                <div id="home_btn"/>
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
                {visibleDiv === 'Lecturedata' && (
                  <>
                    <div id="Lecturedata_teacherportal">
                        <h2>수업자료실</h2>
                        <div id="Lecturedata">
                            {visiblesubDiv === 'List' && (
                              <>
                                <div id="List_teacherportal">
                                    <div id="List">

                                    </div>
                                    <button id="newRegister" onClick={showsubDivWrite}>
                                        <span>새로 등록하기</span>
                                    </button>
                                </div>
                              </>
                            )}
                            {visiblesubDiv === 'View' && (
                              <>
                                <div id="View_teacherportal">
                                    <div id="View">

                                    </div>
                                    <button id="newRegister" onClick={showsubDivWrite}>
                                        <span>수정</span>
                                    </button>
                                </div>
                              </>
                            )}
                            {visiblesubDiv === 'Write' && (
                              <>
                                <div id="Write_teacherportal">
                                    <div id="write">
                                    </div>
                                    <button id="save" onClick={showsubDivList}>
                                        <span>저장</span>
                                    </button>
                                </div>
                              </>
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