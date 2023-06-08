package com.sds.amasoft.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Getter
@Setter
public class SolicitationRequest {
    //    private static final long serialVersionUID = 65981149772133526L;
    private Long serviceId;

    private Long userId;
    private LocalDate date;
    private LocalTime time;
}
