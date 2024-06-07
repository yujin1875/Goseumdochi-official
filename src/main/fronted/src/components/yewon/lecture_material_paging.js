import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LectureMaterialPaging() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, lecture } = location.state;

    const [materialList, setMaterialList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingInfo, setPagingInfo] = useState({});

    // 처음 페이지 띄울때 및 currentPage 변수 데이터가 변경될 때마다 실행
    useEffect(() => {
        fetchMaterials(currentPage);
    }, [currentPage]);

    const fetchMaterials = async (page) => {
        try {
            const response = await axios.get(`/api/lecture/${lecture.id}/material/paging?page=${page}`);
            setMaterialList(response.data.material.content);
            setPagingInfo({
                startPage: response.data.startPage,
                endPage: response.data.endPage,
                totalPages: response.data.material.totalPages,
            });
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 
        ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        return formattedDate;
    }

    return (
        <div>
            {/* 자료 목록 표시 */}
            <h2>강의자료</h2>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성자</th>
                    <th>작성일시</th>
                    <th>강의자료</th>
                    {/* 기타 헤더 정보 */}
                </tr>
                </thead>
                <tbody>
                {materialList.map((material) => (
                    <tr key={material.id}>
                        <td>{material.id}</td>
                        <td>{material.content}</td>
                        <td>{material.title}</td>
                        <td>{material.author}</td>
                        <td>{formatDateTime(material.createdAt)}</td>
                        <td><a href={material.attachmentPath} download>첨부파일</a></td>
                        {/* 기타 셀 데이터 */}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이징 컴포넌트 */}
            <div>
                <button onClick={() => goToPage(1)}>&lt;&lt;</button>
                <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)}>&lt;</button>
                {/* 현재 페이지 기준으로 페이지 버튼 생성 */}
                {Array.from({ length: pagingInfo.endPage - pagingInfo.startPage + 1 }, (_, i) => i + pagingInfo.startPage).map(page => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        style={{ backgroundColor: page === currentPage ? '#007BFF' : 'transparent', color: page === currentPage ? 'white' : 'black' }}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => currentPage < pagingInfo.totalPages && goToPage(currentPage + 1)}>&gt;</button>
                <button onClick={() => goToPage(pagingInfo.totalPages)}>&gt;&gt;</button>
            </div>
        </div>
    );
}

export default LectureMaterialPaging;