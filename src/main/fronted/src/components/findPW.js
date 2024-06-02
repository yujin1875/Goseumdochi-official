import '../css/findPW.css';
import React, { useState } from 'react';
import axios from 'axios';

function App9() {
    const [inputs, setInputs] = useState({
        studentId: '',
        studentName:'',
        studentPhoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", inputs);
        try {
            const response = await axios.post('/api/student/findStudentPassword', inputs);
            console.log('Form Submit success:', response.data);
            window.location.href='/login';
        } catch (error) {
            console.error('Form Submit error:', error);
            if (error.response) {
                console.log("Error response data:", error.response.data);
                alert(`${error.response.data}`);
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div id="App">
            <div id="header_findPW"/>
            <form id="write_findPW" onSubmit={handleSubmit}>
                <h2>비밀번호 찾기</h2>
                <input
                    type="text"
                    name="studentId"
                    value={inputs.studentId}
                    onChange={handleChange}
                    placeholder="아이디"
                    required
                /><hr/>
                <input
                    type="text"
                    name="studentName"
                    value={inputs.studentName}
                    onChange={handleChange}
                    placeholder="이름"
                    required
                /><hr/>
                <input
                    type="text"
                    name="studentPhoneNumber"
                    value={inputs.studentPhoneNumber}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    required
                />
                <input type="submit" value="인증" id="sub_btn"/><hr/>
                <input
                    type="text"
                    placeholder="인증번호"
                />
                <input type="submit" value="찾기" id="findPW_btn"/><hr/>
            </div>
            <div id="footer_findPW"/>
        </div>
    );
}

export default App9;