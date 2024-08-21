package com.midas.goseumdochi.academy.dto;

import com.midas.goseumdochi.academy.entity.MessageEntity;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MessageDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDate sendDate;
    private String sender; // T(선생), S(학생)
    private String viewState; // N(열람x), Y(열람o)
    private Long studentId;
    private Long teacherId;
    private String senderName;
    private String receiverName;

    public static MessageDTO toMessageDTO(MessageEntity messageEntity) {
        String senderName, receiverName;
        if(messageEntity.getSender().equals('T')) { // 선생이 보낸 쪽지
            senderName = messageEntity.getTeacherEntity().getName();
            receiverName = messageEntity.getStudentEntity().getStudentName();
        }
        else { // 학생이 보낸 쪽지
            senderName = messageEntity.getStudentEntity().getStudentName();
            receiverName = messageEntity.getTeacherEntity().getName();
        }

        MessageDTO messageDTO = MessageDTO.builder().id(messageEntity.getId())
                .title(messageEntity.getTitle())
                .content(messageEntity.getContent())
                .sendDate(messageEntity.getSendDate())
                .sender(messageEntity.getSender())
                .viewState(messageEntity.getViewState())
                .studentId(messageEntity.getStudentEntity().getId())
                .teacherId(messageEntity.getTeacherEntity().getId())
                .senderName(senderName)
                .receiverName(receiverName)
                .build();

        return messageDTO;
    }
}
