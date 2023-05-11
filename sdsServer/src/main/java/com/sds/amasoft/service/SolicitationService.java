package com.sds.amasoft.service;

import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SolicitationService {

    Solicitation create(Solicitation solicitation);
    Solicitation update(Long id, Solicitation solicitation);
    void delete(Long id);
    Solicitation findById(Long id);
    List<Solicitation> findByUserId(Long userId);
    Page<Solicitation> findByUser(User user, Pageable pageable);
    Page<Solicitation> findByServiceAndStatus(Long serviceId, Status status, Pageable pageable);
}
