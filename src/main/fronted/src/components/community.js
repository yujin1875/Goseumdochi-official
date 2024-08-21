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

    const [selectedMenuItem, setSelectedMenuItem] = useState('자유');

    const [newPost, setNewPost] = useState({
            title: '',
            content: '',
            categoryId: '',
            writerId: '',
            star: '',
            academyId: ''
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
        if (visibleDiv === '글쓰기') {
            const fetchStudentIdAndAcademies = async () => {
                const studentInfo = await fetchStudentInfo();
                fetchAcademies(studentInfo.id); // studentId를 전달
            };
            fetchStudentIdAndAcademies();
        }
    }, [visibleDiv]);


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
            fetchPostsByCategory('학원리뷰');
        } else if (visibleDiv === '글쓰기') {
            // 글쓰기 화면이 활성화될 때 학원 목록을 가져오는 함수 호출
            const fetchStudentIdAndAcademies = async () => {
                try {
                    const studentInfo = await fetchStudentInfo();
                    fetchAcademies(studentInfo.id); // studentId를 전달
                } catch (error) {
                    console.error("Error fetching student info", error);
                }
            };
            fetchStudentIdAndAcademies();
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

    const fetchAcademies = async (studentId) => {
        try {
            console.log("student ID: " + studentId);
            const response = await axios.get(`/api/student/${studentId}/academies`);
            console.log("Fetched academies: ", response.data); // Log fetched academies
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

    // 댓글 입력창의 내용이 변경될 때 호출되는 함수
    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // 입력된 댓글 내용을 상태에 저장
    };

    // 댓글을 작성하는 함수
    const submitComment = async () => {
        try {
            const commentCheckResponse = await axios.get('/api/badword/check', {
            params: { text: newComment },
            });

            console.log("comment: " + commentCheckResponse.data.label);

            if (commentCheckResponse.data.label == 1) {
                alert('댓글에 비속어가 포함되어 있습니다.');
                return;
            }

            const response = await axios.post('/api/comments/create', {
                postId: selectedPostId,
                text: newComment,
                writerId: newPost.writerId
            });
            console.log('Comment created successfully', response.data);
            fetchCommentsByPostId(selectedPostId);
            setNewComment('');
            } catch (error) {
                console.error('Error creating comment', error);
            }
        };

    const handleStarChange = (e) => {
        const selectedStar = parseInt(e.target.value);
        console.log("Selected star:", selectedStar); // 선택된 별점을 콘솔에 출력
        setNewPost((prevPost) => ({
            ...prevPost,
            star: selectedStar
        }));
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
        setSelectedMenuItem(category); // Set the selected menu item
    };
    const showDivReviews = () => {
        setVisibleDiv('학원리뷰');
    };

    const showWriteForm = () => {
        setVisibleDiv('글쓰기');
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === 'academy') {
            setNewPost((prevPost) => ({
                ...prevPost,
                academyId: value // 학원 ID를 저장
            }));
        } else {
            setNewPost((prevPost) => ({
                ...prevPost,
                [id]: value
            }));
        }
    };
    // form submission function
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!newPost.categoryId) {
                alert("카테고리를 선택해주세요.");
                return;
            }

            const titleCheckResponse = await axios.get('/api/badword/check', {
                params: { text: newPost.title },
            });
            const contentCheckResponse = await axios.get('/api/badword/check', {
                params: { text: newPost.content },
            });

            console.log("title: " + titleCheckResponse.data.label);
            console.log("content: " + contentCheckResponse.data.label);

            if (titleCheckResponse.data.label == 1 || contentCheckResponse.data.label == 1) {
                alert('제목이나 내용에 비속어가 포함되어 있습니다.');
                return;
            }

            if (newPost.categoryId === '4') {
                // 학원리뷰 테이블에 저장하는 요청
                if (!newPost.academyId) { alert("학원 선택"); return; }
                else if (!newPost.star) { alert("별점 선택"); return; }

                const reviewResponse = await axios.post('/api/posts/upload', {
                    ...newPost,
                    writerId: newPost.writerId,
                    academyId: newPost.academyId, // 학원 ID 추가
                    star: newPost.star // 별점 추가
                });
                console.log('Academy review created successfully', reviewResponse.data);
            } else {
                const response = await axios.post('/api/posts/upload', {
                    ...newPost,
                    writerId: newPost.writerId
                });
                console.log('Post created successfully', response.data);
            }

            alert('게시글 등록 완료');
            setNewPost({
                title: '',
                content: '',
                categoryId: '',
                star: null,
                academyId: '',
                writerId: newPost.writerId
            });

            setVisibleDiv('자유');
        } catch (error) {
            console.error('Error creating post', error);
        }
    };


    const handleLikePost = async (postId) => {
        try {
            const studentInfo = await fetchStudentInfo();
            await axios.post(`/api/posts/${postId}/like`, null, {
                params: { studentId: studentInfo.id }
            });
            setPosts(posts.map(post => post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post));
        } catch (error) {
            console.error("Error liking post", error);
        }
    };

    const handleUnlikePost = async (postId) => {
        try {
            const studentInfo = await fetchStudentInfo();
            await axios.post(`/api/posts/${postId}/unlike`, null, {
                params: { studentId: studentInfo.id }
            });
            setPosts(posts.map(post => post.id === postId ? { ...post, likeCount: post.likeCount - 1 } : post));
        } catch (error) {
            console.error("Error unliking post", error);
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
                    <li onClick={() => showDivByCategory('자유')} style={{ backgroundColor: selectedMenuItem === '자유' ? '#BCBCBC' : '#D9D9D9' }}><a>자유 게시판</a></li>
                    <li onClick={() => showDivByCategory('대입')} style={{ backgroundColor: selectedMenuItem === '대입' ? '#BCBCBC' : '#D9D9D9' }}><a>대입 게시판</a></li>
                    <li onClick={() => showDivByCategory('질문')} style={{ backgroundColor: selectedMenuItem === '질문' ? '#BCBCBC' : '#D9D9D9' }}><a>질문 게시판</a></li>
                    <li onClick={() => showDivByCategory('학원리뷰')} style={{ backgroundColor: selectedMenuItem === '학원리뷰' ? '#BCBCBC' : '#D9D9D9' }}><a>학원 리뷰</a></li>
                    <li onClick={() => showDivByCategory('Mypage')} style={{ backgroundColor: selectedMenuItem === 'Mypage' ? '#BCBCBC' : '#D9D9D9' }}><a>마이페이지</a></li>
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
                                <label>작성자 아이디: {newPost.writerId} </label>
                                <label htmlFor="categoryId">카테고리: </label>
                                <select id="categoryId" onChange={handleInputChange} value={newPost.categoryId}>
                                    <option value="">카테고리를 선택하세요</option>
                                    <option value="1">자유</option>
                                    <option value="2">대입</option>
                                    <option value="3">질문</option>
                                    <option value="4">리뷰</option>
                                </select>
                                {newPost.categoryId === '4' && (
                                    <span>
                                        <label htmlFor="academy">학원 선택: </label>
                                        <select id="academy" onChange={handleInputChange}>
                                            <option value="">학원을 선택하세요</option>
                                            {academies.map((academy, index) => (
                                                <option key={index} value={academy.id}>{academy.name}</option>
                                            ))}
                                        </select>

                                        <label>별점: </label>
                                        <p className="rating">
                                            {[...Array(5)].map((_, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <label key={ratingValue}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={ratingValue}
                                                            onChange={handleStarChange}
                                                            checked={newPost.star === ratingValue}
                                                        />
                                                        <span className="icon">{ratingValue}</span>
                                                    </label>
                                                );
                                            })}
                                        </p>
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
                            {/* 학원 리뷰 제외 게시물 상세보기 */}
                            {posts.map(post => {
                                if (post.id === selectedPostId) {
                                    const hasLiked = likedPosts.some(likedPost => likedPost.id === post.id);
                                    return (
                                        <div key={post.id}>
                                            <h2>{post.title}</h2>
                                            <p>{post.content}</p>
                                            <p>작성자: 익명</p>
                                            <p>작성일: {post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</p>
                                            <div>
                                                <button onClick={() => hasLiked ? handleUnlikePost(post.id) : handleLikePost(post.id)}>
                                                    {hasLiked ? "좋아요 취소" : "좋아요"}
                                                </button>
                                                <span>{post.likeCount} 좋아요</span>
                                            </div>
                                            <textarea value={newComment} onChange={handleCommentChange} placeholder="댓글을 입력하세요"></textarea>
                                            <button onClick={submitComment}>작성</button>
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

                            {/* 학원리뷰 상세보기 */}
                                    {reviews.map(review => {
                                        if (review.id === selectedPostId) {
                                            return (
                                                <div key={review.id}>
                                                    <h2>{review.title}</h2>
                                                    <p>학원: {review.academyName}</p>
                                                    <p>별점: {review.star} / 5</p>
                                                    <p>{review.content}</p>
                                                    <p>작성자: 익명</p>
                                                    <p>작성일: {review.createDate.split('T')[0]} {review.createDate.split('T')[1].split('.')[0]}</p>
                                                    <div>
                                                        <button onClick={() => handleLikePost(review.id)}>
                                                            좋아요
                                                        </button>
                                                        <span>{review.likeCount} 좋아요</span>
                                                    </div>
                                                    <textarea value={newComment} onChange={handleCommentChange} placeholder="댓글을 입력하세요"></textarea>
                                                    <button onClick={submitComment}>작성</button>
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
                                            <button onClick={() => handlePostClick(post.id)}>{post.title}</button>
                                            <div>{post.views} 조회수</div>
                                            <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
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
                                                                    <button onClick={() => handlePostClick(post.id)}>{post.title}</button>
                                                                    <div>{post.views} 조회수</div>
                                                                    <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
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
                                                                    <button onClick={() => handlePostClick(post.id)}>{post.title}</button>
                                                                    <div>{post.views} 조회수</div>
                                                                    <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                                                </li>
                                                        ))}
                                                    </ul>
                                                </div>
                    )}
                    {visibleDiv === '학원리뷰' && (
                        <div id="letter_contents_community">
                                <ul>
                                                            {posts
                                                                .slice()
                                                                .sort((a, b) => {
                                                                    // 좋아요 3개 이상인 리뷰를 상단으로
                                                                    if (b.likeCount >= 3 && a.likeCount < 3) return 1;
                                                                    if (a.likeCount >= 3 && b.likeCount < 3) return -1;
                                                                    // 같은 조건 내에서는 최신 순으로 정렬
                                                                    return new Date(b.createDate) - new Date(a.createDate);
                                                                })
                                                                .map(post => (
                                                                    <li key={post.id}>
                                                                        <button onClick={() => handlePostClick(post.id)}>{post.title}</button>
                                                                        <div>{post.createDate.split('T')[0]} {post.createDate.split('T')[1].split('.')[0]}</div>
                                                                        <div>별점: {post.star} / 5</div>
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
                    <div id="footer_community">
                        <a>문의 | midas2024.ver01@gmail.com</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App24;