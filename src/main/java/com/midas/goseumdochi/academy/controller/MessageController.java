package com.midas.goseumdochi.academy.controller;

import com.midas.goseumdochi.academy.dto.MessageDTO;
import com.midas.goseumdochi.academy.service.MessageService;
import com.midas.goseumdochi.util.component.PageComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// 상수 불러오기
import static com.midas.goseumdochi.util.Constants.MESSAGE_LIST_BLOCK_LIMIT;
import static com.midas.goseumdochi.util.Constants.MESSAGE;

@RestController
@RequestMapping("/api/message")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final PageComponent pageComponent;

    // 쪽지쓰기 [선생]
    @PostMapping("/teacher/send")
    public ResponseEntity<?> sendMessageByTeacher(@RequestBody MessageDTO messageDTO) { // (title, content, studentId, teacherId)
        messageDTO.setSender("T");
        messageService.registMessage(messageDTO);
        return ResponseEntity.ok("쪽지 전송 완료");
    }

    // 쪽지쓰기 [학생]
    @PostMapping("/student/send")
    public ResponseEntity<?> sendMessageByStudent(@RequestBody MessageDTO messageDTO) { // (title, content, studentId, teacherId)
        messageDTO.setSender("S");
        messageService.registMessage(messageDTO);
        return ResponseEntity.ok("쪽지 전송 완료");
    }

    // 받은쪽지 목록 페이징 [선생]
    @GetMapping("/teacher/{teacherId}/receive/paging")
    public ResponseEntity<?> pagingReceiveOfTeacher(@PathVariable Long teacherId, @PageableDefault(page = 1)Pageable pageable) {
        Page<MessageDTO> messageDTOPage = messageService.pagingReceiveOfTeacher(teacherId, pageable);
        int blockLimit = MESSAGE_LIST_BLOCK_LIMIT;
        // 프론트 보낼 Map 얻기!
        Map<String, Object> response = pageComponent.getHashMapPage(blockLimit, pageable, messageDTOPage, MESSAGE);

        return ResponseEntity.ok(response);
    }

    // 받은쪽지 목록 페이징 [학생]
    @GetMapping("/student/{studentId}/receive/paging")
    public ResponseEntity<?> pagingReceiveOfStudent(@PathVariable Long studentId, @PageableDefault(page = 1)Pageable pageable) {
        Page<MessageDTO> messageDTOPage = messageService.pagingReceiveOfStudent(studentId, pageable);
        int blockLimit = MESSAGE_LIST_BLOCK_LIMIT;
        // 프론트 보낼 Map 얻기!
        Map<String, Object> response = pageComponent.getHashMapPage(blockLimit, pageable, messageDTOPage, MESSAGE);

        return ResponseEntity.ok(response);
    }

    // 보낸쪽지 목록 페이징 [선생]
    @GetMapping("/teacher/{teacherId}/send/paging")
    public ResponseEntity<?> pagingSendOfTeacher(@PathVariable Long teacherId, @PageableDefault(page = 1)Pageable pageable) {
        Page<MessageDTO> messageDTOPage = messageService.pagingSendOfTeacher(teacherId, pageable);
        int blockLimit = MESSAGE_LIST_BLOCK_LIMIT;
        // 프론트 보낼 Map 얻기!
        Map<String, Object> response = pageComponent.getHashMapPage(blockLimit, pageable, messageDTOPage, MESSAGE);

        return ResponseEntity.ok(response);
    }

    // 보낸쪽지 목록 페이징 [학생]
    @GetMapping("/student/{studentId}/send/paging")
    public ResponseEntity<?> pagingSendOfStudent(@PathVariable Long studentId, @PageableDefault(page = 1)Pageable pageable) {
        Page<MessageDTO> messageDTOPage = messageService.pagingSendOfStudent(studentId, pageable);
        int blockLimit = MESSAGE_LIST_BLOCK_LIMIT;
        // 프론트 보낼 Map 얻기!
        Map<String, Object> response = pageComponent.getHashMapPage(blockLimit, pageable, messageDTOPage, MESSAGE);

        return ResponseEntity.ok(response);
    }

    // 쪽지 삭제 [선생]
    @PostMapping("/{messageId}/teacher/delete")
    public ResponseEntity<?> deleteMessageByTeacher(@PathVariable Long messageId) {
        if(messageService.deleteMessageByTeacher(messageId) == false)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("쪽지 삭제 실패");

        return ResponseEntity.ok("쪽지 삭제 성공");
    }

    // 쪽지 삭제 [학생]
    @PostMapping("/{messageId}/student/delete")
    public ResponseEntity<?> deleteMessageByStudent(@PathVariable Long messageId) {
        if(messageService.deleteMessageByStudent(messageId) == false)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("쪽지 삭제 실패");

        return ResponseEntity.ok("쪽지 삭제 성공");
    }

    // 쪽지 전송 취소 [통합] -> DB 삭제
    @PostMapping("/{messageId}/cancel")
    public ResponseEntity<?> cancelMessage(@PathVariable Long messageId) {
        if(messageService.cancelMessage(messageId) == false)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("쪽지 전송취소 실패");

        return ResponseEntity.ok("쪽지 전송취소 성공");
    }
}
