package com.midas.goseumdochi.student.Repository;

import com.midas.goseumdochi.student.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUserId(String userId);

    // 아이디 찾기를 위한 쿼리, userPhoneNumber 필드 사용
    @Query("SELECT u.userId FROM UserEntity u WHERE u.userName = :userName AND u.userPhoneNumber = :userPhoneNumber")
    Optional<String> findUserIdByUserNameAndPhoneNumber(@Param("userName") String userName, @Param("userPhoneNumber") String userPhoneNumber);

    // 비밀번호 찾기를 위한 쿼리, userPhoneNumber 필드 사용
    @Query("SELECT u.userPassword FROM UserEntity u WHERE u.userId = :userId AND u.userName = :userName AND u.userPhoneNumber = :userPhoneNumber")
    Optional<String> findUserPasswordByUserIdAndUserNameAndPhoneNumber(@Param("userId") String userId, @Param("userName") String userName, @Param("userPhoneNumber") String userPhoneNumber);
}
