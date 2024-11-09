package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.academy.repository.StudentAcademyRepository;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.director.entity.DirectorNoticeEntity;
import com.midas.goseumdochi.director.repository.DirectorNoticeRepository;
import com.midas.goseumdochi.director.repository.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NoticeService {

    @Autowired
    private StudentAcademyRepository studentAcademyRepository;

    @Autowired
    private AcademyRepository academyRepository;

    @Autowired
    private DirectorNoticeRepository directorNoticeRepository;

    @Autowired
    private DirectorRepository directorRepository;  // 원장 정보를 조회하는 리포지토리

    // 학생 ID로 학원 ID를 찾고, 그 학원의 원장 아이디로 공지사항 조회
    public List<Map<String, Object>> getNoticesByStudentId(Long studentId) {
        System.out.println("Notice Service studentID: " + studentId);

        // 학생 ID로 학원 ID 리스트를 찾기
        List<Long> academyIds = studentAcademyRepository.findAcademyIdByStudentId(studentId);
        System.out.println("Notice Controller academyIDs: " + academyIds);

        if (academyIds.isEmpty()) {
            throw new RuntimeException("학생이 다니는 학원을 찾을 수 없습니다.");
        }

        // 학원 ID와 학원 이름을 Map 형태로 조회
        List<AcademyEntity> academies = academyRepository.findByIdIn(academyIds);
        Map<Long, String> academyNameMap = new HashMap<>();
        for (AcademyEntity academy : academies) {
            academyNameMap.put(academy.getId(), academy.getName());
        }

        // 학원 ID로 원장 ID를 찾기
        List<Long> directorIds = academyRepository.findDirectorIdsByAcademyIds(academyIds);

        if (directorIds.isEmpty()) {
            throw new RuntimeException("학원의 원장 아이디를 찾을 수 없습니다.");
        }

        // 원장 ID로 원장 정보를 한 번에 불러옴
        List<DirectorEntity> directors = directorRepository.findAllById(directorIds);
        Map<Long, DirectorEntity> directorMap = new HashMap<>();
        for (DirectorEntity director : directors) {
            directorMap.put(director.getId(), director);
        }

        // 공지사항을 원장 ID로 가져옴
        List<DirectorNoticeEntity> notices = directorNoticeRepository.findByDirectorEntityIds(directorIds);

        // 결과 리스트에 학원 이름을 추가
        List<Map<String, Object>> result = new ArrayList<>();

        for (DirectorNoticeEntity notice : notices) {
            Map<String, Object> noticeWithAcademy = new HashMap<>();
            noticeWithAcademy.put("num", notice.getNum());
            noticeWithAcademy.put("title", notice.getTitle());
            noticeWithAcademy.put("regdate", notice.getRegdate());
            noticeWithAcademy.put("body", notice.getContent());

            // 원장 정보와 학원 이름을 매핑
            DirectorEntity director = directorMap.get(notice.getDirectorEntity().getId());
            if (director == null) {
                throw new RuntimeException("원장을 찾을 수 없습니다.");
            }

            // 공지사항에 해당하는 학원 이름을 Map에서 조회하여 추가
            Long academyId = director.getAcademyEntity().getId();  // 학원 ID 가져오기
            String academyName = academyNameMap.getOrDefault(academyId, "알 수 없음");
            noticeWithAcademy.put("academyName", academyName);
            noticeWithAcademy.put("directorName", director.getName());

            result.add(noticeWithAcademy);
        }

        return result;
    }


}
