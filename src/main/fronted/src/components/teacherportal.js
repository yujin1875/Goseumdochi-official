import '../css/teacherportal.css';
import logo from './images/goseumdochi.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import ScoreChart from './ScoreChart';

function App26() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, lectureId } = location.state || {};
    const [visibleDiv, setVisibleDiv] = useState('Home');
    const [visiblesubDiv, setVisiblesubDiv] = useState('List');
    const [materials, setMaterials] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [notices, setNotices] = useState([]);
    const [currentNotice, setCurrentNotice] = useState(null);
    const [exams, setExams] = useState([]);
    const [currentExam, setCurrentExam] = useState(null);


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [points, setPoints] = useState('');
    const [examMethod, setExamMethod] = useState('온라인');
    const [openDate, setOpenDate] = useState('');
    const [examPeriodStart, setExamPeriodStart] = useState('');
    const [examPeriodEnd, setExamPeriodEnd] = useState('');
    const [duration, setDuration] = useState('');
    const [scorePublished, setScorePublished] = useState(false);
    const [lectureInfo, setLectureInfo] = useState({});
    const [file, setFile] = useState(null);
    const [existingFile, setExistingFile] = useState(null);

    const [examId, setExamId] = useState(null);

    const [questionType, setQuestionType] = useState(''); // 문제 유형 선택을 위한 상태
    const [questionText, setQuestionText] = useState(''); // 문제 텍스트 입력 상태
    const [choices, setChoices] = useState(['', '', '', '']); // 4지선다 보기를 위한 상태
    const [correctAnswer, setCorrectAnswer] = useState(''); // 정답 선택 상태
    const [essayAnswers, setEssayAnswers] = useState(['']); // 서술형 답변 상태
    const [totalPoints, setTotalPoints] = useState(0); // 총 배점을 위한 상태
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [students, setStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [submissionDetails, setSubmissionDetails] = useState({
        title: '',
        content: '',
        attachmentPath: ''
    });

    // 메뉴 클릭시 색 변경
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick = (index, callback) => {
        setSelectedIndex(index);
        callback();
    };
    // currentAssignment와 studentId가 변경될 때 fetchStudentSubmission 호출
    useEffect(() => {
        if (currentAssignment && currentAssignment.id && studentId) {
            fetchStudentSubmission(studentId);
        }
    }, [currentAssignment, studentId]);

    const fetchStudentSubmission = async (studentId) => {
        try {
            const response = await axios.get(`/api/teacher/assignment/${currentAssignment.id}/student/${studentId}/submissions`);

            if (response.status === 200) {
                const submission = response.data;
                setSubmissionDetails({
                    title: submission.title || '제출된 과제가 없습니다.',
                    content: submission.content || '',
                    attachmentPath: submission.attachmentPath || '',
                    score: submission.score || 0,  // 추가: 평가 점수
                    evaluationComment: submission.evaluationComment || ''  // 추가: 평가 의견
                });
            } else {
                setSubmissionDetails({
                    title: '제출된 과제가 없습니다.',
                    content: '',
                    attachmentPath: '',
                    score: 0,  // 기본 값 설정
                    evaluationComment: ''  // 기본 값 설정
                });
            }
        } catch (error) {
            setSubmissionDetails({
                title: '오류 발생',
                content: '과제 제출 정보를 불러오는 중 오류가 발생했습니다.',
                attachmentPath: '',
                score: 0,  // 기본 값 설정
                evaluationComment: ''  // 기본 값 설정
            });
        }
    };




    useEffect(() => {
        if (lectureId) {
            fetchLectureInfo();
            if (visibleDiv === 'Lecturedata' && visiblesubDiv === 'List') {
                fetchMaterials();
            } else if (visibleDiv === 'Assignment') {
                fetchAssignments();
            } else if (visibleDiv === 'Subject') {
                fetchNotices();
            } else if (visibleDiv === 'Exam') {
                fetchExams();
            }
        } else {
            console.error("lectureId is not defined");
        }
    }, [visibleDiv, visiblesubDiv, lectureId]);

    const fetchLectureInfo = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture/${lectureId}`);
            setLectureInfo(response.data);
        } catch (error) {
            console.error("There was an error fetching the lecture info!", error);
        }
    };

    // 학생 목록을 가져오는 함수
    const fetchStudents = async () => {
        try {
            const response = await axios.get(`/api/student/lecture/${lectureId}/students`); // API 호출
            setStudents(response.data); // API로 받은 학생 데이터를 상태에 저장
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

// useEffect를 통해 화면이 'AssignmentEstimation'일 때만 API 호출
    useEffect(() => {
        if (visibleDiv === 'AssignmentEstimation') {
            fetchStudents(); // 학생 목록을 가져옴
        }
    }, [visibleDiv]);

// 학생 목록 출력 부분
    {students.map(student => (
        <div key={student.id} className="student-info">
            <div>{student.studentName}</div>
            <div>{student.studentId}</div>
        </div>
    ))}

    // 학생 목록을 가져오면서 과제 제출 상태를 포함하도록 수정
    const fetchStudentsWithSubmissionStatus = async () => {
        try {
            const response = await axios.get(
                `/api/student/lecture/${lectureId}/students/submission-status`,
                { params: { assignmentId: currentAssignment.id } } // 과제 ID를 포함
            );
            setStudents(
                response.data.map((student) => ({
                    ...student,
                    submissionStatus: student.assignmentSubmission
                        ? student.assignmentSubmission.submissionStatus
                        : '미제출',
                    score: student.assignmentSubmission?.score || '점수 미입력', // 점수 추가
                    evaluationComment: student.assignmentSubmission?.evaluationComment || '의견 미입력', // 평가 의견 추가
                }))
            );
        } catch (error) {
            console.error('학생들의 제출 상태를 가져오는 중 에러가 발생했습니다:', error);
        }
    };

// AssignmentEstimation 페이지 로드 시 학생과 제출 상태를 가져옴
    useEffect(() => {
        if (visibleDiv === 'AssignmentEstimation') {
            fetchStudentsWithSubmissionStatus(); // 제출 상태 포함 학생 목록 가져옴
        }
    }, [visibleDiv]);


    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture-material/list/${lectureId}`);
            setMaterials(response.data);
        } catch (error) {
            console.error("There was an error fetching the materials!", error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture/${lectureId}/assignments`);
            setAssignments(response.data);
        } catch (error) {
            console.error("There was an error fetching the assignments!", error);
        }
    };

    const fetchNotices = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture/${lectureId}/notices`);
            setNotices(response.data);
        } catch (error) {
            console.error("There was an error fetching the notices!", error);
        }
    };

    const fetchExams = async () => {
        try {
            const response = await axios.get(`/api/teacher/lecture/${lectureId}/exams`);
            setExams(response.data);
        } catch (error) {
            console.error("There was an error fetching the exams!", error);
        }
    };

    const handleMaterialClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/lecture-material/${id}`);
            setCurrentMaterial(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setExistingFile(response.data.attachmentPath);
            showsubDivView();
        } catch (error) {
            console.error("There was an error fetching the material!", error);
        }
    };

    const handleAssignmentClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/assignment/${id}`);
            console.log(response.data);
            setCurrentAssignment(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setPoints(response.data.points);
            setExistingFile(response.data.attachmentPath);
            showDivAssignmentRead();
        } catch (error) {
            console.error("There was an error fetching the assignment!", error);
        }
    };

    const handleNoticeClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/subject-notice/${id}`);
            setCurrentNotice(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setExistingFile(response.data.attachmentPath);
            showDivSubjectRead();
        } catch (error) {
            console.error("There was an error fetching the notice!", error);
        }
    };

    const handleExamClick = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/exam/${id}`);
            const exam = response.data;
            setCurrentExam(exam);
            setTitle(exam.title);
            setExamMethod(exam.examMethod);
            setOpenDate(exam.openDate);
            setExamPeriodStart(exam.examPeriodStart);
            setExamPeriodEnd(exam.examPeriodEnd);
            setDuration(exam.duration);
            setPoints(exam.points);
            setScorePublished(exam.scorePublished);
            showDivExamRead(); // 시험 정보 조회 화면을 보여줌
        } catch (error) {
            console.error("There was an error fetching the exam!", error);
        }
    };


    const handleEditExam = () => {
        // 현재 시험 정보를 수정 폼에 로드
        setTitle(currentExam.title);
        setExamMethod(currentExam.examMethod);
        setOpenDate(currentExam.openDate);
        setExamPeriodStart(currentExam.examPeriodStart);
        setExamPeriodEnd(currentExam.examPeriodEnd);
        setDuration(currentExam.duration);
        setPoints(currentExam.points);
        setScorePublished(currentExam.scorePublished);

        // 수정 화면 보여주기
        showDivExamEdit();
    };


    const handleUpdateMaterial = async () => {
        const formData = new FormData();
        formData.append('material', new Blob([JSON.stringify({ title, content })], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }
        try {
            if (currentMaterial) {
                await axios.put(`/api/teacher/lecture-material/${currentMaterial.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('/api/teacher/lecture-material', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            showsubDivList();
            fetchMaterials();
        } catch (error) {
            console.error("There was an error updating the material!", error);
        }
    };

    const handleUpdateAssignment = async () => {
        const openDate = new Date(document.getElementById('Assignmentrevise_opendate').value).toISOString().slice(0, 19);
        const closeDate = new Date(document.getElementById('Assignmentrevise_closedate').value).toISOString().slice(0, 19);
        const examType = document.getElementById('numbers').value === "1" ? "온라인" : "오프라인";

        const assignmentDTO = {
            id: currentAssignment?.id,
            title,
            content,
            points,
            createdAt: openDate,
            deadline: closeDate,
            examType,
            isScoreVisible: scorePublished,
            lectureId
        };

        const formData = new FormData();
        formData.append('assignment', new Blob([JSON.stringify(assignmentDTO)], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.put(`/api/teacher/assignment/${currentAssignment.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showDivAssignment();
            fetchAssignments();
        } catch (error) {
            console.error("There was an error updating the assignment!", error);
        }
    };

    const handleUpdateExam = async () => {
        const examDTO = {
            id: currentExam?.id,
            title,
            examMethod,
            openDate,
            examPeriodStart,
            examPeriodEnd,
            duration,
            points,
            scorePublished,
            lectureId,
        };

        try {
            await axios.put(`/api/teacher/exam/${currentExam.id}`, examDTO, {
                headers: { 'Content-Type': 'application/json' },
            });
            showDivExam();
            fetchExams();
        } catch (error) {
            console.error("There was an error updating the exam!", error);
        }
    };

    const handleDeleteMaterial = async (id) => {
        try {
            await axios.delete(`/api/teacher/lecture-material/${id}`);
            showsubDivList();
            fetchMaterials();
        } catch (error) {
            console.error("There was an error deleting the material!", error);
        }
    };

    const handleDeleteAssignment = async (id) => {
        try {
            await axios.delete(`/api/teacher/assignment/${id}`);
            showDivAssignment();
            fetchAssignments();
        } catch (error) {
            console.error("There was an error deleting the assignment!", error);
        }
    };

    const handleDeleteExam = async (id) => {
        try {
            await axios.delete(`/api/teacher/exam/${id}`);
            showDivExam();
            fetchExams();
        } catch (error) {
            console.error("There was an error deleting the exam!", error);
        }
    };

    const handleUpdateLectureInfo = async () => {
        try {
            await axios.put(`/api/teacher/lecture/update`, lectureInfo);
            alert("강의 정보가 성공적으로 업데이트되었습니다.");
            showDivHome();
        } catch (error) {
            console.error("There was an error updating the lecture info!", error);
        }
    };

    const handleSave = async () => {
        if (!title || !content || !file) {
            alert("제목, 내용, 파일을 모두 입력하세요.");
            return;
        }

        const lectureMaterialDTO = { title, content };

        const formData = new FormData();
        formData.append('material', new Blob([JSON.stringify(lectureMaterialDTO)], { type: "application/json" }));
        formData.append('file', file);
        formData.append('id', user.id);

        try {
            const response = await axios.post(`/api/teacher/lecture/${lectureId}/lecture-material/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert("새로운 강의 자료가 생성되었습니다.");
                showsubDivList();
                fetchMaterials();
            }
        } catch (error) {
            if (error.response) {
                // 서버 응답이 2xx 범위 밖일 때
                console.error('응답 에러:', error.response.data);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못함
                console.error('요청 에러:', error.request);
            } else {
                // 요청을 만들기 전에 발생한 에러
                console.error('에러:', error.message);
            }
            alert("강의 자료 생성에 실패했습니다. 다시 시도하세요.");
        }
    };

    const handleSaveAssignment = async () => {
        if (!title || !content || !file) {
            alert("제목, 내용, 파일을 모두 입력하세요.");
            return;
        }

        const openDate = new Date(document.getElementById('Assignmentadd_opendate').value).toISOString().slice(0, 19);
        const closeDate = new Date(document.getElementById('Assignmentadd_closedate').value).toISOString().slice(0, 19);
        const examType = document.getElementById('numbers').value === "1" ? "온라인" : "오프라인";

        const assignmentDTO = {
            title,
            content,
            points,
            createdAt: openDate,
            deadline: closeDate,
            examType,
            isScoreVisible: scorePublished,
        };

        const formData = new FormData();
        formData.append('assignment', new Blob([JSON.stringify(assignmentDTO)], { type: "application/json" }));
        formData.append('file', file);
        formData.append('id', user.id);

        try {
            const response = await axios.post(`/api/teacher/lecture/${lectureId}/assignment/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert("과제가 성공적으로 제출되었습니다.");
                showDivAssignment();
                fetchAssignments();
            }
        } catch (error) {
            console.error('응답 에러:', error.response?.data);
            alert("과제 제출에 실패했습니다.");
        }
    };

    const handleSaveExam = async () => {
        const examDTO = {
            title,
            examMethod: examMethod || '온라인',
            openDate,
            examPeriodStart,
            examPeriodEnd,
            duration,
            points,
            scorePublished,
            lectureId
        };

        try {
            const response = await axios.post(`/api/teacher/lecture/${lectureId}/exam/new`, examDTO, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                alert("새로운 시험이 생성되었습니다.");
                showDivExam();
                fetchExams();
            }
        } catch (error) {
            console.error("There was an error saving the exam!", error);
            alert("시험 생성에 실패했습니다. 다시 시도하세요.");
        }
    };

    const handleSaveNotice = async () => {
        const formData = new FormData();
        formData.append('notice', new Blob([JSON.stringify({ title, content, author: user.name })], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }
        formData.append('id', user.id);

        try {
            if (currentNotice) {
                await axios.put(`/api/teacher/subject-notice/${currentNotice.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post(`/api/teacher/lecture/${lectureId}/subject-notice/new`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            showDivSubject();
            fetchNotices();
        } catch (error) {
            console.error("There was an error saving the notice!", error);
        }
    };

    const handleDeleteNotice = async (id) => {
        try {
            await axios.delete(`/api/teacher/subject-notice/${id}`);
            showDivSubject();
            fetchNotices();
        } catch (error) {
            console.error("There was an error deleting the notice!", error);
        }
    };

    const showDivSubjectEdit = () => {
        setVisibleDiv('Subjectedit');
        setTitle(currentNotice?.title || '');
        setContent(currentNotice?.content || '');
        setFile(null);
        setExistingFile(currentNotice?.attachmentPath || null);
    };

    const handleUpdateNotice = async () => {
        const formData = new FormData();
        formData.append('notice', new Blob([JSON.stringify({ title, content, author: user.name })], { type: "application/json" }));
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.put(`/api/teacher/subject-notice/${currentNotice.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showDivSubject();
            fetchNotices();
        } catch (error) {
            console.error("There was an error updating the notice!", error);
        }
    };

    const calculateStatistics = (scores) => {
        const validScores = scores.filter(score => score !== -1); // -1 제외
        const n = validScores.length;

        if (n === 0) return { total: 0, mean: 0, min: 0, max: 0, median: 0, stdDeviation: 0 };

        const sortedScores = [...validScores].sort((a, b) => a - b);
        const total = validScores.reduce((sum, score) => sum + score, 0);
        const mean = total / n;
        const min = sortedScores[0];
        const max = sortedScores[n - 1];
        const median = n % 2 === 0
            ? (sortedScores[n / 2 - 1] + sortedScores[n / 2]) / 2
            : sortedScores[Math.floor(n / 2)];
        const variance = validScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / n;
        const stdDeviation = Math.sqrt(variance);

        return { total, mean, min, max, median, stdDeviation };
    };


    const [statistics, setStatistics] = useState({
        total: 0,
        mean: 0,
        min: 0,
        max: 0,
        median: 0,
        stdDeviation: 0,
    });


    const showDivHome = () => {
        setVisibleDiv('Home');
    };
    const showDivHomerevise = () => {
        setVisibleDiv('Homerevise');
    };

    const showDivSubject = () => {
        setVisibleDiv('Subject');
    };
    const showDivSubjectAdd = () => {
        setVisibleDiv('Subjectadd');
        setTitle('');
        setContent('');
        setFile(null);
        setCurrentNotice(null);
    };
    const showDivSubjectRead = () => {
        setVisibleDiv('Subjectread');
    };

    const showDivAssignment = () => {
        setVisibleDiv('Assignment');
    };
    const showDivAssignmentrevise = () => {
        setVisibleDiv('Assignmentrevise');
    };

    const showDivAssignmentAdd = () => {
        setVisibleDiv('Assignmentadd');
        setTitle('');
        setContent('');
        setPoints('');
        setFile(null);
        setCurrentAssignment(null);
    };

    const showDivAssignmentEstimation = () => {
        setVisibleDiv('AssignmentEstimation');
    }

    const showDivAssignmentRead = () => {
        setVisibleDiv('Assignmentread');
    };
    const showDivAssignmentread = () => {
        setVisibleDiv('Assignmentread');
    };

    const showDivExamRead = () => {
        setVisibleDiv('ExamRead');
    };

    const showDivLecturedata = () => {
        setVisibleDiv('Lecturedata');
        setVisiblesubDiv('List');
    };

    const showDivExam = () => {
        setVisibleDiv('Exam');
    };

    const showDivExamAdd = () => {
        setVisibleDiv('ExamAdd');
        setTitle('');
        setExamMethod('');
        setOpenDate('');
        setExamPeriodStart('');
        setExamPeriodEnd('');
        setDuration('');
        setPoints('');
        setScorePublished(false);
        setCurrentExam(null);
    };

    const showDivExamEdit = () => {
        setVisibleDiv('ExamEdit');
    };

    const showsubDivList = () => {
        setVisiblesubDiv('List');
    };

    const showsubDivView = () => {
        setVisiblesubDiv('View');
    };

    const showDivAssignmentEstimationStudent = () => {
        setVisibleDiv('AssignmentEstimationStudent');
    };

    const showsubDivWrite = () => {
        setTitle('');
        setContent('');
        setFile(null);
        setCurrentMaterial(null);
        setVisiblesubDiv('Write');
    };

    const showsubDivreviseWrite = () => {
        setVisiblesubDiv('reviseWrite');
    };

    const showDivExamQuestionAdd = () => {
        setVisibleDiv('ExamQuestionAdd');
        setQuestionType(''); // 상태 초기화
        setQuestionText('');
        setChoices(['', '', '', '']);
        setCorrectAnswer('');
        setEssayAnswers(['']);
        setTotalPoints(0);
    };

    const handleQuestionTypeChange = (e) => setQuestionType(e.target.value);
    const handleChoiceChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };
    const addEssayAnswer = () => setEssayAnswers([...essayAnswers, '']);
    const handleEssayAnswerChange = (index, value) => {
        const newAnswers = [...essayAnswers];
        newAnswers[index] = value;
        setEssayAnswers(newAnswers);
    };

    const handleSaveQuestion = async () => {
        const questionDTO = {
            type: questionType,
            text: questionText,
            points: totalPoints,
            answers: questionType === 'multipleChoice' ? choices : essayAnswers,
            correctAnswer: questionType === 'multipleChoice' ? correctAnswer : null,
        };

        try {
            await axios.post(`/api/teacher/exams/${currentExam.id}/questions`, questionDTO);
            alert("문제가 성공적으로 추가되었습니다.");
            showDivExam();
        } catch (error) {
            console.error("문제 추가 중 오류가 발생했습니다.", error);
            alert("문제 추가에 실패했습니다.");
        }
    };

    const showDivExamQuestionEdit = (question) => {
        setEditingQuestion(question);
        setVisibleDiv('ExamQuestionEdit');
    };

    const handleUpdateQuestion = async () => {
        try {
            await axios.put(`/api/teacher/exams/${currentExam.id}/questions/${editingQuestion.id}`, editingQuestion);
            alert("문제가 성공적으로 수정되었습니다.");
            showDivExam();
        } catch (error) {
            console.error("문제 수정 중 오류가 발생했습니다.", error);
            alert("문제 수정에 실패했습니다.");
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            await axios.delete(`/api/teacher/exams/${currentExam.id}/questions/${questionId}`);
            alert("문제가 성공적으로 삭제되었습니다.");
            showDivExam();
        } catch (error) {
            console.error("문제 삭제 중 오류가 발생했습니다.", error);
            alert("문제 삭제에 실패했습니다.");
        }
    };

    const handleStudentClick = (student) => {
        setCurrentStudent(student);
        setStudentId(student.id);
        setVisibleDiv('AssignmentEstimationStudent');
    };


    const showDivExamEstimation = () => {
        setVisibleDiv('ExamEstimation');
    };

    const handleSaveEvaluation = async () => {
        const { score, evaluationComment } = submissionDetails;

        if (!score || !evaluationComment) {
            alert("점수와 평가 의견을 모두 입력해주세요.");
            return;
        }

        const evaluationData = {
            score: parseInt(score),  // 점수를 정수로 변환
            evaluationComment: evaluationComment
        };

        try {
            const response = await axios.post(
                `/api/teacher/assignment/${currentAssignment.id}/student/${currentStudent.id}/evaluation`,
                evaluationData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                alert("평가가 성공적으로 저장되었습니다.");
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error during evaluation submission:", error);
            alert("평가 저장에 실패했습니다.");
        }
    };

    const fetchStudentsWithScoresByExam = async () => {
        try {
            if (currentExam && currentExam.id) {
                const response = await axios.get(`/api/student/exams/${currentExam.id}/answers/students-with-scores`, {
                    params: { lectureId },
                });
                const fetchedStudents = response.data;

                setStudents(fetchedStudents);

                const scores = fetchedStudents
                    .map(student => student.examAnswer?.score)
                    .filter(score => score !== -1); // 점수 -1 제외

                const stats = calculateStatistics(scores);
                setStatistics(stats);
            } else {
                console.warn("No exam selected");
            }
        } catch (error) {
            console.error("Error fetching students with scores:", error);
        }
    };



    useEffect(() => {
        if (visibleDiv === 'ExamEstimation' && currentExam) { // currentExam이 설정된 경우에만 호출
            fetchStudentsWithScoresByExam(); // 학생 목록 가져오기
        }
    }, [visibleDiv, currentExam]);

    useEffect(() => {
        console.log("VisibleDiv:", visibleDiv);
        if (visibleDiv === 'ExamEstimation' && currentExam) {
            console.log("Fetching students for exam:", currentExam.id);
            fetchStudentsWithScoresByExam();
        }
    }, [visibleDiv, currentExam]);




    // 영상 업로드
    const [videoList, setVideoList] = useState([]);
    const [lectureTitle, setLectureTitle] = useState(''); // 강의 제목 상태 추가
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    // 파일 변경 처리
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'video/mp4') {
            alert('MP4 파일만 업로드 가능합니다.');
            setVideoFile(null);
            return;
        }
        setVideoFile(selectedFile);
    };

    // 강의 제목 변경 처리
    const handleTitleChange = (event) => {
        setLectureTitle(event.target.value);
    };

    const uploadFile = async () => {
        if (!videoFile) {
            alert('파일을 선택하시오');
            return;
        }

        if (!user || !user.id) {
            alert('선생님의 ID가 없습니다.');
            return;
        }

        if (!lectureId) {
            alert('강의 ID가 없습니다.');
            return;
        }

        if (!lectureTitle) {
            alert('강의 제목을 입력하시오.');
            return;
        }

        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('title', lectureTitle); // 제목도 추가

        // API 요청 URL 수정
        try {
            const response = await axios.post(`/api/video/videoUpload/${user.id}/${lectureId}`, formData);
            setVideoUrl(response.data);
            alert('업로드 성공');
            fetchVideoList(user.id); // 업로드 후 강의 목록 갱신
        } catch (error) {
            console.error('Error:', error);
            alert('업로드 실패');
        }
    };

    const showVideoLecture = () => {
        setVisibleDiv('VideoManagement');
    };

    const fetchVideoList = async (teacherId) => {
        try {
            const response = await axios.get(`/api/video/videoList/${teacherId}`);
            setVideoList(response.data);
        } catch (error) {
            console.error('Error fetching video list:', error);
        }
    };

    useEffect(() => {
        if (lectureId && user && user.id) {
            fetchVideoList(user.id); // Fetch videos for the new lecture
            setVideoUrl(''); // Clear videoUrl when changing lectures
        }
    }, [lectureId, user]);

    // 여기까지 영상 업로드


    return (
        <div id="App">
            <div id="menu_teacherportal">
                <div id="teacher_info">
                    <img src={logo}/>
                    <h2>고슴도치</h2>
                </div>
                <ul>
                    <li
                        onClick={() => handleClick(0, showDivHome)}
                        style={{ backgroundColor: selectedIndex === 0 ? '#BCBCBC' : '#D9D9D9' }}
                    >
                        <a>교과정보</a>
                    </li>
                    <li
                        onClick={() => handleClick(1, showVideoLecture)}
                        style={{ backgroundColor: selectedIndex === 1 ? '#BCBCBC' : '#D9D9D9' }}
                    >
                        <a>강의관리</a>
                    </li>
                    <li
                        onClick={() => handleClick(2, showDivLecturedata)}
                        style={{ backgroundColor: selectedIndex === 2 ? '#BCBCBC' : '#D9D9D9' }}
                    >
                        <a>수업자료</a>
                    </li>
                    <li
                        onClick={() => handleClick(3, showDivAssignment)}
                        style={{ backgroundColor: selectedIndex === 3 ? '#BCBCBC' : '#D9D9D9' }}
                    >
                        <a>과제조회/제출</a>
                    </li>
                    <li
                        onClick={() => handleClick(4, showDivExam)}
                        style={{ backgroundColor: selectedIndex === 4 ? '#BCBCBC' : '#D9D9D9' }}
                    >
                        <a>시험 관리</a>
                    </li>
                    <li
                        onClick={() => handleClick(5, showDivSubject)}
                        style={{ backgroundColor: selectedIndex === 5 ? '#BCBCBC' : '#D9D9D9' }}
                    >
                        <a>과목공지</a>
                    </li>
                    <li onClick={() => navigate('/teachermain', {state: {user: user}})}><a>강의실 나가기</a></li>
                </ul>
            </div>
            <div id="teacherportal_header">
                <div id="menu_btn" />
                <div id="home_btn" />
            </div>
            <div id="contents_teacherportal">
                {visibleDiv === 'Home' && (
                    <>
                        <div id="Home_teacherportal">
                            <div id="info">
                                <h2>기본정보</h2>
                                <button id="revise" onClick={showDivHomerevise}>수정</button>
                                <hr/>
                                <div id="infobox">
                                    <div id="subjecttitle">
                                        <h2>과목명</h2>
                                        <div id="infobox_subjecttitle">{lectureInfo.name}</div>
                                    </div>
                                    <div id="lecturetime">
                                        <h2>강의 시간</h2>
                                        <div id="infobox_lecturetime">
                                            {lectureInfo.lectureTimeDTOList && lectureInfo.lectureTimeDTOList.map((time, index) => (
                                                <div key={index}>{time.day}: {time.startTime} - {time.endTime}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="lectureplace">
                                        <h2>강의 장소</h2>
                                        <div id="infobox_lectureplace">{lectureInfo.lectureLocation}</div>
                                    </div>
                                    <div id="teacher">
                                        <h2>담당 선생님</h2>
                                        <div id="infobox_teacher">{lectureInfo.teacherName}</div>
                                    </div>
                                </div>
                            </div>
                            <div id="subcontent">
                                <h2>세부내용</h2>
                                <div id="info_subcontent">
                                    <div id="content_subcontent">
                                        <div id="blank_content_subcontent"/>
                                        {lectureInfo.lectureDetails}
                                    </div>
                                </div>
                            </div>
                            <div id="weekplan">
                                <h2>주별계획</h2>
                                <div id="info_weekplan">
                                    <div id="content_weekplan">
                                        <div id="blank_content_weekplan"/>
                                        {lectureInfo.lectureWeeklyPlan}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'VideoManagement' && (
                    <>
                        <div id="VideoManagement_teacherportal">
                            <h2>강의 관리</h2>
                            <div id="UploadVideo_teacherportal">
                                <div id="blank_UploadVideo"/>
                                <input
                                    type="text"
                                    id="title_UploadVideo"
                                    placeholder="강의 제목을 입력하세요"
                                    value={lectureTitle}
                                    onChange={handleTitleChange}
                                /> <br/>
                                <input type="file" id="file_UploadVideo" accept="video/mp4" onChange={handleFileChange} />
                                <button onClick={uploadFile}>업로드</button>

                            </div>
                            <h2>업로드된 영상 목록</h2>
                            <ul>
                                {videoList
                                    .filter(video => video.lectureId === lectureId)
                                    .map(video => (
                                        <li key={video.id}>
                                            <h3
                                                style={{ cursor: 'pointer', color: 'blue' }}
                                                onClick={() => {
                                                    setVideoUrl(video.videoUrl);
                                                }}
                                            >
                                                {video.title}
                                            </h3>
                                            파일 이름: {video.fileName}
                                        </li>
                                    ))}
                            </ul>
                            <div id="Video_teacherportal">
                                {videoUrl && (
                                    <div id="video_UploadVideo">
                                        <h2>비디오 강의</h2>
                                        <video width="600" controls key={videoUrl}>
                                            <source src={videoUrl} type="video/mp4" />
                                            해당 브라우저에서 비디오 재생이 지원되지 않습니다.
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'Homerevise' && (
                    <>
                        <div id="Homerevise_teacherportal">
                            <div id="info">
                                <h2>기본정보</h2>
                                <button id="save" onClick={handleUpdateLectureInfo}>저장</button>
                                <hr/>
                                <div id="infobox">
                                    <div id="subjecttitle">
                                        <h2>과목명</h2>
                                        <input type="text" id="Homerevise_subjecttitle" value={lectureInfo.name || ''}
                                               onChange={(e) => setLectureInfo({
                                                   ...lectureInfo,
                                                   name: e.target.value
                                               })}/>
                                    </div>
                                    <div id="lecturetime">
                                        <h2>강의 시간</h2>
                                        {lectureInfo.lectureTimeDTOList && lectureInfo.lectureTimeDTOList.map((time, index) => (
                                            <div key={index}>
                                                <input type="text" value={time.day} onChange={(e) => {
                                                    const newLectureTimeDTOList = [...lectureInfo.lectureTimeDTOList];
                                                    newLectureTimeDTOList[index].day = e.target.value;
                                                    setLectureInfo({
                                                        ...lectureInfo,
                                                        lectureTimeDTOList: newLectureTimeDTOList
                                                    });
                                                }}/>
                                                <input type="text" value={time.startTime} onChange={(e) => {
                                                    const newLectureTimeDTOList = [...lectureInfo.lectureTimeDTOList];
                                                    newLectureTimeDTOList[index].startTime = e.target.value;
                                                    setLectureInfo({
                                                        ...lectureInfo,
                                                        lectureTimeDTOList: newLectureTimeDTOList
                                                    });
                                                }}/>
                                                <input type="text" value={time.endTime} onChange={(e) => {
                                                    const newLectureTimeDTOList = [...lectureInfo.lectureTimeDTOList];
                                                    newLectureTimeDTOList[index].endTime = e.target.value;
                                                    setLectureInfo({
                                                        ...lectureInfo,
                                                        lectureTimeDTOList: newLectureTimeDTOList
                                                    });
                                                }}/>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="lectureplace">
                                        <h2>강의 장소</h2>
                                        <input type="text" id="Homerevise_lectureplace"
                                               value={lectureInfo.lectureLocation || ''}
                                               onChange={(e) => setLectureInfo({
                                                   ...lectureInfo,
                                                   lectureLocation: e.target.value
                                               })}/>
                                    </div>
                                    <div id="teacher">
                                        <h2>담당 선생님</h2>
                                        <input type="text" id="Homerevise_teacher" value={lectureInfo.teacherName || ''}
                                               onChange={(e) => setLectureInfo({
                                                   ...lectureInfo,
                                                   teacherName: e.target.value
                                               })}/>
                                    </div>
                                </div>
                            </div>
                            <div id="subcontent">
                                <h2>세부내용</h2>
                                <input type="text" id="Homerevise_subcontent" value={lectureInfo.lectureDetails || ''}
                                       onChange={(e) => setLectureInfo({
                                           ...lectureInfo,
                                           lectureDetails: e.target.value
                                       })}/>
                            </div>
                            <div id="weekplan">
                                <h2>주별계획</h2>
                                <input type="text" id="Homerevise_weekplan" value={lectureInfo.lectureWeeklyPlan || ''}
                                       onChange={(e) => setLectureInfo({
                                           ...lectureInfo,
                                           lectureWeeklyPlan: e.target.value
                                       })}/>
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'Subject' && (
                    <div id="Subject_teacherportal">
                        <div id="but">
                            <h2>과목 공지</h2>
                            <button id="add_btn" onClick={showDivSubjectAdd}>추가</button>
                        </div>
                        <div id="Subject">
                            <div id="cate_Subject">
                                <div id="no">번호</div>
                                <div id="title">제목</div>
                                <div id="author">작성자</div>
                                <div id="opendate">공개일</div>
                            </div>
                            {notices.map(notice => (
                                <div key={notice.id} id="body_Subject">
                                    <div id="Sno">{notice.id}</div>
                                    <div id="Stitle" onClick={() => handleNoticeClick(notice.id)}>{notice.title}</div>
                                    <div id="Sauthor">{notice.author}</div>
                                    <div id="Sopendate">{new Date(notice.createdAt).toISOString().slice(0, 19)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {visibleDiv === 'Subjectadd' && (
                    <div id="Subjectadd_teacherportal">
                        <div id="but">
                            <h2>과목 공지</h2>
                        </div>
                        <div id="title_Subjectadd">
                            <h2>제목</h2>
                            <input type="text" id="Subjectadd_title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div id="content_Subjectadd">
                            <input type="text" id="Subjectadd_content" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div id="file_Subjectadd">
                            <input type="file" id="Subjectadd_file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div id="buttons_Subjectadd">
                            <button id="save" onClick={handleSaveNotice}>저장</button>
                            <button id="back" onClick={showDivSubject}>취소</button>
                        </div>
                    </div>
                )}
                {visibleDiv === 'Subjectread' && (
                    <div id="Subjectread_teacherportal">
                        <div id="but">
                            <h2>과목 공지</h2>
                        </div>
                        <div id="title_Subjectread">
                            <h2>제목</h2>
                            <div id="Subjectread_title">{currentNotice?.title}</div>
                        </div>
                        <div id="content_Subjectread">
                            <div id="Subjectread_content">{currentNotice?.content}</div>
                        </div>
                        <div id="file_Subjectread">
                            <div id="Subjectread_file">
                                <a href={currentNotice?.attachmentPath} download>첨부파일</a>
                            </div>
                        </div>
                        <div id="buttons_Subjectread">
                            <button id="revise" onClick={showDivSubjectEdit}>수정</button>
                            <button id="delete" onClick={() => handleDeleteNotice(currentNotice.id)}>삭제</button>
                            <button id="back" onClick={showDivSubject}>목록</button>
                        </div>
                    </div>
                )}
                {visibleDiv === 'Subjectedit' && (
                    <div id="Subjectedit_teacherportal">
                        <div id="but">
                            <h2>과목 공지 수정</h2>
                        </div>
                        <div id="title_Subjectedit">
                            <h2>제목</h2>
                            <input type="text" id="Subjectedit_title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div id="content_Subjectedit">
                            <textarea id="Subjectedit_content" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div id="file_Subjectedit">
                            <input type="file" id="Subjectedit_file" onChange={(e) => setFile(e.target.files[0])} />
                            {existingFile && <div><a href={existingFile} download>기존 첨부파일</a></div>}
                        </div>
                        <div id="buttons_Subjectedit">
                            <button id="save" onClick={handleUpdateNotice}>저장</button>
                            <button id="back" onClick={showDivSubject}>취소</button>
                        </div>
                    </div>
                )}
                {visibleDiv === 'Assignment' && (
                    <>
                        <div id="Assignment_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                                <button id="add_btn" onClick={showDivAssignmentAdd}>
                                    추가
                                </button>
                            </div>
                            <div id="Assignment">
                                <div id="cate_Assignment">
                                    <div id="no">번호</div>
                                    <div id="title">제목</div>
                                    <div id="submission">제출인원</div>
                                    <div id="score">배점</div>
                                    <div id="estimation">평가</div>
                                    <div id="opendate">공개일</div>
                                    <div id="closedate">마감일</div>
                                </div>
                                {assignments.map(assignment => (
                                    <div key={assignment.id} id="body_Assignment">
                                        <div id="Ano">{assignment.id}</div>
                                        <div id="Atitle"
                                             onClick={() => handleAssignmentClick(assignment.id)}>{assignment.title}</div>
                                        <div id="Asubmission">{assignment.submissionCount}명</div>
                                        <div id="Ascore">{assignment.points}</div>
                                        <div id="Aestimation">평가</div>
                                        <div id="Aopendate">{assignment.createdAt}</div>
                                        <div id="Aclosedate">{assignment.deadline}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'Assignmentadd' && (
                    <>
                        <div id="Assignmentadd_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                            </div>
                        </div>
                        <div id="title_Assignmentadd">
                            <h2>제목</h2>
                            <input type="text" id="Assignmentadd_title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div id="method_Assignmentadd">
                            <h2>제출 방식</h2>
                            <select id="numbers">
                                <option value="1">온라인</option>
                                <option value="2">오프라인</option>
                            </select>
                        </div>
                        <div id="date_Assignmentadd">
                            <h2 id="open">공개일</h2>
                            <input type="date" id="Assignmentadd_opendate"/>
                            <h2 id="close">마감일</h2>
                            <input type="date" id="Assignmentadd_closedate"/>
                        </div>
                        <div id="score_Assignmentadd">
                            <h2>배점</h2>
                            <input type="text" id="Assignmentadd_score" value={points}
                                   onChange={(e) => setPoints(e.target.value)}/>
                            <h2>점수 공개</h2>
                            <input
                                id="Assignmentadd_scorePublished"
                                type="checkbox"
                                checked={scorePublished}
                                onChange={(e) => setScorePublished(e.target.checked)}
                            />
                        </div>
                        <div id="content_Assignmentadd">
                            <input type="text" id="Assignmentadd_content" value={content}
                                   onChange={(e) => setContent(e.target.value)}/>
                        </div>
                        <div id="file_Assignmentadd">
                            <input type="file" id="Assignmentadd_file" onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                        <div id="buttons_Assignmentadd">
                            <button id="save" onClick={handleSaveAssignment}>
                                저장
                            </button>
                            <button id="back" onClick={showDivAssignment}>
                                취소
                            </button>
                        </div>
                    </>
                )}
                {visibleDiv === 'Assignmentrevise' && (
                    <>
                        <div id="Assignmentrevise_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                            </div>
                        </div>
                        <div id="title_Assignmentrevise">
                            <h2>제목</h2>
                            <input type="text" id="Assignmentrevise_title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div id="method_Assignmentrevise">
                            <h2>제출 방식</h2>
                            <select id="numbers">
                                <option value="1">온라인</option>
                                <option value="2">오프라인</option>
                            </select>
                        </div>
                        <div id="date_Assignmentrevise">
                            <h2 id="open">공개일</h2>
                            <input type="date" id="Assignmentrevise_opendate"/>
                            <h2 id="close">마감일</h2>
                            <input type="date" id="Assignmentrevise_closedate"/>
                        </div>
                        <div id="score_Assignmentrevise">
                            <h2>배점</h2>
                            <input type="text" id="Assignmentrevise_score" value={points}
                                   onChange={(e) => setPoints(e.target.value)}/>
                            <h2>점수 공개</h2>
                            <input
                                id="Assignmentrevise_scorePublished"
                                type="checkbox"
                                checked={scorePublished}
                                onChange={(e) => setScorePublished(e.target.checked)}
                            />
                        </div>
                        <div id="content_Assignmentrevise">
                            <textarea id="Assignmentrevise_content" value={content}
                                      onChange={(e) => setContent(e.target.value)}/>
                        </div>
                        <div id="file_Assignmentrevise">
                            <input type="file" id="Assignmentrevise_file" onChange={(e) => setFile(e.target.files[0])}/>
                            <div id="existing_Assignmentrevise_file">
                                {existingFile && <div><a href={existingFile} download>기존 첨부파일</a></div>}
                            </div>
                        </div>
                        <div id="buttons_Assignmentrevise">
                            <button id="revise_save" onClick={handleUpdateAssignment}>
                                저장
                            </button>
                            <button id="back" onClick={showDivAssignment}>
                                취소
                            </button>
                        </div>
                    </>
                )}
                {visibleDiv === 'Assignmentread' && (
                    <>
                        <div id="Assignmentread_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                            </div>
                        </div>
                        <div id="title_Assignmentread">
                            <h2>제목</h2>
                            <div id="Assignmentread_title">{currentAssignment?.title}</div>
                        </div>
                        <div id="method_Assignmentread">
                            <h2>제출 방식</h2>
                            <div id="Assignmentread_method">온라인</div>
                        </div>
                        <div id="date_Assignmentread">
                            <h2 id="open">공개일</h2>
                            <div id="Assignmentread_opendate">{currentAssignment?.createdAt}</div>
                            <h2 id="close">마감일</h2>
                            <div id="Assignmentread_closedate">{currentAssignment?.deadline}</div>
                        </div>
                        <div id="score_Assignmentread">
                            <h2>배점</h2>
                            <div id="Assignmentread_score">{currentAssignment?.points}</div>
                            <h2>점수 공개</h2>
                            <div id="Assignmentread_scorePublished">
                                {currentAssignment?.isScoreVisible ? 'YES' : 'NO'}
                            </div>
                        </div>
                        <div id="content_Assignmentread">
                            <div id="Assignmentread_content">
                                <div id="padding_Assignmentread_content"/>
                                {currentAssignment?.content}
                            </div>
                        </div>
                        <div id="file_Assignmentread">
                            <div id="Assignmentread_file"><a href={currentAssignment?.attachmentPath} download>첨부파일</a>
                            </div>
                        </div>
                        <div id="buttons_Assignmentread">
                            <button id="save" onClick={showDivAssignmentrevise}>
                                수정
                            </button>
                            <button id="delete" onClick={() => handleDeleteAssignment(currentAssignment.id)}>
                                삭제
                            </button>
                            <button id="estimation" onClick={showDivAssignmentEstimation}>
                                평가
                            </button>
                            <button id="back" onClick={showDivAssignment}>
                                목록
                            </button>
                        </div>
                    </>
                )}
                {visibleDiv === 'AssignmentEstimation' && (
                    <>
                        <div id="AssignmentEstimation_teacherportal">
                            <div id="but">
                                <h2>과제 조회/제출</h2>
                            </div>
                            <div id="AssignmentEstimation">
                                <div id="cate_AssignmentEstimation">
                                    <div id="name">이름</div>
                                    <div id="StudentID">ID</div>
                                    <div id="submit">제출</div>
                                    <div id="score">점수</div>
                                    <div id="opinion">평가의견</div>
                                </div>

                                {students.length > 0 ? (
                                    students.map((student) => (
                                        <div id="info_AssignmentEstimation" key={student.studentId}>
                                            <div
                                                id="Aname"
                                                onClick={() => {
                                                    if (
                                                        student.assignmentSubmission &&
                                                        (student.assignmentSubmission.submissionStatus === '정상제출' ||
                                                            student.assignmentSubmission.submissionStatus === '평가 완료')
                                                    ) {
                                                        handleStudentClick(student);
                                                    }
                                                }}
                                                style={{
                                                    cursor:
                                                        student.assignmentSubmission &&
                                                        (student.assignmentSubmission.submissionStatus === '정상제출' ||
                                                            student.assignmentSubmission.submissionStatus === '평가 완료')
                                                            ? 'pointer'
                                                            : 'default',
                                                }}
                                            >
                                                {student.studentName}
                                            </div>
                                            <div id="AStudentID">{student.studentId}</div>
                                            <div id="Asubmit">{student.submissionStatus}</div>
                                            <div id="Ascore">{student.score}</div> {/* 점수 출력 */}
                                            <div id="Aopinion">{student.evaluationComment}</div> {/* 평가 의견 출력 */}
                                        </div>
                                    ))
                                ) : (
                                    <div>학생 목록을 불러오는 중입니다...</div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {visibleDiv === 'AssignmentEstimationStudent' && (
                    <div id="AssignmentEstimationStudent_teacherportal">
                        <div id="but">
                            <h2>과제 조회/제출</h2>
                        </div>
                        <div id="AssignmentEstimationStudent">
                            <div id="title_AssignmentEstimationStudent">
                                <h2>제출 제목</h2>
                                <div id="StudentWrite">
                                    {submissionDetails.title || '제출된 과제가 없습니다.'}
                                </div>
                            </div>
                            <div id="content_AssignmentEstimationStudent">
                                <h2>제출 내용</h2>
                                <div id="StudentContent">
                                    {submissionDetails.content || '내용이 없습니다.'}
                                </div>
                            </div>
                            <div id="file_AssignmentEstimationStudent">
                                <h2>첨부 파일</h2>
                                <div id="StudentFile">
                                    {submissionDetails.attachmentPath ? (
                                        <a href={submissionDetails.attachmentPath} download>첨부파일 다운로드</a>
                                    ) : (
                                        <p>첨부 파일이 없습니다.</p>
                                    )}
                                </div>
                            </div>
                            <div id="Estimation_AssignmentEstimationStudent">
                                <h2>평가</h2>
                                <input
                                    type="text"
                                    id="ScoreOfAssignment"
                                    placeholder="점수를 입력하세요"
                                    value={submissionDetails.score || ''}  // 기존 점수를 입력 폼에 표시
                                    onChange={(e) => setSubmissionDetails({
                                        ...submissionDetails,
                                        score: e.target.value
                                    })}  // 값이 변경되면 상태 업데이트
                                />
                            </div>
                            <div id="Opinion_AssignmentEstimationStudent">
                                <h2>평가 의견</h2>
                                <textarea
                                    id="OpinionOfAssignment"
                                    placeholder="평가 의견을 입력하세요"
                                    value={submissionDetails.evaluationComment || ''} // 기존 평가 의견을 입력 폼에 표시
                                    onChange={(e) => setSubmissionDetails({
                                        ...submissionDetails,
                                        evaluationComment: e.target.value
                                    })}  // 값이 변경되면 상태 업데이트
                                />
                            </div>
                            <div id="buttons_AssignmentEstimationStudent">
                                <button id="AssignmentEstimationStudent_button" onClick={handleSaveEvaluation}>저장</button>
                            </div>
                        </div>
                    </div>
                )}

                {visibleDiv === 'Lecturedata' && (
                    <>
                        <div id="Lecturedata_teacherportal">
                            <div id="button_List_teacherportal">
                                <h2>수업자료실</h2>
                                <button id="newRegister" onClick={showsubDivWrite}>
                                    <span>새로 등록하기</span>
                                </button>
                            </div>
                            <div id="Lecturedata">
                                {visiblesubDiv === 'List' && (
                                    <div id="List_teacherportal">
                                        <div id="cate_List">
                                            <div id="no">No</div>
                                            <div id="title">제목</div>
                                            <div id="writer">작성자</div>
                                            <div id="writedate">작성일자</div>
                                        </div>
                                        {materials.map(material => (
                                            <div key={material.id} id="body_List">
                                                <div id="body_no">{material.id}</div>
                                                <div id="body_title" onClick={() => handleMaterialClick(material.id)}>
                                                    {material.title}
                                                </div>
                                                <div id="body_writer">{material.author}</div>
                                                <div id="body_writedate">{material.createdAt}</div>
                                            </div>
                                        ))}

                                    </div>
                                )}
                                {visiblesubDiv === 'View' && (
                                    <div id="View_teacherportal">
                                        <div id="View">
                                            <div id="View_title">
                                                <h2>제목</h2>
                                                <div id="title_View">{currentMaterial?.title}</div>
                                            </div>
                                            <div id="content_View">
                                                {currentMaterial?.content}
                                            </div>
                                            <div id="file_View">
                                                <a href={currentMaterial?.attachmentPath} download>첨부파일</a>
                                            </div>
                                            <button id="back" onClick={showsubDivList}>
                                                <span>뒤로가기</span>
                                            </button>
                                            <button id="delete" onClick={() => handleDeleteMaterial(currentMaterial.id)}>
                                                <span>삭제</span>
                                            </button>
                                            <button id="revise" onClick={showsubDivreviseWrite}>
                                                <span>수정</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {visiblesubDiv === 'Write' && (
                                    <div id="Write_teacherportal">
                                        <div id="Write">
                                            <div id="title_Write">
                                                <h2>제목</h2>
                                                <input type="text" id="titleWrite" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                            <div id="content_Write">
                                                <textarea id="contentWrite" placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}/>
                                            </div>
                                            <div id="file_Write">
                                                <input type="file" id="fileWrite" onChange={(e) => setFile(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <button id="save" onClick={handleSave}>
                                            <span>저장</span>
                                        </button>
                                    </div>
                                )}
                                {visiblesubDiv === 'reviseWrite' && (
                                    <div id="reviseWrite_teacherportal">
                                        <div id="reviseWrite">
                                            <div id="title_reviseWrite">
                                                <h2>제목</h2>
                                                <input type="text" id="titlereviseWrite" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                            <div id="content_reviseWrite">
                                                <textarea id="contentreviseWrite" value={content} onChange={(e) => setContent(e.target.value)} />
                                            </div>
                                            <div id="file_reviseWrite">
                                                <input type="file" id="filereviseWrite" onChange={(e) => setFile(e.target.files[0])} />
                                                {existingFile && <div><a href={existingFile} download>기존 첨부파일</a></div>}
                                            </div>
                                        </div>
                                        <button id="revise_save" onClick={handleUpdateMaterial}>
                                            <span>저장</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'Exam' && (
                    <>
                        <div id="Exam_teacherportal">
                            <div id="but">
                                <h2>시험 관리</h2>
                                <button id="add_btn" onClick={showDivExamAdd}>추가</button>
                            </div>
                            <div id="Exam">
                                <div id="cate_Exam">
                                    <div id="no"><span>번호</span></div>
                                    <div id="title">제목</div>
                                    <div id="method">시험 방식</div>
                                    <div id="opendate">공개일</div>
                                    <div id="examperiod">응시 기간</div>
                                    <div id="duration">시험 시간</div>
                                    <div id="score">배점</div>
                                    <div id="scorePublished">점수 공개 여부</div>
                                </div>
                                {exams.map(exam => (
                                    <div key={exam.id} id="body_Exam">
                                        <div id="Eno">{exam.id}</div>
                                        <div id="Etitle" onClick={() => handleExamClick(exam.id)}>{exam.title}</div>
                                        <div id="Emethod">{exam.examMethod || '온라인'}</div>
                                        <div id="Eopendate">{exam.openDate}</div>
                                        <div id="Eexamperiod">{exam.examPeriodStart} ~ {exam.examPeriodEnd}</div>
                                        <div id="Eduration">{exam.duration}분</div>
                                        <div id="Escore">{exam.points}</div>
                                        <div id="EscorePublished">{exam.scorePublished ? 'YES' : 'NO'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {visibleDiv === 'ExamAdd' && (
                    <>
                        <div id="ExamAdd_teacherportal">
                            <div id="but">
                                <h2>시험 관리</h2>
                            </div>
                        </div>
                        <div id="title_ExamAdd">
                            <h2>제목</h2>
                            <input type="text" id="ExamAdd_title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div id="method_ExamAdd">
                            <h2>시험 방식</h2>
                            <select id="ExamAdd_method" value={examMethod} onChange={(e) => setExamMethod(e.target.value)}>
                                <option value="온라인">온라인</option>
                                <option value="오프라인">오프라인</option>
                            </select>
                        </div>
                        <div id="opendate_ExamAdd">
                            <h2>공개일</h2>
                            <input type="datetime-local" id="ExamAdd_opendate" value={openDate} onChange={(e) => setOpenDate(e.target.value)} />
                        </div>
                        <div id="examperiod_ExamAdd">
                            <h2>응시 기간</h2>
                            <input type="datetime-local" id="ExamAdd_examperiodstart" value={examPeriodStart} onChange={(e) => setExamPeriodStart(e.target.value)} />
                            <h2 id="betweenLetter">~</h2>
                            <input type="datetime-local" id="ExamAdd_examperiodend" value={examPeriodEnd} onChange={(e) => setExamPeriodEnd(e.target.value)} />
                        </div>
                        <div id="duration_ExamAdd">
                            <h2>시험 시간</h2>
                            <input type="number" id="ExamAdd_duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </div>
                        <div id="score_ExamAdd">
                            <h2>배점</h2>
                            <input type="number" id="ExamAdd_score" value={points} onChange={(e) => setPoints(e.target.value)} />
                        </div>
                        <div id="scorePublished_ExamAdd">
                            <h2>점수 공개 여부</h2>
                            <input type="checkbox" id="ExamAdd_scorePublished" checked={scorePublished}
                                   onChange={(e) => setScorePublished(e.target.checked)}/>
                        </div>
                        <div id="content_ExamAdd">
                            <textarea id="ExamAdd_content"/>
                        </div>
                        <div id="buttons_ExamAdd">
                            <button id="save" onClick={handleSaveExam}>
                                저장
                            </button>
                            <button id="back" onClick={showDivExam}>
                                취소
                            </button>
                        </div>
                    </>
                )}

                {visibleDiv === 'ExamRead' && (
                    <>
                        <div id="ExamRead_teacherportal">
                            <div id="but">
                                <h2>시험 관리</h2>
                                <button id="add_question_btn" onClick={showDivExamQuestionAdd}>문제 추가</button>
                            </div>
                        </div>
                        <div id="title_ExamRead">
                            <h2>제목</h2>
                            <div id="ExamRead_title">{currentExam?.title}</div>
                        </div>
                        <div id="method_ExamRead">
                            <h2>시험 방식</h2>
                            <div id="ExamRead_method">{currentExam?.examMethod}</div>
                        </div>
                        <div id="opendate_ExamRead">
                            <h2>공개일</h2>
                            <div id="ExamRead_opendate">{currentExam?.openDate}</div>
                        </div>
                        <div id="examperiod_ExamRead">
                            <h2>응시 기간</h2>
                            <div
                                id="ExamRead_examperiod">{currentExam?.examPeriodStart} ~ {currentExam?.examPeriodEnd}
                            </div>
                        </div>
                        <div id="duration_ExamRead">
                            <h2>시험 시간</h2>
                            <div id="ExamRead_duration">{currentExam?.duration}분</div>
                        </div>
                        <div id="score_ExamRead">
                            <h2>배점</h2>
                            <div id="ExamRead_score">{currentExam?.points}</div>
                        </div>
                        <div id="scorePublished_ExamRead">
                            <div id="ExamRead_scorePublished">
                                <h2>점수 공개 여부</h2>
                                <div className="ExamRead_scorePublished_about">{currentExam?.scorePublished ? '네' : '아니요'}</div>
                            </div>
                        </div>
                        <div id="question_list">
                            <h3>문제 목록</h3>
                            <div className="bodyBox_ExamQuestion">
                            {currentExam?.questions.map((question, index) => (
                                <div key={question.id} id="body_ExamQuestion">
                                    <div id="Qno">문제 {index + 1}</div>
                                    <div id="Qtext">문제 내용: {question.text}</div>
                                    <div id="Qpoints">배점: {question.points}점</div>

                                    {/* 보기 표시 */}
                                    {question.type === 'multipleChoice' && (
                                        <div id="Qchoices">
                                            <h4>보기:</h4>
                                            {question.answers.map((choice, i) => (
                                                <div key={i} id="Qchoice">
                                                    보기 {i + 1}: {choice}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 서술형 정답 표시 */}
                                    {question.type === 'essay' && (
                                        <div id="QessayAnswers">
                                            <h4>정답:</h4>
                                            {question.answers.map((answer, i) => (
                                                <div key={i} id="QessayAnswer">
                                                    정답 {i + 1}: {answer}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 4지선다형 정답 표시 */}
                                    {question.type === 'multipleChoice' && (
                                        <div id="QcorrectAnswers">
                                            <h4>정답:</h4>
                                            <div id="QcorrectAnswer">보기 {question.correctAnswer}</div>
                                        </div>
                                    )}

                                    <div id="Qactions">
                                        <button onClick={() => showDivExamQuestionEdit(question)}>수정</button>
                                        <button onClick={() => handleDeleteQuestion(question.id)}>삭제</button>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div id="buttons_ExamRead">
                            <button id="revise" onClick={showDivExamEdit}>
                                수정
                            </button>
                            <button id="delete" onClick={() => handleDeleteExam(currentExam.id)}>
                                삭제
                            </button>
                            <button id="evaluate" onClick={showDivExamEstimation}>
                                평가
                            </button>
                            <button id="back" onClick={showDivExam}>
                                목록
                            </button>
                        </div>
                    </>
                )}

                {visibleDiv === 'ExamEdit' && (
                    <>
                        <div id="ExamEdit_teacherportal">
                            <div id="but">
                                <h2>시험 관리 - 수정</h2>
                            </div>
                        </div>
                        <div id="title_ExamEdit">
                            <h2>제목</h2>
                            <input type="text" id="ExamEdit_title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div id="method_ExamEdit">
                            <h2>시험 방식</h2>
                            <select id="ExamEdit_method" value={examMethod} onChange={(e) => setExamMethod(e.target.value)}>
                                <option value="온라인">온라인</option>
                                <option value="오프라인">오프라인</option>
                            </select>
                        </div>
                        <div id="opendate_ExamEdit">
                            <h2>공개일</h2>
                            <input type="datetime-local" id="ExamEdit_opendate" value={openDate} onChange={(e) => setOpenDate(e.target.value)} />
                        </div>
                        <div id="examperiod_ExamEdit">
                            <h2>응시 기간</h2>
                            <input type="datetime-local" id="ExamEdit_examperiodstart" value={examPeriodStart} onChange={(e) => setExamPeriodStart(e.target.value)} />
                            <h2 id="betweenLetter">~</h2>
                            <input type="datetime-local" id="ExamEdit_examperiodend" value={examPeriodEnd} onChange={(e) => setExamPeriodEnd(e.target.value)} />
                        </div>
                        <div id="duration_ExamEdit">
                            <h2>시험 시간</h2>
                            <input type="number" id="ExamEdit_duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </div>
                        <div id="score_ExamEdit">
                            <h2>배점</h2>
                            <input type="number" id="ExamEdit_score" value={points} onChange={(e) => setPoints(e.target.value)} />
                        </div>
                        <div id="scorePublished_ExamEdit">
                            <h2>점수 공개 여부</h2>
                            <input type="checkbox" id="ExamEdit_scorePublished" checked={scorePublished}
                                   onChange={(e) => setScorePublished(e.target.checked)}/>
                        </div>
                        <div id="content_ExamEdit">
                            <input type="text" id="ExamAdd_content"/>
                        </div>
                        <div id="buttons_ExamEdit">
                            <button id="save" onClick={handleUpdateExam}>
                                저장
                            </button>
                            <button id="back" onClick={showDivExamRead}>
                                취소
                            </button>
                        </div>
                    </>
                )}

                {visibleDiv === 'ExamQuestionAdd' && (
                    <>
                        <div id="ExamQuestionAdd_teacherportal">
                            <div id="but">
                                <h2>시험 문제 추가</h2>
                            </div>
                        </div>
                        <div className="ExamQuestionAdd_content">
                            <div id="type_ExamQuestionAdd">
                                <h2>문제 유형</h2> <br/>
                                <select id="ExamQuestionAdd_type" value={questionType} onChange={handleQuestionTypeChange}>
                                    <option value="multipleChoice">4지선다</option>
                                    <option value="essay">서술형</option>
                                </select>
                            </div>
                            <div id="text_ExamQuestionAdd">
                                <h2>문제</h2>
                                <textarea id="ExamQuestionAdd_text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                            </div>
                            {questionType === 'multipleChoice' && (
                                <>
                                    <div id="choices_ExamQuestionAdd">
                                        {choices.map((choice, index) => (
                                            <div className="choice_ExamQuestionAdd" key={index}>
                                                <h2>보기 {index + 1}</h2>
                                                <input type="text" value={choice} onChange={(e) => handleChoiceChange(index, e.target.value)} />
                                            </div>
                                        ))}
                                    </div>
                                    <div id="correctAnswer_ExamQuestionAdd">
                                        <h2>정답 선택</h2>
                                        {choices.map((_, index) => (
                                            <label key={index}>
                                                <input type="radio" value={index + 1} checked={correctAnswer === String(index + 1)} onChange={(e) => setCorrectAnswer(e.target.value)} />
                                                {index + 1}
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}
                            {questionType === 'essay' && (
                                <div id="essayAnswers_ExamQuestionAdd">
                                    {essayAnswers.map((answer, index) => (
                                        <div className="essayAnswer_ExamQuestionAdd" key={index}>
                                            <h2>정답 {index + 1}</h2>
                                            <input type="text" value={answer} onChange={(e) => handleEssayAnswerChange(index, e.target.value)} />
                                        </div>
                                    ))}
                                    <button onClick={addEssayAnswer}>정답 추가</button>
                                </div>
                            )}
                            <div id="points_ExamQuestionAdd">
                                <h2>배점</h2>
                                <input type="number" value={totalPoints} onChange={(e) => setTotalPoints(parseInt(e.target.value, 10))} />
                            </div>
                        </div>
                            <div id="buttons_ExamQuestionAdd">
                                <button id="save" onClick={handleSaveQuestion}>
                                    저장
                                </button>
                                <button id="back" onClick={showDivExam}>
                                    취소
                                </button>
                            </div>
                        </>
                )}

                {visibleDiv === 'ExamQuestionEdit' && (
                    <>
                        <div id="ExamQuestionEdit_teacherportal">
                            <div id="but">
                                <h2>시험 문제 수정</h2>
                            </div>
                        </div>
                        <div className="ExamQuestionEdit_content">
                            <div id="type_ExamQuestionEdit">
                                <h2>문제 유형</h2>
                                <select id="ExamQuestionEdit_type" value={editingQuestion?.type} onChange={(e) => setEditingQuestion({...editingQuestion, type: e.target.value})}>
                                    <option value="multipleChoice">4지선다</option>
                                    <option value="essay">서술형</option>
                                </select>
                            </div>
                            <div id="text_ExamQuestionEdit">
                                <h2>문제</h2>
                                <textarea id="ExamQuestionEdit_text" value={editingQuestion?.text} onChange={(e) => setEditingQuestion({...editingQuestion, text: e.target.value})} />
                            </div>
                            {editingQuestion?.type === 'multipleChoice' && (
                                <>
                                    <div id="choices_ExamQuestionEdit">
                                        {editingQuestion?.answers.map((choice, index) => (
                                            <div className="choice_ExamQuestionEdit" key={index}>
                                                <h2>보기 {index + 1}</h2>
                                                <input type="text" value={choice} onChange={(e) => {
                                                    const newAnswers = [...editingQuestion.answers];
                                                    newAnswers[index] = e.target.value;
                                                    setEditingQuestion({...editingQuestion, answers: newAnswers});
                                                }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div id="correctAnswer_ExamQuestionEdit">
                                        <h2>정답 선택</h2>
                                        {editingQuestion?.answers.map((_, index) => (
                                            <label key={index}>
                                                <input type="radio" value={index + 1} checked={editingQuestion.correctAnswer === String(index + 1)} onChange={(e) => setEditingQuestion({...editingQuestion, correctAnswer: e.target.value})} />
                                                {index + 1}
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}
                            {editingQuestion?.type === 'essay' && (
                                <div id="essayAnswers_ExamQuestionEdit">
                                    {editingQuestion?.answers.map((answer, index) => (
                                        <div className="essayAnswer_ExamQuestionEdit" key={index}>
                                            <h2>정답 {index + 1}</h2>
                                            <input type="text" value={answer} onChange={(e) => {
                                                const newAnswers = [...editingQuestion.answers];
                                                newAnswers[index] = e.target.value;
                                                setEditingQuestion({...editingQuestion, answers: newAnswers});
                                            }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div id="points_ExamQuestionEdit">
                                <h2>배점</h2>
                                <input type="number" value={editingQuestion?.points} onChange={(e) => setEditingQuestion({...editingQuestion, points: parseInt(e.target.value, 10)})} />
                            </div>
                        </div>
                        <div id="buttons_ExamQuestionEdit">
                            <button id="save" onClick={handleUpdateQuestion}>
                                저장
                            </button>
                            <button id="back" onClick={showDivExam}>
                                취소
                            </button>
                        </div>
                    </>
                )}

                {visibleDiv === 'ExamEstimation' && (
                    <>
                        <div id="ExamEstimation_teacherportal">
                            <div id="but">
                                <h2>시험 관리</h2>
                            </div>
                        </div>
                        <div id="ExamEstimationStudent">
                            <div id="table_score">
                                <div id="blank_table_score"/>
                                <div id="howmanystudent">
                                    대상인원 : {students.length}명 | 참여인원
                                    : {students.filter(student => student.examAnswer && student.examAnswer.score !== -1).length}명
                                </div>
                                <div id="tableOfStudentScore">
                                    <div id="tableOfStudentScore_category">
                                    <div id="totalscore">배점</div>
                                        <div id="aver_exam">평균</div>
                                        <div id="min_exam">최소</div>
                                        <div id="max_exam">최대</div>
                                        <div id="mid_exam">중앙</div>
                                        <div id="abs_exam">표준편차</div>
                                    </div>
                                    <div id="tableOfStudentScore_score">
                                        <div id="totalscore">{currentExam?.points || 'N/A'}</div>
                                        {/* 시험 총 배점 */}
                                        <div id="aver_exam">{statistics.mean.toFixed(2)}</div>
                                        <div id="min_exam">{statistics.min}</div>
                                        <div id="max_exam">{statistics.max}</div>
                                        <div id="mid_exam">{statistics.median}</div>
                                        <div id="abs_exam">{statistics.stdDeviation.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                            <div id="graph_score">
                                <ScoreChart scores={students.map(student => student.examAnswer?.score).filter(score => score !== -1)} />
                            </div>
                            <div id="NameOfStudent_ExamEstimation">
                                <h3>학생 목록</h3>
                                <div id="studentList">
                                    {students.length > 0 ? (
                                        students.map((student) => (
                                            <div key={student.studentId} className="student-info">
                                                <div className="student-id">ID: {student.studentId}</div>
                                                <div className="student-name">이름: {student.studentName}</div>
                                                <div className="student-score">
                                                    점수: {student.examAnswer?.score === -1 ? "미응시" : student.examAnswer?.score || 0}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>학생 목록을 불러오는 중입니다...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default App26;