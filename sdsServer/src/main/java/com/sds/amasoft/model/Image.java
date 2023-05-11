package com.sds.amasoft.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "TB_IMAGEM")
public class Image {

    private static final long serialVersionUID = 65981149772133526L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "IMAGE_ID", nullable = false)
    private Long id;

    @NotNull
    @NotEmpty(message = "The image URL cannot be empty")
    @Column(name = "NAME")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SERVICE_ID", nullable = false)
    private Servicing service;

    @Lob
    @Column(nullable = false)
    private byte[] data;
}
