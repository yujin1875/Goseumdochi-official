import axios from 'axios';
import React, { useState } from 'react';

function VideoUploadTest() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'video/mp4') {
            alert('MP4 파일만 업로드 가능합니다.');
            setFile(null);
            return;
        }
        setFile(selectedFile);
    };

    const uploadFile = () => {
        if (!file) {
            alert('파일을 선택하시오');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('/api/video/videoUpload', formData)
            .then(response => {
                alert('업로드 성공');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('업로드 실패');
            });
    };

    return (
        <div>
            <h1>동영상 업로드 테스트</h1>
            <input type="file" accept="video/mp4" onChange={handleFileChange} />
            <button onClick={uploadFile}>업로드</button>
        </div>
    );
}

export default VideoUploadTest;
