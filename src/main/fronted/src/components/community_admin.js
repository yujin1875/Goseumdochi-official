import React, { useState, useEffect } from 'react';
import '../css/community.css';
import logo from './images/goseumdochi.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function App24() {
    const [visibleDiv, setVisibleDiv] = useState('자유');
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [commentedPosts, setCommentedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [academies, setAcademies] = useState([]); // 학원 목록을 저장할 상태
    const [selectedPostId, setSelectedPostId] = useState(null); // 게시물 상세보기
    const [previousDiv, setPreviousDiv] = useState(null); // 클릭한 게시판 정보 저장 (이전으로 돌아가기 버튼을 위함)
    const [comments, setComments] = useState([]); // 댓글 데이터 저장
    const [newComment, setNewComment] = useState(""); // 새로운 댓글을 저장할 상태
    const [academyNames, setAcademyNames] = useState({});

    const [selectedMenuItem, setSelectedMenuItem] = useState('자유');

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};  // state에서 user 정보 받기

    // 사용자 정보를 가져오는 API 요청 함수
    const fetchStudentInfo = async () => {
        try {
            const response = await axios.get('/api/student/info');
            return response.data;
        } catch (error) {
            console.error("Error fetching student info", error);
            throw error;
        }
    };

    // main으로 ㄱㄱ
    const showMain = () => {
        navigate('/adminmain', { state: { user: user } }); // user 정보를 state로 전달
    };

    const showDivByCategory = (category) => {
        setVisibleDiv(category);
        setSelectedMenuItem(category);
    };
    const showDivReviews = () => {
        setVisibleDiv('학원리뷰');
    };

    useEffect(() => {
        if (visibleDiv === '자유') {
            fetchPostsByCategory('자유');
        } else if (visibleDiv === '대입') {
            fetchPostsByCategory('대입');
        } else if (visibleDiv === '질문') {
            fetchPostsByCategory('질문');
        } else if (visibleDiv === '학원리뷰') {
            fetchPostsByCategory('학원리뷰');
        }
    }, [visibleDiv]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await axios.get('/api/posts/categories');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    const fetchPostsByCategory = async (category) => {
        try {
            const postsResponse = await axios.get(`/api/posts/category/${category}`);
            const postsData = postsResponse.data;

            // 학원 이름을 병합하는 부분
            const postsWithAcademyNames = await Promise.all(postsData.map(async post => {
                if (post.academyId) {
                    const academyNameResponse = await axios.get(`/api/academies/academy-name`, {
                        params: { academyId: post.academyId }
                    });
                    return {
                        ...post,
                        academyName: academyNameResponse.data
                    };
                }
                return post;
            }));

            setPosts(postsWithAcademyNames);
        } catch (error) {
            console.error("Error fetching posts by category", error);
        }
    };

    const fetchAcademies = async (studentId) => {
        try {
            const response = await axios.get(`/api/student/${studentId}/academies`);
            if (Array.isArray(response.data)) {
                setAcademies(response.data);
            } else {
                console.error("Fetched academies data is not an array", response.data);
                setAcademies([]); // Handle non-array response
            }
        } catch (error) {
            console.error("Error fetching academies", error);
            setAcademies([]); // Handle error
        }
    };

    // 게시글 상세보기
    const handlePostClick = (postId) => {
        setSelectedPostId(postId); // 클릭된 게시물의 ID를 저장
        setPreviousDiv(visibleDiv); // 이전에 선택한 게시판 정보 저장
        setVisibleDiv('상세보기'); // 상세보기 화면으로 전환
        fetchCommentsByPostId(postId); // 클릭된 게시물의 댓글 불러오기
    };

    // 이전 버튼
    const handleBackButtonClick = () => {
        setVisibleDiv(previousDiv); // 이전에 선택한 게시판으로 변경
        setPreviousDiv(null); // 이전에 선택한 게시판 정보 초기화
    };

    // 댓글을 불러오는 함수
    const fetchCommentsByPostId = async (postId) => {
        try {
            const response = await axios.get(`/api/comments/post/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    // 글 검색
    const handleSearch = async () => {
        if (searchQuery.trim() === '') return; // 검색어가 비어있는 경우 검색하지 않음
        try {
            const response = await axios.get(`/api/posts/search`, {
                params: { keyword: searchQuery }
            });
            setSearchResults(response.data);
            setVisibleDiv('검색결과');
        } catch (error) {
            console.error('Error searching posts', error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDeletePost = async (postId) => {
            try {
                await axios.delete(`/api/posts/${postId}`);
                setPosts(posts.filter(post => post.id !== postId));
                if (visibleDiv === '상세보기') {
                    setVisibleDiv(previousDiv);
                    setPreviousDiv(null);
                }
            } catch (error) {
                console.error("Error deleting post", error);
            }
        };


    return (
        <div id="App">
            <div id="community_header">
                <div id="home_btn" onClick={showMain}>
                    <img src={logo} alt="고슴도치 로고" />
                </div>
                <div id="title">
                    <img src={logo} alt="고슴도치 로고" />
                    <h2>고슴도치 커뮤니티</h2>
                </div>
            </div>
            <div id="menu_community">
                <ul>
                    <li onClick={() => showDivByCategory('자유')} style={{ backgroundColor: selectedMenuItem === '자유' ? '#BCBCBC' : '#D9D9D9' }}><a>자유 게시판</a></li>
                    <li onClick={() => showDivByCategory('대입')} style={{ backgroundColor: selectedMenuItem === '대입' ? '#BCBCBC' : '#D9D9D9' }}><a>대입 게시판</a></li>
                    <li onClick={() => showDivByCategory('질문')} style={{ backgroundColor: selectedMenuItem === '질문' ? '#BCBCBC' : '#D9D9D9' }}><a>질문 게시판</a></li>
                    <li onClick={() => showDivByCategory('학원리뷰')} style={{ backgroundColor: selectedMenuItem === '학원리뷰' ? '#BCBCBC' : '#D9D9D9' }}><a>학원 리뷰</a></li>
                </ul>
            </div>

            <div id="contents_community">
                {visibleDiv !== 'Mypage' && visibleDiv !== '글쓰기' && (
                    <div id="header_contents_community">
                        <div id="findsomething">
                            <input
                                type="text"
                                placeholder="제목"
                                id="find_title"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <input type="submit" value="검색" id="find_btn" onClick={handleSearch} />
                        </div>

                    </div>
                )}
                <div id="contents_contents_community">
                    {visibleDiv === '검색결과' && (
                        <div id="letter_contents_community">
                            <ul>
                                {searchResults.length > 0 ? (
                                    searchResults.map(post => {
                                        let categoryName = '';
                                        switch (post.categoryId) {
                                            case 1:
                                                categoryName = '자유';
                                                break;
                                            case 2:
                                                categoryName = '대입';
                                                break;
                                            case 3:
                                                categoryName = '질문';
                                                break;
                                            case 4:
                                                categoryName = '학원리뷰';
                                                break;
                                            default:
                                                categoryName = '알 수 없음';
                                                break;
                                        }

                                        return (
                                            <li key={post.id}>
                                                <div>{categoryName} 게시판</div>
                                                <div>{post.likeCount} 좋아요</div>
                                                <a onClick={() => handlePostClick(post.id)}>{post.title}</a>
                                                <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <p>검색 결과가 없습니다.</p>
                                )}
                            </ul>
                        </div>
                    )}

                    {visibleDiv === '상세보기' && selectedPostId && (
                        <div id="detail">
                            {posts.map(post => {
                                if (post.id === selectedPostId) {
                                    const hasLiked = likedPosts.some(likedPost => likedPost.id === post.id);

                                    // 별점 계산: '학원리뷰'일 때만 별점 표시
                                    let starsDisplay = null;
                                    if (post.categoryId === 4) {  // 학원리뷰 카테고리인 경우
                                        const fullStars = '⭐'.repeat(post.star);  // 노란 별
                                        const emptyStars = '☆'.repeat(5 - post.star);  // 회색 별
                                        starsDisplay = <p>{fullStars}{emptyStars}</p>;
                                    }

                                    return (
                                        <div key={post.id}>
                                            <h2>{post.title}</h2>
                                            <p>{post.academyName}</p>
                                            <p>{starsDisplay}</p>  {/* 학원리뷰일 때만 별점 표시 */}
                                            <p>{post.content}</p>
                                            <p>작성자: 익명</p>
                                            <p>작성일: {post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</p>
                                            <span>{post.likeCount} 좋아요</span>
                                            <h3>댓글</h3>
                                            <ul>
                                                {comments.map(comment => (
                                                    <p key={comment.id}>익명: {comment.text}</p>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                }
                            })}
                            <button onClick={() => setVisibleDiv(previousDiv)}>이전</button>
                        </div>
                    )}

                    {visibleDiv === '자유' && (
                        <div id="letter_contents_community">
                            <ul>
                                {/* 핫게시글 우선 정렬 */}
                                {posts
                                    .slice()
                                    .sort((a, b) => {
                                        // 좋아요 3개 이상인 게시글을 상단으로
                                        if (b.likeCount >= 3 && a.likeCount < 3) return 1;
                                        if (a.likeCount >= 3 && b.likeCount < 3) return -1;
                                        // 같은 조건 내에서는 최신 순으로 정렬
                                        return new Date(b.createDate) - new Date(a.createDate);
                                    })
                                    .map(post => (
                                        <li key={post.id}>
                                            {/* 핫게시글 표시 */}
                                            {post.likeCount >= 3 && <span className="hot-badge">🔥 핫게시글</span>}
                                            <div>{post.likeCount} 좋아요</div>
                                            <a onClick={() => handlePostClick(post.id)}>{post.title}</a>
                                            <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                            <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    {visibleDiv === '대입' && (
                        <div id="letter_contents_community">
                            <ul>
                                {/* 핫게시글 우선 정렬 */}
                                {posts
                                    .slice()
                                    .sort((a, b) => {
                                        // 좋아요 3개 이상인 게시글을 상단으로
                                        if (b.likeCount >= 3 && a.likeCount < 3) return 1;
                                        if (a.likeCount >= 3 && b.likeCount < 3) return -1;
                                        // 같은 조건 내에서는 최신 순으로 정렬
                                        return new Date(b.createDate) - new Date(a.createDate);
                                    })
                                    .map(post => (
                                        <li key={post.id}>
                                            {/* 핫게시글 표시 */}
                                            {post.likeCount >= 3 && <span className="hot-badge">🔥 핫게시글</span>}
                                            <div>{post.likeCount} 좋아요</div>
                                            <a onClick={() => handlePostClick(post.id)}>{post.title}</a>
                                            <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                            <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {visibleDiv === '질문' && (
                        <div id="letter_contents_community">
                            <ul>
                                {/* 핫게시글 우선 정렬 */}
                                {posts
                                    .slice()
                                    .sort((a, b) => {
                                        // 좋아요 3개 이상인 게시글을 상단으로
                                        if (b.likeCount >= 3 && a.likeCount < 3) return 1;
                                        if (a.likeCount >= 3 && b.likeCount < 3) return -1;
                                        // 같은 조건 내에서는 최신 순으로 정렬
                                        return new Date(b.createDate) - new Date(a.createDate);
                                    })
                                    .map(post => (
                                        <li key={post.id}>
                                            {/* 핫게시글 표시 */}
                                            {post.likeCount >= 3 && <span className="hot-badge">🔥 핫게시글</span>}
                                            <div>{post.likeCount} 좋아요</div>
                                            <a onClick={() => handlePostClick(post.id)}>{post.title}</a>
                                            <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                            <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {visibleDiv === '학원리뷰' && (
                        <div id="letter_contents_community">
                            <ul>
                                {posts.map(post => {
                                    // 별점 계산
                                    const fullStars = '⭐'.repeat(post.star);  // 노란 별
                                    const emptyStars = '☆'.repeat(5 - post.star);  // 회색 별

                                    return (
                                        <li key={post.id}>
                                            <div>학원 이름: {post.academyName}</div>
                                            <div>{fullStars}{emptyStars}</div> {/* 별점 표시 */}
                                            <div>{post.likeCount} 좋아요</div>
                                            <a onClick={() => handlePostClick(post.id)}>{post.title}</a>
                                            <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                            <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                {visibleDiv !== 'Mypage' && visibleDiv !== '글쓰기' && (
                    <div id="footer_community">
                        <a>문의 | midas2024.ver01@gmail.com</a>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

export default App24;