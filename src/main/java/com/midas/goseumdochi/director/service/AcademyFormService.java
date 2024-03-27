package com.midas.goseumdochi.director.service;

import com.midas.goseumdochi.director.dto.AcademyFormDTO;
import com.midas.goseumdochi.director.entity.AcademyFormEntity;
import com.midas.goseumdochi.director.repository.AcademyFormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AcademyFormService {
    private final AcademyFormRepository academyFormRepository;

    public void submit(AcademyFormDTO academyFormDTO) {
        // 처음 신청서 등록할 때, id(pk)랑 authStatus(default"0")는 값이 없음
        AcademyFormEntity academyFormEntity = AcademyFormEntity.builder()
                .directorName(academyFormDTO.getDirectorName())
                .directorPhoneNumber(academyFormDTO.getAcademyPhoneNumber())
                .academyName(academyFormDTO.getAcademyName())
                .academyPhoneNumber(academyFormDTO.getAcademyPhoneNumber())
                .academyPostcode(academyFormDTO.getAcademyPostcode())
                .academyAddress(academyFormDTO.getAcademyAddress())
                .academyAddressDetail(academyFormDTO.getAcademyAddressDetail())
                .build();
        academyFormRepository.save(academyFormEntity);
    }
}
