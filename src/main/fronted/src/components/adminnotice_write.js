import '../css/adminnotice_write.css';
import logo from './images/goseumdochi.png';
import { useState } from 'react';

function App20() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = async () => {
        const notice = {
            title: title,
            content: content,
        };

        try {
            const response = await fetch('/api/admin/addNotice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notice),
            });

            if (response.ok) {
                window.location.href = '/adminnotice';
            } else {
                alert('공지사항 추가에 실패했습니다');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('공지사항 추가 중 오류가 발생했습니다');
        }
    }

    const goBackToAdminNotice = () => {
        window.location.href = '/adminnotice';
    }

    return (
        <div id="App">
            <div id="adminnoticewrite_frame">
                <div id="adminnoticewrite_header">
                    <a onClick={goBackToAdminNotice}> &lt; </a>
                    <h2>공지사항 등록</h2>
                    <div id="write_btn">
                        <div id="write" onClick={handleSubmit}>등록</div>
                    </div>
                </div>
                <div id="rect"/>
                <div id="adminnoticewrite_body">
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
            </div>
        </div>
    );
}

export default App20;
