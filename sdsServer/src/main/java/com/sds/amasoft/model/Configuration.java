package com.sds.amasoft.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "TB_CONFIGURATION")
public class Configuration {

    private static final long serialVersionUID = 65981149772133526L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "IMAGE_ID", nullable = false)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "PHRASE")
    private String phrase;

    @Column(name = "PHONE1")
    private String phone1;

    @Column(name = "PHONE2")
    private String phone2;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ADDRESS")
    private String eddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;
}
