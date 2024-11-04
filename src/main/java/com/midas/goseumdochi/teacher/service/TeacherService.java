package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.director.repository.DirectorRepository;
import com.midas.goseumdochi.student.Dto.AssignmentSubmissionDTO;
import com.midas.goseumdochi.student.Repository.AssignmentSubmissionRepository;
import com.midas.goseumdochi.student.entity.AssignmentSubmissionEntity;
import com.midas.goseumdochi.teacher.dto.TeacherDTO;
import com.midas.goseumdochi.teacher.entity.TeacherEntity;
import com.midas.goseumdochi.teacher.repository.TeacherRepository;
import com.midas.goseumdochi.util.Dto.MailDTO;
import com.midas.goseumdochi.util.ai.EncDecService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class TeacherService {
    final private TeacherRepository teacherRepository;
    final private DirectorRepository directorRepository;
    final private AcademyRepository academyRepository;
    final private EncDecService encDecService;
    final private AssignmentSubmissionRepository assignmentSubmissionRepository;

    // 선생의 loginid와 password를 설정해야함
    public TeacherDTO setLoginidAndPassword(TeacherDTO teacherDTO) {
        // 선생 로그인 id (원장 로그인id 첫 4자리 + 학원 선생님 수+1 4자리)
        String first4 = directorRepository.findByAcademyId(teacherDTO.getAcademyId()).get().getLoginid().substring(0,4);
        // 학원 선생님 수 구하기 (남는 앞자리 0으로 채우기)
        String last4 = String.format("%04d", teacherRepository.findAllByAcademyId(teacherDTO.getAcademyId()).size() + 1); //! NullException
        /* 위에꺼 에러나면 사용 (에러 안 나면 지워도 됨)
        List<TeacherEntity> teacherEntityList = teacherRepository.findAllByDirectorId(teacherDTO.getDirectorId());
        String last4 = (teacherEntityList == null)? "0001" : String.format("%04d", teacherEntityList.size() + 1);
         */

        teacherDTO.setLoginid(first4 + last4);
        teacherDTO.setPassword("0000");

        return teacherDTO;
    }

    // 선생 처음 등록
    public TeacherDTO regist(TeacherDTO teacherDTO) {
        // 에러나면 처음 static 함수 추가
        teacherDTO.setPassword(encDecService.encrypt(teacherDTO.getPassword())); // 암호화하여 db저장
        TeacherEntity teacherEntity = TeacherEntity.toTeacherEntity(teacherDTO,
                academyRepository.findById(teacherDTO.getAcademyId()).get());
        TeacherDTO registDTO = TeacherDTO.toTeacherDTO(teacherRepository.save(teacherEntity));

        registDTO.setPassword(encDecService.decrypt(registDTO.getPassword()));
        return registDTO;
    }

    public MailDTO getMailDTOForRegist(TeacherDTO teacherDTO) {
        DirectorEntity directorEntity = directorRepository.findByAcademyId(teacherDTO.getAcademyId()).get();

        MailDTO mailDTO = new MailDTO(directorEntity.getEmail()
                , String.format("[고슴도치] %s 학원 신규 선생님 임시로그인 정보 전송,", directorEntity.getAcademyEntity().getName())
                , String.format("선생님 이름: %s\n 아이디: %s\n임시비밀번호: %s", teacherDTO.getName(), teacherDTO.getLoginid(), teacherDTO.getPassword()));
        return mailDTO;
    }

    // 학원의 모든 선생 찾기
    public List<TeacherDTO> getAllTeacherByAcademyId(Long academyId) {
        List<TeacherEntity> teacherEntityList = teacherRepository.findAllByAcademyId(academyId);

        // DTO로 변환
        List<TeacherDTO> teacherDTOList = new ArrayList<>();
        for (TeacherEntity teacherEntity : teacherEntityList)
            teacherDTOList.add(TeacherDTO.toTeacherDTO(teacherEntity));
        return teacherDTOList;
    }

    // 선생 정보 수정
    public TeacherDTO update(TeacherDTO teacherDTO) {
        TeacherEntity updateTeacherEntity = TeacherEntity.toTeacherEntity(teacherDTO,
                academyRepository.findById(teacherDTO.getId()).get());
        teacherRepository.save(updateTeacherEntity);

        return teacherDTO;
    }

    // 선생 삭제
    public boolean delete(Long teacherId) {
        if(teacherRepository.findById(teacherId).isEmpty()) // 삭제 실패
            return false;

        // 삭제 성공
        teacherRepository.deleteById(teacherId);
        return true;
    }

    // 로그인된 선생님 DTO 찾기

    public TeacherDTO findById(Long id) {
        TeacherEntity teacherEntity = teacherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 선생님을 찾을 수 없습니다: " + id));
        return TeacherDTO.toTeacherDTO(teacherEntity);
    }
    // 로그인된 선생님 DTO 찾기
    public TeacherDTO findByLoginid(String loginid) {
        Optional<TeacherEntity> teacherEntityOptional = teacherRepository.findByLoginid(loginid);
        TeacherEntity teacherEntity = teacherEntityOptional.orElseThrow(() -> new IllegalArgumentException("해당 로그인 ID로 선생님을 찾을 수 없습니다: " + loginid));
        return TeacherDTO.toTeacherDTO(teacherEntity);
    }

    public TeacherEntity findEntityById(Long id) { // 추가된 메서드
        return teacherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 선생님을 찾을 수 없습니다: " + id));
    }

    //특정 과제에 제출된 학생들의 과제 목록
    public Optional<AssignmentSubmissionDTO> getSubmissionsByAssignmentId(Long assignmentId, Long studentId) {
        return assignmentSubmissionRepository.findByStudentIdAndAssignmentId(studentId, assignmentId)
                .map(submission -> {
                    return new AssignmentSubmissionDTO(
                            submission.getId(),
                            submission.getStudentId(),
                            submission.getAssignmentId(),
                            submission.getTitle(),
                            submission.getContent(),
                            submission.getAttachmentPath(),
                            submission.getSubmissionStatus(),
                            submission.getScore(),
                            submission.getEvaluationComment()
                    );
                });
    }

    // 평가 점수, 평가 의견
    public void updateEvaluation(AssignmentSubmissionEntity submissionEntity, Integer score, String evaluationComment) {
        // 검증: 평가 의견이 비어있는지 확인
        if (evaluationComment == null || evaluationComment.trim().isEmpty()) {
            throw new IllegalArgumentException("평가 의견을 입력해야 합니다.");
        }

        // 제출물 상태 및 평가 정보를 업데이트
        submissionEntity.setScore(score);
        submissionEntity.setEvaluationComment(evaluationComment);
        submissionEntity.setSubmissionStatus("평가 완료");

        // 엔티티 저장
        assignmentSubmissionRepository.save(submissionEntity);
    }

    public AssignmentSubmissionEntity getSubmissionEntity(Long assignmentId, Long studentId) {
        return assignmentSubmissionRepository
                .findByStudentIdAndAssignmentId(studentId, assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 제출물을 찾을 수 없습니다."));
    }

    public Optional<AssignmentSubmissionDTO> getSubmissionEvaluation(Long assignmentId, Long studentId) {
        return assignmentSubmissionRepository.findByStudentIdAndAssignmentId(studentId, assignmentId)
                .map(submission -> {
                    return new AssignmentSubmissionDTO(
                            submission.getId(),
                            submission.getStudentId(),
                            submission.getAssignmentId(),
                            submission.getTitle(),
                            submission.getContent(),
                            submission.getAttachmentPath(),
                            submission.getSubmissionStatus(),
                            submission.getScore(),
                            submission.getEvaluationComment()
                    );
                });
    }

}
