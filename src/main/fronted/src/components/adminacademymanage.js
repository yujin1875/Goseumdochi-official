import '../css/adminacademymanage.css';
import logo from './images/goseumdochi.png';

const App22 = () => {
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const token = localStorage.getItem('authToken'); // 인증 토큰 가져오기
                const response = await fetch('/api/admin/manage/director', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Bearer 토큰 추가
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log('Directors fetched:', data); // Fetch된 데이터 확인

                const directorsWithAcademy = await Promise.all(data.map(async (director) => {
                    if (!director.academyEntity || !director.academyEntity.id) {
                        console.error('AcademyEntity is missing or invalid for director:', director);
                        return director;
                    }

                    const academyResponse = await fetch(`/api/admin/manage/academy/${director.academyEntity.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Bearer 토큰 추가
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!academyResponse.ok) {
                        console.error('Failed to fetch academy:', academyResponse.statusText);
                        return director;
                    }

                    const academyData = await academyResponse.json();
                    console.log('Academy fetched for director', director.id, academyData); // Fetch된 학원 데이터 확인
                    return { ...director, academy: academyData };
                }));
                setDirectors(directorsWithAcademy);
            } catch (error) {
                console.error('Error fetching directors:', error);
            }
        };

        fetchDirectors();
    }, []);

    return (
        <div id="App">
            <div id="adminacademymanage_frame">
                <div id="adminacademymanage_header">
                    <a> &lt; </a>
                    <h2>학원 관리</h2>
                    <div id="find_btn">
                    </div>
                </div>
                <div id="rect" />
                <div id="adminacademymanage_body">
                    <div id="adminacademymanage_category">
                        <div id="academyNum">
                            학원 번호
                        </div>
                        <div id="academyName">
                            학원 이름
                        </div>
                        <div id="directorName">
                            원장님 이름
                        </div>
                        <div id="directorNum">
                            원장님 번호
                        </div>
                        <div id="directorEmail">
                            원장님 이메일
                        </div>
                        <div id="academyNum">
                            학원 번호
                        </div>
                        <div id="academyPostnum">
                            학원 우편번호
                        </div>
                        <div id="academyAddress">
                            학원 상세 주소
                        </div>
                        <div id="SendLetter">
                            쪽지보내기
                        </div>
                    </div>
                    <div id="adminacademymanage_contents">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>학원 번호</th>
                                    <th>학원 이름</th>
                                    <th>원장님 이름</th>
                                    <th>원장님 번호</th>
                                    <th>원장님 이메일</th>
                                    <th>학원 우편번호</th>
                                    <th>학원 상세 주소</th>
                                    <th>쪽지보내기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {directors.map(director => (
                                    <tr key={director.id}>
                                        <td>{director.academy?.id}</td>
                                        <td>{director.academy?.name}</td>
                                        <td>{director.name}</td>
                                        <td>{director.phoneNumber}</td>
                                        <td>{director.email}</td>
                                        <td>{director.academy?.postcode}</td>
                                        <td>{director.academy?.address}</td>
                                        <td>
                                            <button>쪽지 보내기</button>
                                        </td>
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
