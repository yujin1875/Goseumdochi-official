package com.midas.goseumdochi.student.Service;

import com.midas.goseumdochi.student.Dto.UserDTO;
import com.midas.goseumdochi.student.Repository.UserRepository;
import com.midas.goseumdochi.student.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    //회원가입 로직
    public int join(UserDTO userDTO, String passwordCheck) {
        if(userDTO.getUserId() == null || userDTO.getUserPassword() == null || passwordCheck == null) {
            return -3; // 적절한 에러 코드 반환
        }

        // 아이디 중복 체크
        Optional<UserEntity> existingUser = userRepository.findByUserId(userDTO.getUserId());
        if(existingUser.isPresent()) { // 아이디 중복
            return -1;
        }
        else if(!userDTO.getUserPassword().equals(passwordCheck)) { // 비밀번호 불일치
            return -2;
        }
        else { // 회원가입 성공
            UserEntity userEntity = UserEntity.toUser(userDTO);
            userEntity.setUserBirthDate(userDTO.getUserBirthDate());
            userEntity.setUserPhoneNumber(userDTO.getUserPhoneNumber());
            userRepository.save(userEntity);
            return 1;
        }
    }

    // 로그인 로직
    public UserDTO login(UserDTO userDTO) {
        Optional<UserEntity> byUserId = userRepository.findByUserId(userDTO.getUserId());

        if(byUserId.isPresent()) {
            UserEntity userEntity = byUserId.get();
            if(userEntity.getUserPassword().equals(userDTO.getUserPassword())) {
                System.out.println("로그인 성공!");

                return UserDTO.toUserDTO(userEntity);
            } else {
                System.out.println("비밀번호가 일치하지 않습니다.");
                return null;
            }
        } else {
            System.out.println("존재하지 않는 아이디입니다.");
            return null;
        }
    }

    // 아이디 찾기
    public Optional<String> findUserIdByUserNameAndPhoneNumber(String userName, String userPhoneNumber) {
        return userRepository.findUserIdByUserNameAndPhoneNumber(userName, userPhoneNumber);
    }

    // 비밀번호 찾기
    public Optional<String> findUserPasswordByUserIdAndUserNameAndPhoneNumber(String userId, String userName, String userPhoneNumber) {
        return userRepository.findUserPasswordByUserIdAndUserNameAndPhoneNumber(userId, userName, userPhoneNumber);
    }

    //사용자 정보 수정
    public int updateUser(UserDTO userDTO) {
        Optional<UserEntity> existingUser = userRepository.findById(userDTO.getId());
        if(existingUser.isPresent()) {
            UserEntity userEntity = existingUser.get();
            userEntity.setUserName(userDTO.getUserName());
            userEntity.setUserPhoneNumber(userDTO.getUserPhoneNumber());
            userEntity.setUserBirthDate(userDTO.getUserBirthDate());
            userRepository.save(userEntity);
            return 1; // 성공
        }
        return -1; // 실패
    }

}


