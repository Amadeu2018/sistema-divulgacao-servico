package com.sds.amasoft.util;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.sds.amasoft.exception.ResourceNotFoundException;
import com.sds.amasoft.model.Image;
import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.repo.ImageRepository;
import com.sds.amasoft.repo.ServicingRepository;
import com.sds.amasoft.repo.SolicitationRepository;
import org.springframework.stereotype.Component;

@Component
public class Utils {

    public String formatLocalDateTimeToDatabaseStyle(LocalDateTime localDateTime) {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(localDateTime);
    }

    public Servicing findServiceOrThrowNotFound(Long id, ServicingRepository servicingRepository) {
        return servicingRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Service Not Found"));
    }

    public Solicitation findSolicitationOrThrowNotFound(Long id, SolicitationRepository solicitationRepository) {
        return solicitationRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Solicitation Not Found"));
    }

    public Image findImageOrThrowNotFound(Long id, ImageRepository imageRepository) {
        return imageRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Image Not Found"));
    }

}
