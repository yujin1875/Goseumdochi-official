package com.midas.goseumdochi.admin.entity;

import com.midas.goseumdochi.director.entity.DirectorEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Date;

@Entity
@Table(name = "academy")
@Getter
@ToString
@NoArgsConstructor
public class AcademyEntity {
    @Id
    @Column(name = "acaNum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(name = "acaName")
    private String name;

    @Column(name = "acaPNum")
    private String pnum;

    @Column(name = "acaPostcode")
    private String postcode;

    @Column(name = "acaAddress")
    private String address;

    @Column(name = "acaAddressDetail")
    private String addressDetail;

    // 원장과 1:1 양방향 매핑 (보조 엔터티 (읽기전용))
    @OneToOne(mappedBy = "academyEntity")
    private DirectorEntity directorEntity;

    @Builder
    public AcademyEntity(int num, String name, String pnum, String postcode, String address, String addressDetail) {
        this.num = num;
        this.name = name;
        this.pnum = pnum;
        this.postcode = postcode;
        this.address = address;
        this.addressDetail = addressDetail;
    }
}
