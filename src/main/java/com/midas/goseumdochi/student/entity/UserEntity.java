package com.midas.goseumdochi.student.entity;
import com.midas.goseumdochi.student.Dto.UserDTO;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "users")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userId;

    @Column
    private String userPassword;

    @Column
    private String userName;

    @Column
    private String userBirthDate;

    @Column
    private String userPhoneNumber;

    public static UserEntity toUser(UserDTO userDTO){
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userDTO.getUserId());
        userEntity.setUserPassword(userDTO.getUserPassword());
        userEntity.setUserName(userDTO.getUserName());
        return userEntity;
    }
}
