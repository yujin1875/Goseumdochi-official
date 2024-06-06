import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminAcademyFormManage() {
    const [academyFormList, setAcademyFormList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAcademyForms = async () => {
            try {
                const response = await axios.get('/api/admin/academyForms');
                setAcademyFormList(response.data);
            } catch (error) {
                setError('Failed to fetch academy forms.');
                console.error(error);
            }
        };

        fetchAcademyForms();
    }, []);

    // 수락 버튼 클릭 시 처리 로직
    const handleAccept = async (id) => {
        try {
            const response = await axios.post('/api/admin/accept', null, {
                params: {
                    formId: id
                }
            });

            // 서버에서 업데이트된 데이터를 받아서 업데이트
            if (response.status === 200) {
                // 성공적으로 업데이트되었을 때, 폼 목록 상태를 업데이트합니다.
                setAcademyFormList(academyFormList.map(form => {
                    // 변경된 폼의 id와 일치하는 폼만 업데이트합니다.
                    if (form.id === id) {
                        // ...form은 기존의 폼 데이터를 유지하고, authStatus만 새로운 값으로 업데이트합니다.
                        return { ...form, authStatus: 1 };
                    }
                    return form;
                }));
                alert(response.data)
            }
        } catch (error) {
            console.error('Error updating form status:', error);
        }
    };

    // 거절 버튼 클릭 시 처리 로직
    const handleReject = async (id) => {
        try {
            const response = await axios.post('/api/admin/reject', null, {
                params: {
                    formId: id
                }
            });

            if (response.status === 200) {
                setAcademyFormList(academyFormList.map(form => {
                    if (form.id === id) {
                        return { ...form, authStatus: -1 };
                    }
                    return form;
                }));
                alert(response.data)
            }
        } catch (error) {
            console.error('Error updating form status:', error);
        }
    };

    return (
        <div id="adminAcademyFormManage_frame">
            <div id="adminAcademyFormManage_header">
                <a href="/">홈</a>
                <h2>학원신청서 관리</h2>
            </div>
            <div id="rect"></div>
            <div id="adminAcademyFormManage_body">

                <div id="adminAcademyFormManage_contents">
                    <div className="admin-academy-form-manage">
                        {error && <p>{error}</p>}
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>원장 이름</th>
                                <th>원장 전화번호</th>
                                <th>원장 이메일</th>
                                <th>학원 이름</th>
                                <th>학원 전화번호</th>
                                <th>학원 우편번호</th>
                                <th>학원 주소</th>
                                <th>학원 상세주소</th>
                                <th>인증 상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {academyFormList.map((form) => (
                                <tr key={form.id}>
                                    <td>{form.id}</td>
                                    <td>{form.directorName}</td>
                                    <td>{form.directorPhoneNumber}</td>
                                    <td>{form.directorEmail}</td>
                                    <td>{form.academyName}</td>
                                    <td>{form.academyPhoneNumber}</td>
                                    <td>{form.academyPostcode}</td>
                                    <td>{form.academyAddress}</td>
                                    <td>{form.academyAddressDetail}</td>
                                    <td>{form.authStatus === 0 ? (
                                        <>
                                            <button onClick={() => handleAccept(form.id)}>수락</button>
                                            <button onClick={() => handleReject(form.id)}>거절</button>
                                        </>
                                    ) : form.authStatus === 1 ? '0' : 'X'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAcademyFormManage;
