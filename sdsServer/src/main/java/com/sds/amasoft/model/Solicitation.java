package com.sds.amasoft.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"STATUS"})
@Table(name = "TB_SOLICITATION")
public class Solicitation implements Serializable {

    private static final long serialVersionUID = 65981149772133526L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "SOLICITATION_ID", nullable = false)
    private Long id;


    @Column(name = "DATE", nullable = false)
    private LocalDate date;

    @Column(name = "HOUR", nullable = false)
    private LocalTime hour;

    @Column(name = "STATUS")
    private Boolean status;

    //@Schema(description = "This is the Anime´s name", example = "Tensei Shittara Slime Datta Ken", required = true)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SERVICE_ID", nullable = false)
    private Servicing service;

}
