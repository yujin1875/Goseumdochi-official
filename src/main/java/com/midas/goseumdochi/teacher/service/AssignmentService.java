package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.dto.AssignmentDTO;
import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import com.midas.goseumdochi.teacher.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
                        entity.getAttachmentPath()))
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
                entity.getAttachmentPath());
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
}
