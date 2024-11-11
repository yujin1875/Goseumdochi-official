import './subcss/director_main.css';
import logo from '../images/goseumdochi.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GiOpenBook } from "react-icons/gi";
import { RiNotification3Fill } from "react-icons/ri";
import { FaAddressBook, FaChalkboardTeacher } from "react-icons/fa";

function DirectorMain() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {}; // id, role 전달

    const GoSubjectManage=()=>{
        navigate('/director/subject/manage', { state: { user: user } })
    }

    const GoTeacherManage=()=>{
        navigate('/director/teacher/manage', { state: { user: user } })
    }

    const GoStudentManage=()=>{
        navigate('/director/student/manage', { state: { user: user } })
    }

    const GoNoticeWrite=()=>{
        console.log(user);
        navigate('/director_notice_write', { state: { user: user } })
    }

    return (
        <div id="App">
            <div id="header_director_main">
                <img src={logo} alt="Logo"/>
            </div>
            <div id="director_main_info">
                <div id="info">

                </div>
            </div>
            <div id="button_director_main">
                <div id="btn_director_main">
                    <div id="lecture_btn">
                        <button onClick={GoSubjectManage}>
                            <GiOpenBook className="img_directorMain" size={100} /> <br/>
                            과목 관리
                        </button>
                    </div>
                    <div id="studentmanage_btn">
                        <button onClick={GoTeacherManage}>
                            <FaChalkboardTeacher className="img_directorMain" size={100} /> <br/>
                            선생 관리
                        </button>
                    </div>
                    <div id="mypage_btn">
                        <button onClick={GoStudentManage}>
                            <FaAddressBook className="img_directorMain" size={100} /> <br/>
                            학생 관리
                        </button>
                    </div>
                    <div id="notice_write_btn">
                        <button onClick={GoNoticeWrite}>
                            <RiNotification3Fill className="img_directorMain" size={100} /> <br/>
                            공지사항
                        </button>
                    </div>
                </div>
            </div>
            <div id="footer_director_main">
                <button id="logout">
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default DirectorMain;