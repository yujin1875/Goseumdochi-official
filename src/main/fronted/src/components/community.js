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
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        categoryId: '',
        writerId: 1 // 실제 사용자 ID로 변경
    });

    useEffect(() => {
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
                // 카테고리를 선택하지 않았을 때 오류 메시지 표시
                alert("카테고리를 선택해주세요.");
                return;
            }

            // 서버에 게시글 등록 요청을 보냄
            const response = await axios.post('/api/posts/upload', {
                ...newPost,
                // writerId를 숫자로 변환하여 Long 타입으로 전송
                writerId: parseInt(newPost.writerId, 10)
            });
            console.log('Post created successfully', response.data);
            // 등록된 게시글을 화면에 표시하기 위해 해당 카테고리로 이동
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
                    <li><a>학원 리뷰</a></li>
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
                                <label htmlFor="title">제목: </label>
                                <input type="text" id="title" onChange={handleInputChange} value={newPost.title} />
                                <label htmlFor="content">내용: </label>
                                <textarea id="content" onChange={handleInputChange} value={newPost.content}></textarea>
                                <button type="submit">등록</button>
                            </form>
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
                                            <div>{post.title}</div>
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
                                            <div>{post.title}</div>
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
                                            <div>{post.title}</div>
                                            <div>{post.views} 조회수</div>
                                            <div>{post.createDate.split('T')[0]}</div> {/* 날짜만 표시될 수 있도록 */}
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
