package com.midas.goseumdochi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Test {
    @Id
    private Long id;

    private String user;

    private String password;

    private LocalDateTime writtenTime;
}