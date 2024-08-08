package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.dto.SubjectDTO;
import com.midas.goseumdochi.academy.entity.SubjectEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.academy.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final AcademyRepository academyRepository;

    // 원장(학원)마다 과목 이름 있는지 검사
    public SubjectDTO findByNameAndAcademyId(String name, Long academyId) {
        Optional<SubjectEntity> findSubjectEntity = subjectRepository.findByNameAndAcademyId(name, academyId);
        if(findSubjectEntity.isEmpty()) // 과목이 존재하지 않음
            return null;
        return SubjectDTO.toSubjectDTO(findSubjectEntity.get()); // 과목 존재
    }

    // 처음 과목 등록
    public SubjectDTO regist(String subjectName, Long academyId) {
        SubjectDTO subjectDTO = new SubjectDTO();
        subjectDTO.setName(subjectName);
        // 이것도 에러나면 처음 static 함수 추가
        SubjectEntity subjectEntity = SubjectEntity.toSubjectEntity(subjectDTO,
                academyRepository.findById(academyId).get());

        subjectDTO = SubjectDTO.toSubjectDTO(subjectRepository.save(subjectEntity));

        return subjectDTO;
    }

    // 과목 리스트 리턴
    public List<SubjectDTO> findAllByAcademyId(Long academyId) {
        List<SubjectDTO> subjectDTOList = new ArrayList<>();
        for (SubjectEntity subjectEntity : subjectRepository.findAllByAcademyId(academyId))
            subjectDTOList.add(SubjectDTO.toSubjectDTO(subjectEntity));

        //if(subjectDTOList.isEmpty())
        //    return null;

        return subjectDTOList;
    }

    // 과목 찾기
    public SubjectDTO findById(Long subjectId) {
        Optional<SubjectEntity> subjectEntity = subjectRepository.findById(subjectId);

        if(subjectEntity.isEmpty())
            return null;

        return SubjectDTO.toSubjectDTO(subjectEntity.get());
    }

    // 과목 수정
    public SubjectDTO update(Long subjectId, String inputName) {
        SubjectEntity subjectEntity = subjectRepository.findById(subjectId).get();

        // 중복 체크
        List<SubjectEntity> subjectEntityList = subjectRepository.findAllByAcademyId(subjectEntity.getAcademyEntity().getId());// 학원의 모든 과목
        for (SubjectEntity subject : subjectEntityList) {
            if(inputName.equals(subject.getName())) // 과목 중복
                return null;
        }

        // 이름 수정
        SubjectDTO updateSubjectDTO = new SubjectDTO(subjectEntity.getId(), inputName, subjectEntity.getAcademyEntity().getId());
        SubjectEntity updateSubjectEntity = SubjectEntity.toSubjectEntity(updateSubjectDTO, subjectEntity.getAcademyEntity());
        subjectRepository.save(updateSubjectEntity); // 수정하여 저장

        return updateSubjectDTO;
    }

    // 과목 삭제
    public boolean delete(Long subjectId) {
        Optional<SubjectEntity> subjectEntity = subjectRepository.findById(subjectId);

        if(subjectEntity.isEmpty()) // 삭제 실패
            return false;

        // 삭제 성공
        subjectRepository.deleteById(subjectId);
        return true;
    }

}
