package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.dto.SubjectNoticeDTO;
import com.midas.goseumdochi.teacher.entity.SubjectNoticeEntity;
import com.midas.goseumdochi.teacher.repository.SubjectNoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectNoticeService {
    private final SubjectNoticeRepository subjectNoticeRepository;

    public List<SubjectNoticeDTO> getAllNotices() {
        return subjectNoticeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SubjectNoticeDTO getNoticeById(Long id) {
        return subjectNoticeRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public void saveNotice(SubjectNoticeDTO subjectNoticeDTO) {
        SubjectNoticeEntity subjectNoticeEntity = new SubjectNoticeEntity();
        BeanUtils.copyProperties(subjectNoticeDTO, subjectNoticeEntity);
        subjectNoticeRepository.save(subjectNoticeEntity);
    }

    public void updateNotice(Long id, SubjectNoticeDTO subjectNoticeDTO) {
        SubjectNoticeEntity subjectNoticeEntity = subjectNoticeRepository.findById(id).orElse(null);
        if (subjectNoticeEntity != null) {
            BeanUtils.copyProperties(subjectNoticeDTO, subjectNoticeEntity, "id", "createdAt");
            subjectNoticeRepository.save(subjectNoticeEntity);
        }
    }

    public void deleteNotice(Long id) {
        subjectNoticeRepository.deleteById(id);
    }

    private SubjectNoticeDTO convertToDTO(SubjectNoticeEntity subjectNoticeEntity) {
        SubjectNoticeDTO subjectNoticeDTO = new SubjectNoticeDTO();
        BeanUtils.copyProperties(subjectNoticeEntity, subjectNoticeDTO);
        return subjectNoticeDTO;
    }
}
