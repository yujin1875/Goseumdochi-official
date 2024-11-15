import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/director_notice_write.css';

function DirectorNoticeWrite() {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingNotice, setEditingNotice] = useState(null);
    const [selectedNotice, setSelectedNotice] = useState(null);  // 선택된 공지사항
    const { user } = location.state || {};

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const directorId = sessionStorage.getItem('directorId');
                if (!directorId) {
                    throw new Error('로그인 정보가 없습니다.');
                }

                const response = await axios.get('/api/director/noticeList', {
                    params: { directorId: directorId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                const sortedNotices = response.data.sort((a, b) => {
                    const dateA = new Date(a.regdate);
                    const dateB = new Date(b.regdate);
                    return dateB - dateA;
                });

                setNotices(sortedNotices);
            } catch (err) {
                setError(err.message || '공지사항 목록을 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);

    const handleSubmit = async () => {
        if (!user || !user.id) {
            alert('사용자 정보가 올바르지 않습니다.');
            return;
        }

        const notice = {
            title: title,
            content: content,
            directorId: user.id
        };

        try {
            if (editingNotice) {
                await axios.put(`/api/director/updateNotice/${editingNotice.num}`, notice, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                });
                alert('공지사항이 수정되었습니다.');
            } else {
                await axios.post('/api/director/addNotice', notice, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                });
                alert('공지사항이 추가되었습니다.');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('공지사항 처리 중 오류가 발생했습니다');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/director/deleteNotice/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            setNotices(notices.filter((notice) => notice.num !== id));
            alert('공지사항이 삭제되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            alert('공지사항 삭제 중 오류가 발생했습니다.');
        }
    };

    const handleEdit = (notice) => {
        setTitle(notice.title);
        setContent(notice.content);
        setEditingNotice(notice);
    };

    const goBackToAdminNotice = () => window.location.href = '/director/main';

    const openModal = (notice) => {
        setSelectedNotice(notice); // 선택된 공지사항 설정
    };

    const closeModal = () => {
        setSelectedNotice(null); // 모달 닫기
    };

    return (
        <div id="App_dn">
            <div id="director_noticewrite_frame">
                <div id="director_noticewrite_header">
                    <a id="back_button" onClick={goBackToAdminNotice}> &lt; </a>
                    <h2 id="header_title">{editingNotice ? '공지사항 수정' : '공지사항 등록'}</h2>
                    <div id="write_btn">
                        <div id="write" onClick={handleSubmit}>{editingNotice ? '수정' : '등록'}</div>
                    </div>
                </div>
                <div id="rect" />
                <div id="director_noticewrite_body">
                    <div id="title_section">
                        <label htmlFor="title">제목:</label>
                        <input type="text" id="title_director_noticewrite" value={title} onChange={handleTitleChange} />
                    </div>
                    <div id="content_section">
                        <label htmlFor="content">내용:</label>
                        <textarea id="content" value={content} onChange={handleContentChange} />
                    </div>
                </div>
                <div id="notice_list">
                    <h3 id="notice_list_header">공지사항 목록</h3>
                    {loading ? (
                        <p id="loading_message">로딩 중...</p>
                    ) : error ? (
                        <p id="error_message">{error}</p>
                    ) : notices.length === 0 ? (
                        <p id="no_notices_message">공지사항이 없습니다.</p>
                    ) : (
                        <ul id="notice_items">
                            {notices.map((notice) => (
                                <li id={`notice_${notice.num}`} key={notice.num}>
                                    <h4 className="notice_title" onClick={() => openModal(notice)}>{notice.title}</h4>
                                    <p className="notice_content">{notice.content}</p>
                                    <p className="notice_date">
                                        <small>{new Date(notice.regdate).toLocaleDateString()}</small>
                                    </p>
                                    <button className="edit_button" onClick={() => handleEdit(notice)}>수정</button>
                                    <button className="delete_button" onClick={() => handleDelete(notice.num)}>삭제</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* 모달 창 */}
            {selectedNotice && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>{selectedNotice.title}</h3>
                        <p>{selectedNotice.content}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DirectorNoticeWrite;
