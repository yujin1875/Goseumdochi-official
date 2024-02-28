package com.midas.goseumdochi.student.Dto;
import com.midas.goseumdochi.student.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    private Long id;
    
    private String userId;

    private String userPassword;

    private String userName;

    private String userBirthDate;

    private String userPhoneNumber;
    

    public static UserDTO toUserDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId());
        userDTO.setUserId(userEntity.getUserId());
        userDTO.setUserPassword(userEntity.getUserPassword());
        userDTO.setUserName(userEntity.getUserName());
        userDTO.setUserBirthDate(userEntity.getUserBirthDate());
        userDTO.setUserPhoneNumber(userEntity.getUserPhoneNumber());
        return userDTO;
    }
}
