package com.midas.goseumdochi.student.Repository;

import com.midas.goseumdochi.student.entity.AssignmentSubmissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmissionEntity, Long> {
    Optional<AssignmentSubmissionEntity> findByStudentIdAndAssignmentId(Long studentId, Long assignmentId);
    List<AssignmentSubmissionEntity> findByStudentId(Long studentId);

    List<AssignmentSubmissionEntity> findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);



}
