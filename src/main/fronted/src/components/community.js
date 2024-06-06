import React, { useState, useEffect } from 'react';
import '../css/community.css';
import logo from './images/goseumdochi.png';
import axios from 'axios';

function App24() {
    const [visibleDiv, setVisibleDiv] = useState('자유');
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [commentedPosts, setCommentedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [academies, setAcademies] = useState([]); // 학원 목록을 저장할 상태 추가
    const [selectedPostId, setSelectedPostId] = useState(null); // 게시물 상세보기
    const [previousDiv, setPreviousDiv] = useState(null); // 클릭한 게시판 정보 저장 (이전으로 돌아가기 버튼을 위함)
    const [comments, setComments] = useState([]); // 댓글 데이터 저장
    const [newComment, setNewComment] = useState(""); // 새로운 댓글을 저장할 상태

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        categoryId: '',
        writerId: '', // 초기 값으로 빈 문자열 설정
        star: null // 별점 초기 값으로 null 설정
    });

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

    useEffect(() => {
            const fetchStudentId = async () => {
                try {
                    const studentInfo = await fetchStudentInfo();
                    setNewPost((prevPost) => ({
                        ...prevPost,
                        writerId: studentInfo.id
                    }));
                } catch (error) {
                    console.error('Error fetching student ID:', error);
                }
            };

            fetchStudentId();
            fetchCategories();
        }, []);

    useEffect(() => {
        if (visibleDiv === '자유') {
            fetchPostsByCategory('자유');
        } else if (visibleDiv === '대입') {
            fetchPostsByCategory('대입');
        } else if (visibleDiv === '질문') {
            fetchPostsByCategory('질문');
        } else if (visibleDiv === 'Mypage') {
            fetchMypageData();
        } else if (visibleDiv === '학원리뷰') {
            fetchAcademyReviews();
        } else if (visibleDiv === '글쓰기') { // '글쓰기' 화면일 때 학원 목록을 불러옴
            fetchAcademies(); // 학원 목록을 가져오는 함수 호출
        } else if (visibleDiv === '상세보기') {

        }
    }, [visibleDiv]);

    const fetchCategories = async () => {
        try {
            const categoriesResponse = await axios.get('/api/posts/categories');
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const fetchPostsByCategory = async (category) => {
        try {
            const postsResponse = await axios.get(`/api/posts/category/${category}`);
            setPosts(postsResponse.data);
        } catch (error) {
            console.error("Error fetching posts by category", error);
        }
    };

    const fetchMypageData = async () => {
        try {
            const myPostsResponse = await axios.get(`/api/mypage/posts/${newPost.writerId}`);
            setPosts(myPostsResponse.data);

            const likedPostsResponse = await axios.get(`/api/mypage/liked-posts/${newPost.writerId}`);
            setLikedPosts(likedPostsResponse.data);
            const commentedPostsResponse = await axios.get(`/api/mypage/commented-posts/${newPost.writerId}`);
            setCommentedPosts(commentedPostsResponse.data);
        } catch (error) {
            console.error("Error fetching mypage data", error);
        }
    };

    const fetchAcademyReviews = async () => {
        try {
            const reviewsResponse = await axios.get('/api/academy-reviews');
            setReviews(reviewsResponse.data);
        } catch (error) {
            console.error("Error fetching academy reviews", error);
        }
    };

    const fetchAcademies = async () => {
        try {
            const academiesResponse = await axios.get('/api/academies');
            let academiesData = academiesResponse.data;
            if (Array.isArray(academiesData)) {
                // 데이터가 이미 배열 형태이므로 그대로 사용합니다.
                setAcademies(academiesData);
            } else if (typeof academiesData === 'object') {
                // 데이터가 객체 형태이므로 객체의 값을 배열로 변환합니다.
                academiesData = Object.values(academiesData);
                setAcademies(academiesData);
            } else {
                console.error("Unexpected data format for academies:", academiesData);
            }
        } catch (error) {
            console.error("Error fetching academies", error);
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

    // 댓글 입력창의 내용이 변경될 때 호출되는 함수
    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // 입력된 댓글 내용을 상태에 저장
    };

    // 댓글을 작성하는 함수
    const submitComment = async () => {
        try {
            // 새로운 댓글 생성 요청
            const response = await axios.post('/api/comments/create', {
                postId: selectedPostId, // 현재 선택된 게시물의 ID
                content: newComment,
                writerId: newPost.writerId // 작성자 아이디
            });
            console.log('Comment created successfully', response.data);

            // 댓글 작성 후 댓글 목록 다시 불러오기
            fetchCommentsByPostId(selectedPostId);

            // 입력창 초기화
            setNewComment("");
        } catch (error) {
            console.error('Error creating comment', error);
        }
    };


    const showDivHome = () => {
        setVisibleDiv('자유');
    };

    const showDivMypage = () => {
        setVisibleDiv('Mypage');
        fetchMypageData();
    };

    const showDivByCategory = (category) => {
        setVisibleDiv(category);
    };

    const showDivReviews = () => {
        setVisibleDiv('학원리뷰');
    };

    const showWriteForm = () => {
        setVisibleDiv('글쓰기');
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewPost((prevPost) => ({
            ...prevPost,
            [id]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!newPost.categoryId) {
                alert("카테고리를 선택해주세요.");
                return;
            }

            const response = await axios.post('/api/posts/upload', {
                ...newPost,
                writerId: parseInt(newPost.writerId, 10)
            });
            console.log('Post created successfully', response.data);
            showDivByCategory(newPost.categoryId);
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <div id="App">
            <div id="community_header">
                <div id="menu_btn" />
                <div id="home_btn" />
                <div id="title">
                    <img src={logo} alt="고슴도치 로고" />
                    <h2>고슴도치 커뮤니티</h2>
                </div>
            </div>
            <div id="menu_community">
                <ul>
                    <li onClick={() => showDivByCategory('자유')}><a>자유 게시판</a></li>
                    <li onClick={() => showDivByCategory('대입')}><a>대입 게시판</a></li>
                    <li onClick={() => showDivByCategory('질문')}><a>질문 게시판</a></li>
                    <li><a>대학 입결 정보</a></li>
                    <li onClick={showDivReviews}><a>학원 리뷰</a></li>
                    <li onClick={showDivMypage}><a>마이페이지</a></li>
                </ul>
            </div>
            <div id="contents_community">
                {visibleDiv !== 'Mypage' && visibleDiv !== '글쓰기' && (
                    <div id="header_contents_community">
                        <div id="findsomething">
                            <input type="text" placeholder="제목" id="find_title" />
                            <input type="submit" value="검색" id="find_btn" />
                            <button id="write" onClick={showWriteForm}>
                                <span>글쓰기</span>
                            </button>
                        </div>
                    </div>
                )}
                <div id="contents_contents_community">
                    {visibleDiv === '글쓰기' && (
                        <div id="write_contents_community">
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="writerId" >작성자 아이디: </label>
                                <input type="text" id="writerId" value={newPost.writerId} disabled />
                                <label htmlFor="categoryId">카테고리: </label>
                                <select id="categoryId" onChange={handleInputChange} value={newPost.categoryId}>
                                    <option value="">카테고리를 선택하세요</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                {newPost.categoryId === '학원리뷰' && (
                                    <span>
                                        <label htmlFor="academy">학원 선택: </label>
                                        <select id="academy" onChange={handleInputChange}>
                                            <option value="">학원을 선택하세요</option>
                                            {academies.map((academy, index) => (
                                                <option key={index} value={academy.id}>{academy.name}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="star">별점: </label>
                                        <input type="number" id="star" min="1" max="5" onChange={handleInputChange} value={newPost.star || ''} />
                                    </span>
                                )}
                                <label htmlFor="title">제목: </label>
                                <input type="text" id="title" onChange={handleInputChange} value={newPost.title} />
                                <label htmlFor="content">내용: </label>
                                <textarea id="content" onChange={handleInputChange} value={newPost.content}></textarea>
                                <button type="submit">등록</button>
                            </form>
                        </div>
                    )}

                    {visibleDiv === '상세보기' && selectedPostId && (
                        <div id="detail">
                            {posts.map(post => {
                                if (post.id === selectedPostId) {
                                    return (
                                        <div key={post.id}>
                                            <h2>{post.title}</h2>
                                            <p>{post.content}</p>
                                            <p>작성자: 익명</p>
                                            <p>작성일: {post.createDate.split('T')[0]}</p>
                                            {/* 댓글 입력창 */}
                                            <textarea value={newComment} onChange={handleCommentChange} placeholder="댓글을 입력하세요"></textarea>
                                            <button onClick={submitComment}>작성</button>
                                            {/* 댓글 표시 */}
                                            <h3>댓글</h3>
                                            <ul>
                                                {/* 댓글 데이터를 표시하는 코드 */}
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
                                {posts
                                    .slice()
                                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate)) // 날짜 기준으로 최신 순 정렬
                                    .map(post => (
                                        <li key={post.id}>
                                            <div>{post.likeCount} 좋아요</div>
                                            <button onClick={() => handlePostClick(post.id)}>{post.title}</button> {/* 상세보기 클릭 이벤트 추가 */}
                                            <div>{post.views} 조회수</div>
                                            <div>{post.createDate.split('T')[0]}</div> {/* 날짜만 표시될 수 있도록 */}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    {visibleDiv === '대입' && (
                        <div id="letter_contents_community">
                            <ul>
                                {posts
                                    .slice()
                                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate)) // 날짜 기준으로 최신 순 정렬
                                    .map(post => (
                                        <li key={post.id}>
                                            <div>{post.likeCount} 좋아요</div>
                                            <button onClick={() => handlePostClick(post.id)}>{post.title}</button>
                                            <div>{post.views} 조회수</div>
                                            <div>{post.createDate.split('T')[0]}</div> {/* 날짜만 표시될 수 있도록 */}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {visibleDiv === '질문' && (
                        <div id="letter_contents_community">
                            <ul>
                                {posts
                                    .slice()
                                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate)) // 날짜 기준으로 최신 순 정렬
                                    .map(post => (
                                        <li key={post.id}>
                                            <div>{post.likeCount} 좋아요</div>
                                            <button onClick={() => handlePostClick(post.id)}>{post.title}</button>
                                            <div>{post.views} 조회수</div>
                                            <div>{post.createDate.split('T')[0]}</div> {/* 날짜만 표시될 수 있도록 */}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {visibleDiv === '학원리뷰' && (
                        <div id="letter_contents_community">
                            <ul>
                                {reviews
                                    .slice()
                                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate)) // 날짜 기준으로 최신 순 정렬
                                    .map(review => (
                                        <li key={review.id}>
                                            <div>{review.likeCount} 좋아요</div>
                                            <div>{review.title}</div>
                                            <div>{review.views} 조회수</div>
                                            <div>{review.createDate.split('T')[0]}</div> {/* 날짜만 표시될 수 있도록 */}
                                            <div>{review.star} 별점</div> {/* 별점 추가 */}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    {visibleDiv === 'Mypage' && (
                        <div id="mypage_contents_community">
                            <div className="mypage_section">
                                <h2>작성한 글</h2>
                                <ul>
                                    {posts.map(post => (
                                        <li key={post.id}>{post.title}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mypage_section">
                                <h2>댓글단 글</h2>
                                <ul>
                                    {commentedPosts.map(post => (
                                        <li key={post.id}>{post.title}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mypage_section">
                                <h2>좋아요한 글</h2>
                                <ul>
                                    {likedPosts.map(post => (
                                        <li key={post.id}>{post.title}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                {visibleDiv !== 'Mypage' && visibleDiv !== '글쓰기' && (
                    <div id="footer_contents_community">
                        <button id="back_write_btn">
                            <span>이전</span>
                        </button>
                        <button id="next_write_btn">
                            <span>다음</span>
                        </button>
                        <div id="page_number">
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App24;
