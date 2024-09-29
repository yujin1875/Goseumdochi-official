package com.midas.goseumdochi.student.Service;

import com.midas.goseumdochi.student.Dto.AssignmentSubmissionDTO;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Repository.AssignmentSubmissionRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.AssignmentSubmissionEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import com.midas.goseumdochi.util.ai.EncDecService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.midas.goseumdochi.teacher.repository.AssignmentRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final EncDecService encDecService;
    private final AssignmentSubmissionRepository assignmentSubmissionRepository;
    private final AssignmentRepository assignmentRepository;

    //회원가입 로직
    public int join(StudentDTO studentDTO, String passwordCheck) {
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        String birthDateRegex = "^\\d{4}-\\d{2}-\\d{2}$";
        if (!studentDTO.getStudentEmail().matches(emailRegex) || !studentDTO.getStudentBirthDate().matches(birthDateRegex)) {
            return -4; // 새로운 에러 코드
        }

        if (studentDTO.getStudentId() == null || studentDTO.getStudentPassword() == null || passwordCheck == null) {
            return -3; // 적절한 에러 코드 반환
        }

        // 아이디 중복 체크
        Optional<StudentEntity> existingStudent = studentRepository.findByStudentId(studentDTO.getStudentId());
        if (existingStudent.isPresent()) { // 아이디 중복
            return -1;
        } else if (!studentDTO.getStudentPassword().equals(passwordCheck)) { // 비밀번호 불일치
            return -2;
        } else { // 회원가입 성공
            StudentEntity studentEntity = StudentEntity.toStudent(studentDTO);
            studentEntity.setStudentBirthDate(studentDTO.getStudentBirthDate());
            studentEntity.setStudentPhoneNumber(studentDTO.getStudentPhoneNumber());
            studentEntity.setStudentPassword(encDecService.encrypt(studentDTO.getStudentPassword())); // 암호화하여 비밀번호 저장
            studentRepository.save(studentEntity);
            return 1;
        }
    }

    // 로그인 로직
    public StudentDTO login(StudentDTO studentDTO) {
        Optional<StudentEntity> byStudentId = studentRepository.findByStudentId(studentDTO.getStudentId());

        if (byStudentId.isPresent()) {
            StudentEntity studentEntity = byStudentId.get();
            if (studentDTO.getStudentPassword().equals(encDecService.decrypt(studentEntity.getStudentPassword()))) { // 복호화 비밀번호 검사
                System.out.println("로그인 성공!");

                return StudentDTO.toStudentDTO(studentEntity);
            } else {
                System.out.println("비밀번호가 일치하지 않습니다.");
                return null;
            }
        } else {
            System.out.println("존재하지 않는 아이디입니다.");
            return null;
        }
    }

    // 아이디 찾기
    public Optional<String> findStudentIdByStudentNameAndPhoneNumber(String studentName, String studentPhoneNumber) {
        return studentRepository.findStudentIdByStudentNameAndPhoneNumber(studentName, studentPhoneNumber);
    }

    // 비밀번호 찾기
    public Optional<StudentDTO> findStudentByStudentIdAndStudentNameAndPhoneNumber(String studentId, String studentName, String studentPhoneNumber) {
        return studentRepository.findByStudentIdAndStudentNameAndStudentPhoneNumber(studentId, studentName, studentPhoneNumber)
                .map(StudentDTO::toStudentDTO);
    }

    // 비밀번호 수정
    public void updateStudentPassword(Long studentId, String newPassword) {
        studentRepository.findById(studentId).ifPresent(studentEntity -> {
            studentEntity.setStudentPassword(encDecService.encrypt(newPassword));
            studentRepository.save(studentEntity);
        });
    }

    //사용자 정보 수정
    public int updateStudent(StudentDTO studentDTO) {
        Optional<StudentEntity> existingStudent = studentRepository.findById(studentDTO.getId());
        if (existingStudent.isPresent()) {
            StudentEntity studentEntity = existingStudent.get();
            studentEntity.setStudentName(studentDTO.getStudentName());
            studentEntity.setStudentPhoneNumber(studentDTO.getStudentPhoneNumber());
            studentEntity.setStudentBirthDate(studentDTO.getStudentBirthDate());
            studentEntity.setStudentEmail(studentDTO.getStudentEmail());
            studentEntity.setProfilePictureUrl(studentDTO.getProfilePictureUrl());
            studentRepository.save(studentEntity);
            return 1; // 성공
        }
        return -1; // 실패
    }

    public StudentDTO findStudentById(Long id) {
        Optional<StudentEntity> studentEntity = studentRepository.findById(id);
        return studentEntity.map(StudentDTO::toStudentDTO).orElse(null);
    }

    // 학생 찾기 (이름, 전화번호 이용)
    public StudentDTO findStudentByNameAndPhoneNumber(String name, String phonenumber) {
        Optional<StudentEntity> studentEntity = studentRepository.findByNameAndPhoneNumber(name, phonenumber);
        return (studentEntity.isPresent())? StudentDTO.toStudentDTO(studentEntity.get()) : null; // 학생 찾으면 DTO 리턴, 없으면 null
    }

    public List<StudentDTO> findAllStudents() {
        return studentRepository.findAll().stream()
                .map(StudentDTO::toStudentDTO)
                .collect(Collectors.toList());
    }

    public void saveAssignmentSubmission(Long studentId, Long assignmentId, String title, String content, String fileUrl) {
        // 기존 제출 기록이 있는지 확인
        Optional<AssignmentSubmissionEntity> existingSubmission = assignmentSubmissionRepository.findByStudentIdAndAssignmentId(studentId, assignmentId);

        AssignmentSubmissionEntity submission;

        if (existingSubmission.isPresent()) {
            // 기존 제출이 있으면 업데이트
            submission = existingSubmission.get();
            submission.setTitle(title);
            submission.setContent(content);
            submission.setAttachmentPath(fileUrl);
            submission.setSubmissionStatus("정상제출");  // 제출 상태를 정상제출로 설정
        } else {
            // 없으면 새로 생성
            submission = AssignmentSubmissionEntity.builder()
                    .studentId(studentId)
                    .assignmentId(assignmentId)
                    .title(title)
                    .content(content)
                    .attachmentPath(fileUrl)
                    .submissionStatus("정상제출")  // 새로 생성 시에도 정상제출로 설정
                    .build();
        }

        // 제출 정보 저장
        assignmentSubmissionRepository.save(submission);
    }
    public void updateAssignmentSubmission(Long studentId, Long assignmentId, String title, String content, String fileUrl) {
        AssignmentSubmissionEntity submission = assignmentSubmissionRepository.findByStudentIdAndAssignmentId(studentId, assignmentId)
                .orElseThrow(() -> new RuntimeException("과제 제출 정보를 찾을 수 없습니다."));

        submission.setTitle(title);
        submission.setContent(content);
        submission.setAttachmentPath(fileUrl);
        submission.setSubmissionStatus("정상제출");  // 과제 수정 시에도 제출 상태를 "정상제출"로 변경

        assignmentSubmissionRepository.save(submission);
    }

    public void deleteAssignmentSubmission(Long studentId, Long assignmentId) {
        AssignmentSubmissionEntity submission = assignmentSubmissionRepository.findByStudentIdAndAssignmentId(studentId, assignmentId)
                .orElseThrow(() -> new RuntimeException("과제 제출 정보를 찾을 수 없습니다."));

        // 제출 인원 수 감소
        AssignmentEntity assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("과제를 찾을 수 없습니다."));
        assignment.setSubmissionCount(assignment.getSubmissionCount() - 1); // 제출 인원 수 1 감소
        assignmentRepository.save(assignment);

        assignmentSubmissionRepository.delete(submission);
    }


    public List<AssignmentSubmissionDTO> getSubmittedAssignments(Long studentId) {
        List<AssignmentSubmissionEntity> submissions = assignmentSubmissionRepository.findByStudentId(studentId);
        return submissions.stream()
                .map(submission -> new AssignmentSubmissionDTO(submission.getId(), submission.getStudentId(),
                        submission.getAssignmentId(), submission.getTitle(), submission.getContent(),
                        submission.getAttachmentPath(), submission.getSubmissionStatus(),submission.getScore(), submission.getEvaluationComment()))
                .collect(Collectors.toList());
    }

    public Optional<AssignmentSubmissionDTO> getAssignmentSubmission(Long studentId, Long assignmentId) {
        Optional<AssignmentSubmissionEntity> submission = assignmentSubmissionRepository.findByStudentIdAndAssignmentId(studentId, assignmentId);
        return submission.map(sub -> new AssignmentSubmissionDTO(sub.getId(), sub.getStudentId(), sub.getAssignmentId(),
                sub.getTitle(), sub.getContent(), sub.getAttachmentPath(), sub.getSubmissionStatus(),sub.getScore(),sub.getEvaluationComment()));
    }

    // 과제 제출 상태 확인
    public List<StudentDTO> getStudentsByLectureIdWithSubmissionStatus(Long lectureId, Long assignmentId) {
        List<StudentEntity> students = studentRepository.findStudentsByLectureId(lectureId);
        return students.stream().map(student -> {
            StudentDTO studentDTO = StudentDTO.toStudentDTO(student);

            // 과제 제출 상태 확인
            Optional<AssignmentSubmissionEntity> submission = assignmentSubmissionRepository.findByStudentIdAndAssignmentId(student.getId(), assignmentId);
            if (submission.isPresent()) {
                AssignmentSubmissionDTO submissionDTO = new AssignmentSubmissionDTO();
                submissionDTO.setSubmissionStatus(submission.get().getSubmissionStatus());
                // 필요에 따라 다른 필드도 설정
                studentDTO.setAssignmentSubmission(submissionDTO);
            } else {
                AssignmentSubmissionDTO submissionDTO = new AssignmentSubmissionDTO();
                submissionDTO.setSubmissionStatus("미제출");
                studentDTO.setAssignmentSubmission(submissionDTO);
            }

            return studentDTO;
        }).collect(Collectors.toList());
    }

    // 강의별 학생 목록 조회
    public List<StudentDTO> getStudentsByLectureId(Long lectureId) {
        List<StudentEntity> students = studentRepository.findStudentsByLectureId(lectureId);
        return students.stream()
                .map(StudentDTO::toStudentDTO)
                .collect(Collectors.toList());
    }

    //특정 과제에 제출된 학생들의 과제 목록
    public List<AssignmentSubmissionDTO> getSubmissionsByAssignmentId(Long assignmentId, Long studentId) {
        List<AssignmentSubmissionEntity> submissions = assignmentSubmissionRepository.findByAssignmentIdAndStudentId(assignmentId, studentId);
        return submissions.stream()
                .map(submission -> new AssignmentSubmissionDTO(
                        submission.getId(),
                        submission.getStudentId(),
                        submission.getAssignmentId(),
                        submission.getTitle(),
                        submission.getContent(),
                        submission.getAttachmentPath(),
                        submission.getSubmissionStatus(),
                        submission.getScore(),
                        submission.getEvaluationComment()))
                .collect(Collectors.toList());
    }


}

