import axios from 'axios';
import React, { useState } from 'react';

function VideoUploadTest() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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
            <h1>동영상 업로드 테스트o</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
}

export default VideoUploadTest;
