package com.midas.goseumdochi.admin.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.academy.entity.AcademyFormEntity;
import com.midas.goseumdochi.academy.repository.AcademyFormRepository;
import com.midas.goseumdochi.director.repository.DirectorRepository;
import com.midas.goseumdochi.util.Service.MailService;
import com.midas.goseumdochi.util.ai.EncDecService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AcademyFormServ {

    private final AcademyFormRepository academyFormRepository;
    private final AcademyRepository academyRepository;
    private final DirectorRepository directorRepository;
    // 원장 id,pw 메일 전송
    private final MailService mailService;
    private final EncDecService encDecService;

    public List<AcademyFormEntity> getAllAcademyForms() {
        return academyFormRepository.findAll();
    }

    public void acceptAcademyForm(Long academyFormId) {
        AcademyFormEntity academyFormEntity = academyFormRepository.findById(academyFormId)
                .orElseThrow(() -> new RuntimeException("학원신청서를 찾을 수 없음: " + academyFormId));

        // 수락 처리
        academyFormEntity.setAuthStatus(1); // 수락 상태로 변경 (1로 변경)
        academyFormRepository.save(academyFormEntity);

        // 학원 정보 저장
        AcademyEntity academyEntity = AcademyEntity.builder()
                .name(academyFormEntity.getAcademyName())
                .phoneNumber(academyFormEntity.getAcademyPhoneNumber())
                .postcode(academyFormEntity.getAcademyPostcode())
                .address(academyFormEntity.getAcademyAddress())
                .addressDetail(academyFormEntity.getAcademyAddressDetail())
                .build();
        academyEntity = academyRepository.save(academyEntity);

        // 원장 정보 저장 (아이디: 학원 기본키 번호 4자리 + 0000 4자리)
        // 어짜피 학원이랑 원장이랑 기본키 번호 같음
        String directorLoginid = String.format("%04d", academyEntity.getId()) + "0000"; // 원장 로그인ID 설정
        DirectorEntity directorEntity = DirectorEntity.builder()
                .name(academyFormEntity.getDirectorName())
                .loginid(directorLoginid)
                .password(encDecService.encrypt("0000")) // 임시비밀번호 0000
                .phoneNumber(academyFormEntity.getDirectorPhoneNumber())
                .email(academyFormEntity.getDirectorEmail())
                .academyEntity(academyEntity)
                .build();
        directorRepository.save(directorEntity);

        mailService.directorMailSend(academyFormEntity.getDirectorEmail(), directorLoginid); // 원장 id를 이메일로 전송
    }

    public void rejectAcademyForm(Long academyFormId) {
        AcademyFormEntity academyFormEntity = academyFormRepository.findById(academyFormId)
                .orElseThrow(() -> new RuntimeException("학원신청서를 찾을 수 없음: " + academyFormId));

        // 거절 처리
        academyFormEntity.setAuthStatus(-1); // 거절 상태로 변경
    }


}