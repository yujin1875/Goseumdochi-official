package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.dto.MessageDTO;
import com.midas.goseumdochi.academy.entity.MessageEntity;
import com.midas.goseumdochi.academy.repository.MessageRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import static com.midas.goseumdochi.util.Constants.MESSAGE_LIST_PAGE_LIMIT;

@Service
@RequiredArgsConstructor
public class MessageService {
    final MessageRepository messageRepository;
    final StudentRepository studentRepository;
    final TeacherRepository teacherRepository;

    // 쪽지 DB 등록
    public void registMessage(MessageDTO messageDTO) {
        MessageEntity messageEntity = MessageEntity.builder()
                .title(messageDTO.getTitle())
                .content(messageDTO.getContent())
                .sender(messageDTO.getSender())
                .studentEntity(studentRepository.findById(messageDTO.getStudentId()).get())
                .teacherEntity(teacherRepository.findById(messageDTO.getTeacherId()).get())
                .build();

        messageRepository.save(messageEntity);
    }

    // 받은쪽지 목록 페이징 [선생]
    public Page<MessageDTO> pagingReceiveOfTeacher(Long teacherId, Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = MESSAGE_LIST_PAGE_LIMIT;
        Page<MessageEntity> messageEntityPage = messageRepository.findAllReceiveByTeacherId(teacherId,
                PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        // 보낸사람(학생) 이름 저장, 받은사람 이름은 null
        Page<MessageDTO> messageDTOPage = messageEntityPage.map(entity -> new MessageDTO(
                entity.getId(), entity.getTitle(), entity.getContent(), entity.getSendDate(), entity.getSender(),
                entity.getViewState(), entity.getStudentEntity().getId(), entity.getTeacherEntity().getId(),
                entity.getStudentEntity().getStudentName(), null));

        return messageDTOPage;
    }

    // 받은쪽지 목록 페이징 [학생]
    public Page<MessageDTO> pagingReceiveOfStudent(Long studentId, Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = MESSAGE_LIST_PAGE_LIMIT;
        Page<MessageEntity> messageEntityPage = messageRepository.findAllReceiveByStudentId(studentId,
                PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        // 보낸사람(선생) 이름 저장, 받은사람 이름은 null
        Page<MessageDTO> messageDTOPage = messageEntityPage.map(entity -> new MessageDTO(
                entity.getId(), entity.getTitle(), entity.getContent(), entity.getSendDate(), entity.getSender(),
                entity.getViewState(), entity.getStudentEntity().getId(), entity.getTeacherEntity().getId(),
                entity.getTeacherEntity().getName(), null));

        return messageDTOPage;
    }
}
