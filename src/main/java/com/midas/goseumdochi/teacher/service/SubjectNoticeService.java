package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.dto.SubjectNoticeDTO;
import com.midas.goseumdochi.teacher.entity.SubjectNoticeEntity;
import com.midas.goseumdochi.teacher.repository.SubjectNoticeRepository;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectNoticeService {
    private final SubjectNoticeRepository subjectNoticeRepository;
    private final LectureRepository lectureRepository;

    // 새로운 공지사항을 저장
    public void saveNotice(SubjectNoticeDTO subjectNoticeDTO) {
        SubjectNoticeEntity entity = new SubjectNoticeEntity();
        entity.setTitle(subjectNoticeDTO.getTitle());
        entity.setContent(subjectNoticeDTO.getContent());
        entity.setCreatedAt(LocalDateTime.now());
        entity.setAttachmentPath(subjectNoticeDTO.getAttachmentPath());
        entity.setLectureEntity(lectureRepository.findById(subjectNoticeDTO.getLectureId())
                .orElseThrow(() -> new RuntimeException("강의가 존재하지 않습니다.")));
        subjectNoticeRepository.save(entity);
    }

    // 특정 강의의 모든 공지사항을 조회
    public List<SubjectNoticeDTO> getNoticesByLectureId(Long lectureId) {
        List<SubjectNoticeEntity> entities = subjectNoticeRepository.findAllByLectureId(lectureId);
        return entities.stream().map(entity -> new SubjectNoticeDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getCreatedAt(),
                entity.getAttachmentPath(),
                entity.getLectureEntity().getId()
        )).collect(Collectors.toList());
    }

    // 특정 공지사항을 조회
    public SubjectNoticeDTO getNoticeById(Long id) {
        SubjectNoticeEntity entity = subjectNoticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));
        return new SubjectNoticeDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getCreatedAt(),
                entity.getAttachmentPath(),
                entity.getLectureEntity().getId()
        );
    }

    // 특정 공지사항을 업데이트
    public void updateNotice(Long id, SubjectNoticeDTO subjectNoticeDTO) {
        SubjectNoticeEntity entity = subjectNoticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));
        entity.setTitle(subjectNoticeDTO.getTitle());
        entity.setContent(subjectNoticeDTO.getContent());
        entity.setAttachmentPath(subjectNoticeDTO.getAttachmentPath());
        subjectNoticeRepository.save(entity);
    }

    // 공지사항 삭제
    public void deleteNotice(Long id) {
        if (!subjectNoticeRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 공지사항이 존재하지 않습니다. ID: " + id);
        }
        subjectNoticeRepository.deleteById(id);
    }
}
