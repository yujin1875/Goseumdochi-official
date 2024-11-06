package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.academy.repository.StudentAcademyRepository;
import com.midas.goseumdochi.director.entity.DirectorNoticeEntity;
import com.midas.goseumdochi.director.repository.DirectorNoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private StudentAcademyRepository studentAcademyRepository;

    @Autowired
    private AcademyRepository academyRepository;

    @Autowired
    private DirectorNoticeRepository directorNoticeRepository;

    // 학생 ID로 학원 ID를 찾고, 그 학원의 원장 아이디로 공지사항 조회
    public List<DirectorNoticeEntity> getNoticesByStudentId(Long studentId) {
        System.out.println("Notice Service studentID: " + studentId);

        // 학생 ID로 학원 ID 리스트를 찾기
        List<Long> academyIds = studentAcademyRepository.findAcademyIdByStudentId(studentId);
        System.out.println("Notice Controller academyIDs: " + academyIds);

        if (academyIds.isEmpty()) {
            throw new RuntimeException("학생이 다니는 학원을 찾을 수 없습니다.");
        }

        // 학원 ID로 원장 ID를 찾기
        List<Long> directorIds = academyRepository.findDirectorIdsByAcademyIds(academyIds);

        if (directorIds.isEmpty()) {
            throw new RuntimeException("학원의 원장 아이디를 찾을 수 없습니다.");
        }

        return directorNoticeRepository.findByDirectorEntityIds(directorIds);
    }
}
