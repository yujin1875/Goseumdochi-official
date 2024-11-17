import React, { useEffect, useState } from 'react';
import '../css/adminacademymanage.css';
import logo from './images/goseumdochi.png';
import axios from "axios";

const App22 = () => {
    const [academyList, setAcademyList] = useState([]); // [학원 + 원장] 정보 담을 리스트

    useEffect(() => {
        // 학원 정보를 가져오는 함수를 정의합니다.
        const fetchAcademyList = async () => {
            try {
                const response = await axios.get('/api/admin/management/academy/all'); // API를 호출하여 학생 정보를 가져옵니다.
                setAcademyList(response.data); // 가져온 학생 정보를 상태 변수에 저장합니다.
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchAcademyList(); // useEffect가 호출될 때 학생 정보를 가져오는 함수를 실행합니다.
    }, []);

    const goBackToAdminNotice = () => {
        window.location.href = '/adminmain';
    }

    return (
        <div id="App">
            <div id="adminacademymanage_frame">
                <div id="adminacademymanage_header">
                    <a onClick={goBackToAdminNotice}> &lt; </a>
                    <h2>학원 관리</h2>
                </div>
                <div id="rect" />
                <div id="adminacademymanage_body">

                    <div id="adminacademymanage_contents">
                        <table style={{ fontSize: "20px" }}>
                            <thead>
                                <tr>
                                    <th>학원 번호</th>
                                    <th>학원 이름</th>
                                    <th>원장님 이름</th>
                                    <th>원장님 번호</th>
                                    <th>원장님 이메일</th>
                                    <th>학원 주소</th>
                                    <th>학원 상세 주소</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academyList.map(academy => (
                                    <tr key={academy.id}>
                                        <td>{academy.id}</td>
                                        <td>{academy.name}</td>
                                        <td>{academy.directorDTO.name}</td>
                                        <td>{academy.directorDTO.phoneNumber}</td>
                                        <td>{academy.directorDTO.email}</td>
                                        <td>{academy.address}</td>
                                        <td>{academy.addressDetail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App22;
