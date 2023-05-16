package com.sds.amasoft.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"solicitations", "images", "hibernateLazyInitializer"})
@Table(name = "TB_SERVICE")
public class Servicing implements Serializable {

    private static final long serialVersionUID = 65981149772133526L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "SERVICE_ID", nullable = false)
    private Long id;

    @NotNull
    @NotEmpty(message = "The name of this service cannot be empty")
    //@Schema(description = "This is the Anime´s name", example = "Tensei Shittara Slime Datta Ken", required = true)
    @Column(name = "NAME")
    private String name;

    @NotNull
    @NotEmpty(message = "The description of this service cannot be empty")
    //@Schema(description = "This is the Anime´s name", example = "Tensei Shittara Slime Datta Ken", required = true)
    @Column(name = "DESCRIPTION")
    private String description;

    @NotNull(message = "The price of this service cannot be null")
    @Column(name = "PRICE")
    private Double price;

    @OneToMany(mappedBy = "service",fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    @Column(name = "photo")
    @Lob
    private byte[] photo;

//    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ServiceImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "service", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
//    @JoinColumn(name = "SOLICITATION_ID")
    private List<Solicitation> solicitations = new ArrayList<>();

//    @NotEmpty(message = "The Registration date of this service cannot be empty")
//    //@Schema(description = "This is the Anime´s name", example = "Tensei Shittara Slime Datta Ken", required = true)
//    @Column(name = "DATE_REGISTRATION", nullable = false)
//    @DateTimeFormat(pattern	=	"dd-MM-yyyy")
//    private Date dateRegistration;
}
