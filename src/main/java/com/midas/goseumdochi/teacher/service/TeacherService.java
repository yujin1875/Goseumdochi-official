package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.director.repository.DirectorRepos;
import com.midas.goseumdochi.teacher.dto.TeacherDTO;
import com.midas.goseumdochi.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherService {
    final private TeacherRepository teacherRepository;
    final private DirectorRepos directorRepository;

    // 선생의 loginid와 password를 설정해야함
    public TeacherDTO setLoginidAndPassword(TeacherDTO teacherDTO) {
        // 선생 로그인 id (원장 로그인id 첫 4자리 + 학원 선생님 수+1 4자리)
        String directorLoginidFirst4 = directorRepository.findById(teacherDTO.getDirectorId()).get().getLoginid().substring(0,4);
        // 뒷 네자리 구해야함

        //teacherDTO.setLoginid();


        return teacherDTO;
    }
}
