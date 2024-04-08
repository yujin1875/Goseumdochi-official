package com.midas.goseumdochi.util.Service;

import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.util.Dto.MailDTO;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.midas.goseumdochi.student.Repository.StudentRepository;

import java.util.Optional;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StudentRepository studentRepository;

    // 메일 내용을 생성하고 임시 비밀번호로 회원 비밀번호를 변경
    public MailDTO createMailAndChangePassword(String memberEmail, Long id) {
        String str = getTempPassword();
        MailDTO dto = new MailDTO();
        dto.setAddress(memberEmail);
        dto.setTitle(" 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. Goseumdochi 임시비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 "
                + str + " 입니다." + "로그인 후에 비밀번호를 변경을 해주세요");
        updatePassword(str, memberEmail);
        return dto;
    }

    //랜덤함수로 임시비밀번호 구문 만들기
    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }
    // 메일보내기
    public void mailSend(MailDTO mailDTO) {
        System.out.println("전송 완료!");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDTO.getAddress());
        message.setSubject(mailDTO.getTitle());
        message.setText(mailDTO.getMessage());
        message.setFrom("goseum24@naver.com");
        message.setReplyTo("goseum24@naver.com");
        System.out.println("message"+message);
        mailSender.send(message);
    }

    //임시 비밀번호로 업데이트
    public void updatePassword(String tempPassword, String userEmail){
        Optional<StudentEntity> studentOptional = studentRepository.findByStudentEmail(userEmail);
        studentOptional.ifPresent(student -> {
            student.setStudentPassword(tempPassword);
            studentRepository.save(student);
        });
    }

}
