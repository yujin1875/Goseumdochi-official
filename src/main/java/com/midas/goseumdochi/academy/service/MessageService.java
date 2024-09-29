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

import java.util.Optional;

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

    // 보낸쪽지 목록 페이징 [선생]
    public Page<MessageDTO> pagingSendOfTeacher(Long teacherId, Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = MESSAGE_LIST_PAGE_LIMIT;
        Page<MessageEntity> messageEntityPage = messageRepository.findAllSendByTeacherId(teacherId,
                PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        // 보낸사람은 null, 받은사람(학생) 이름 저장
        Page<MessageDTO> messageDTOPage = messageEntityPage.map(entity -> new MessageDTO(
                entity.getId(), entity.getTitle(), entity.getContent(), entity.getSendDate(), entity.getSender(),
                entity.getViewState(), entity.getStudentEntity().getId(), entity.getTeacherEntity().getId(),
                null, entity.getStudentEntity().getStudentName()));

        return messageDTOPage;
    }

    // 보낸쪽지 목록 페이징 [학생]
    public Page<MessageDTO> pagingSendOfStudent(Long studentId, Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = MESSAGE_LIST_PAGE_LIMIT;
        Page<MessageEntity> messageEntityPage = messageRepository.findAllSendByStudentId(studentId,
                PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        // 보낸사람은 null, 받은사람(선생) 이름 저장
        Page<MessageDTO> messageDTOPage = messageEntityPage.map(entity -> new MessageDTO(
                entity.getId(), entity.getTitle(), entity.getContent(), entity.getSendDate(), entity.getSender(),
                entity.getViewState(), entity.getStudentEntity().getId(), entity.getTeacherEntity().getId(),
                null, entity.getTeacherEntity().getName()));

        return messageDTOPage;
    }

    // 받은쪽지 열람
    public void viewReceiveMessage(Long messageId) {
        MessageEntity messageEntity = messageRepository.findById(messageId).get();
        messageEntity.setViewState("Y"); // 열람상태 Y로 변경
        messageRepository.save(messageEntity);
    }

    // 쪽지 삭제 [선생]
    public boolean deleteMessageByTeacher(Long messageId) {
        Optional<MessageEntity> findMessage = messageRepository.findById(messageId);
        if(findMessage.isEmpty())
            return false;

        MessageEntity messageEntity = findMessage.get();
        messageEntity.setDeleteByTeacher("Y");
        messageRepository.save(messageEntity); // DB 저장
        if(messageEntity.isAllDeleted()) // 학생&선생 모두 삭제시 DB에서 삭제
            messageRepository.delete(messageEntity);
        return true;
    }

    // 쪽지 삭제 [학생]
    public boolean deleteMessageByStudent(Long messageId) {
        Optional<MessageEntity> findMessage = messageRepository.findById(messageId);
        if(findMessage.isEmpty())
            return false;

        MessageEntity messageEntity = findMessage.get();
        messageEntity.setDeleteByStudent("Y");
        messageRepository.save(messageEntity); // DB 저장
        if(messageEntity.isAllDeleted()) // 학생&선생 모두 삭제시 DB에서 삭제
            messageRepository.delete(messageEntity);
        return true;
    }

    // 쪽지 전송 취소 [통합] -> DB 삭제
    public boolean cancelMessage(Long messageId) {
        Optional<MessageEntity> findMessage = messageRepository.findById(messageId);
        if(findMessage.isEmpty())
            return false;

        messageRepository.delete(findMessage.get());
        return true;
    }
}
