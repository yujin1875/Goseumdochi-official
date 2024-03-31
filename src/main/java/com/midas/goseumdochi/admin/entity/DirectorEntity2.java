package com.midas.goseumdochi.admin.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Date;

@Entity
@Table(name = "director2")
@Getter
@ToString
@NoArgsConstructor
public class DirectorEntity2 {
    @Id
    @Column(name = "dNum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(name = "dName")
    private String name;

    @Column(name = "dId", length = 8)
    private String id;

    @Column(name = "dPassword")
    @ColumnDefault("0000")
    private String password;

    @Column(name = "dPNum")
    private String pnum;

    @Column(name = "dBirth")
    private Date birth;

    @Column(name = "dEmail")
    private String email;

    @Builder
    public DirectorEntity2(int num, String name, String id, String password, String pnum, Date birth, String email) {
        this.num = num;
        this.name = name;
        this.id = id;
        this.password = password;
        this.pnum = pnum;
        this.birth = birth;
        this.email = email;
    }
}
