import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './subcss/lecture_material_paging.css';

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

    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const handleMaterialClick = (material) => {
        setSelectedMaterial(material); // 클릭한 공지사항의 데이터 설정
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
        <div className="material_paging">
            <h2>강의자료</h2>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일시</th>
                    <th>강의자료</th>
                </tr>
                </thead>
                <tbody>
                {materialList.map((material) => (
                    <tr key={material.id} style={{ height: '40px', overflow: 'hidden'}}>
                        <td>{material.id}</td>
                        <td>
                            <p
                                style={{ cursor: 'pointer', color: 'blue' }}
                                onClick={() => handleMaterialClick(material)}// 제목 클릭 시 상세보기
                            >
                                {material.title}
                            </p>
                        </td>
                        <td>{material.author}</td>
                        <td>{formatDateTime(material.createdAt)}</td>
                        <td><a href={material.attachmentPath} download>첨부파일</a></td>
                    </tr>
                ))}
                </tbody>
            </table>
                {selectedMaterial && (
                    <div id="material_detail">
                        <h3>{selectedMaterial.title}</h3>
                        <p><strong>작성자:</strong> {selectedMaterial.author}</p>
                        <p><strong>게시일:</strong> {selectedMaterial.createdAt && formatDateTime(selectedMaterial.createdAt)}</p>
                        <p><strong>내용:</strong> {selectedMaterial.content}</p> {/* 공지사항 내용 */}
                        <button onClick={() => setSelectedMaterial(null)}>닫기</button>
                    </div>
                )}


            <div className="button_material_paging">
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