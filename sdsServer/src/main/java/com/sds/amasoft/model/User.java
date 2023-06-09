package com.sds.amasoft.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The persistent class for the user database table.
 *
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "TB_USER")
public class User implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 65981149772133526L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_ID")
	private Long id;

	@Column(name = "PROVIDER_USER_ID")
	private String providerUserId;

	private String email;

    private String phone;

	@Column(name = "enabled", columnDefinition = "BIT", length = 1)
	private boolean enabled;

	@Column(name = "DISPLAY_NAME")
	private String displayName;

	@Column(name = "created_date", nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	protected Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	protected Date modifiedDate;

	private String password;

	private String provider;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<Servicing> servicings;

	// bi-directional many-to-many association to Role
//	@JsonIgnore
    @JsonManagedReference
	@ManyToMany
	@JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	private Set<Role> roles;
}
