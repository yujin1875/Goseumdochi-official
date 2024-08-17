import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function DirectorNoticeWrite() {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = location.state || {};

    useEffect(() => {
        // 공지사항 목록을 가져오는 API 호출
        const fetchNotices = async () => {
            try {
                const directorId = sessionStorage.getItem('directorId'); // 세션 스토리지에서 원장 ID를 가져옴
                if (!directorId) {
                    throw new Error('로그인 정보가 없습니다.');
                }

                const response = await axios.get('/api/director/noticeList', {
                    params: { directorId: directorId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 토큰을 헤더에 추가
                    }
                });

                setNotices(response.data);
            } catch (err) {
                setError(err.message || '공지사항 목록을 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = async () => {
        if (!user || !user.id) {
            alert('사용자 정보가 올바르지 않습니다.');
            return;
        }

        const notice = {
            title: title,
            content: content,
            directorId: user.id // 작성자의 ID를 전달
        };

        try {
            const response = await axios.post('/api/director/addNotice', notice, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 토큰을 헤더에 추가
                }
            });

            // 공지사항 추가 후 공지사항 목록을 새로 고침
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('공지사항 추가 중 오류가 발생했습니다');
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/director/deleteNotice/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 토큰을 헤더에 추가
                }
            });
            // 성공적으로 삭제된 경우
            setNotices(notices.filter((notice) => notice.num !== id));
            alert('공지사항이 삭제되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            alert('공지사항 삭제 중 오류가 발생했습니다.');
        }
    };




    const goBackToAdminNotice = () => {
        window.location.href = '/director/main';
    }

    return (
        <div id="App">
            <div id="director_noticewrite_frame">
                <div id="director_noticewrite_header">
                    <a onClick={goBackToAdminNotice}> &lt; </a>
                    <h2>공지사항 등록</h2>
                    <div id="write_btn">
                        <div id="write" onClick={handleSubmit}>등록</div>
                    </div>
                </div>
                <div id="rect" />
                <div id="director_noticewrite_body">
                    <div>
                        <label htmlFor="title">제목:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="content">내용:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                        />
                    </div>
                </div>
                <div id="notice_list">
                    <h3>공지사항 목록</h3>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : notices.length === 0 ? (
                        <p>공지사항이 없습니다.</p>
                    ) : (
                        <ul>
                            {notices.map((notice) => (
                                <li key={notice.num}> {/* 'id' 대신 'num'을 사용하여 고유 키로 설정 */}
                                    <h4>{notice.title}</h4>
                                    <p>{notice.content}</p>
                                    <p><small>{new Date(notice.regdate).toLocaleDateString()}</small></p>
                                    <button onClick={() => handleDelete(notice.num)}>삭제</button> {/* 'id' 대신 'num'을 사용 */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}

export default DirectorNoticeWrite;
