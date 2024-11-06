import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LectureMaterialPaging({ user, lecture }) { // props로 user와 lecture 받기
    const [materialList, setMaterialList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingInfo, setPagingInfo] = useState({});

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
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => goToPage(1)}>&lt;&lt;</button>
                <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)}>&lt;</button>
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