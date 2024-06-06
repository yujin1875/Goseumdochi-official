import '../css/adminnotice.css';
import logo from './images/goseumdochi.png';
import { useState, useEffect } from 'react';

function App19() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('/api/admin/noticeList', {
                    method: 'GET',
                    credentials: 'include', // 세션 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json();
                    setNotices(data);
                } else {
                    console.error('Failed to fetch notices');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchNotices();
    }, []);

    const deleteNotice = async (id) => {
        if (!id) {
            console.error('No ID provided for delete');
            return;
        }

        try {
            const response = await fetch(`/api/admin/deleteNotice/${id}`, {
                method: 'DELETE',
                credentials: 'include', // 세션 쿠키를 포함하여 요청
            });

            if (response.ok) {
                setNotices(notices.filter(notice => notice.id !== id));
            } else {
                console.error('Failed to delete notice');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const goBackToAdminMain = () => {
        window.location.href = '/adminmain';
    }

    const goToAdminNoticeWrite = () => {
        window.location.href = '/adminnoticewrite';
    }

    return (
        <div id="App">
            <div id="adminnotice_frame">
                <div id="adminnotice_header">
                    <a onClick={goBackToAdminMain}> &lt; </a>
                    <h2>전체 공지사항</h2>
                    <div id="write_btn">
                        <div id="write" onClick={goToAdminNoticeWrite}>글쓰기</div>
                    </div>
                </div>
                <div id="rect"/>
                <div id="adminnotice_body">
                    <table id="adminnotice_table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>게시자</th>
                                <th>게시일</th>
                                <th>글 삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map(notice => (
                                <tr key={notice.id}>
                                    <td>{notice.num}</td>
                                    <td>{notice.title}</td>
                                    <td>{notice.writer}</td>
                                    <td>{new Date(notice.regdate).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => deleteNotice(notice.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App19;
