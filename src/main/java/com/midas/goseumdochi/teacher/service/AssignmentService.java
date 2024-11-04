package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.student.Dto.AssignmentSubmissionDTO;
import com.midas.goseumdochi.student.entity.AssignmentSubmissionEntity;
import com.midas.goseumdochi.teacher.dto.AssignmentDTO;
import com.midas.goseumdochi.teacher.dto.LectureMaterialDTO;
import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.entity.LectureMaterialEntity;
import com.midas.goseumdochi.teacher.repository.AssignmentRepository;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.midas.goseumdochi.student.Repository.AssignmentSubmissionRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final LectureRepository lectureRepository;
    private final AssignmentSubmissionRepository assignmentSubmissionRepository;

    public void saveAssignment(AssignmentDTO assignmentDTO) {
        AssignmentEntity entity = AssignmentEntity.builder()
                .title(assignmentDTO.getTitle())
                .content(assignmentDTO.getContent())
                .author(assignmentDTO.getAuthor())
                .createdAt(assignmentDTO.getCreatedAt())
                .deadline(assignmentDTO.getDeadline())
                .points(assignmentDTO.getPoints())
                .examType(assignmentDTO.getExamType())
                .attachmentPath(assignmentDTO.getAttachmentPath())
                .isScoreVisible(assignmentDTO.getIsScoreVisible())
                .lectureEntity(lectureRepository.findById(assignmentDTO.getLectureId()).get()) // fk
                .build();
        assignmentRepository.save(entity);
    }

    public List<AssignmentDTO> getAllAssignments() {
        return assignmentRepository.findAll().stream()
                .map(entity -> new AssignmentDTO(
                        entity.getId(),
                        entity.getTitle(),
                        entity.getContent(),
                        entity.getAuthor(),
                        entity.getCreatedAt(),
                        entity.getDeadline(),
                        entity.getPoints(),
                        entity.getExamType(),
                        entity.getAttachmentPath(),
                        entity.getSubmissionCount(),
                        entity.getIsScoreVisible(),
                        entity.getLectureEntity().getId()
                ))
                .collect(Collectors.toList());
    }

    public List<AssignmentDTO> getAssignmentsByLectureId(Long lectureId) {
        return assignmentRepository.findAllByLectureId(lectureId).stream()
                .map(entity -> new AssignmentDTO(
                        entity.getId(),
                        entity.getTitle(),
                        entity.getContent(),
                        entity.getAuthor(),
                        entity.getCreatedAt(),
                        entity.getDeadline(),
                        entity.getPoints(),
                        entity.getExamType(),
                        entity.getAttachmentPath(),
                        entity.getSubmissionCount(),
                        entity.getIsScoreVisible(),
                        entity.getLectureEntity().getId()
                ))
                .collect(Collectors.toList());
    }

    public AssignmentDTO getAssignmentById(Long id) {
        AssignmentEntity entity = assignmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with ID: " + id));
        return new AssignmentDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getAuthor(),
                entity.getCreatedAt(),
                entity.getDeadline(),
                entity.getPoints(),
                entity.getExamType(),
                entity.getAttachmentPath(),
                entity.getSubmissionCount(),
                entity.getIsScoreVisible(),
                entity.getLectureEntity().getId()
        );
    }

    public String saveFile(MultipartFile file) throws IOException {
        String uploadDir = "uploads/assignments/";
        Path directoryPath = Paths.get(uploadDir);
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = directoryPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
        return filePath.toString();
    }

    public void updateAssignment(Long id, AssignmentDTO assignmentDTO) {
        AssignmentEntity entity = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 과제를 찾을 수 없습니다: " + id));

        entity.setTitle(assignmentDTO.getTitle());
        entity.setContent(assignmentDTO.getContent());
        entity.setDeadline(assignmentDTO.getDeadline());
        entity.setPoints(assignmentDTO.getPoints());
        entity.setExamType(assignmentDTO.getExamType());
        entity.setIsScoreVisible(assignmentDTO.getIsScoreVisible());

        // 첨부파일이 존재할 경우에만 업데이트
        if (assignmentDTO.getAttachmentPath() != null) {
            entity.setAttachmentPath(assignmentDTO.getAttachmentPath());
        }

        assignmentRepository.save(entity);
    }

    public void deleteAssignment(Long id) {
        if (!assignmentRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 과제가 존재하지 않습니다. ID: " + id);
        }
        assignmentRepository.deleteById(id);
    }

    public void saveAssignmentSubmission(Long studentId, Long assignmentId, String title, String content, String fileUrl) {
        AssignmentSubmissionEntity submission = AssignmentSubmissionEntity.builder()
                .studentId(studentId)
                .assignmentId(assignmentId)
                .title(title)
                .content(content)
                .attachmentPath(fileUrl)
                .build();

        assignmentSubmissionRepository.save(submission);

        // 제출 인원 수 증가
        AssignmentEntity assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("과제를 찾을 수 없습니다."));
        assignment.setSubmissionCount(assignment.getSubmissionCount() + 1); // 제출 인원 수 1 증가
        assignmentRepository.save(assignment);
    }

    // 과제 페이징
    public Page<AssignmentDTO> pagingAssignment(Long lectureId, Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 3;
        Page<AssignmentEntity> assignmentEntityPage = assignmentRepository.findAllByLectureId(lectureId,
                PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        Page<AssignmentDTO> assignmentDTOPage = assignmentEntityPage.map(entity -> new AssignmentDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getAuthor(),
                entity.getCreatedAt(),
                entity.getDeadline(),
                entity.getPoints(),
                entity.getExamType(),
                entity.getAttachmentPath(),
                entity.getSubmissionCount(),
                entity.getIsScoreVisible(),
                entity.getLectureEntity().getId()
        ));

        return assignmentDTOPage;
    }
}
