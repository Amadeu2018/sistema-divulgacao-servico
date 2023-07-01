package com.sds.amasoft.service;

import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SolicitationService {

    Solicitation create(Solicitation solicitation);

    Solicitation update(Long id, Solicitation solicitation);

    void updateStatus(Long id);

    void delete(Long id);

    Solicitation findById(Long id);

    List<Solicitation> findByUserId(Long userId);

    Page<Solicitation> findByUser(User user, Pageable pageable);

    Page<Solicitation> findByServiceAndStatus(Long serviceId, Status status, Pageable pageable);

    Solicitation requestService(Long userId, Long serviceId);

    Boolean existsByUserIdAndServiceId(Long userId, Long serviceId);

    Page<Solicitation> listAll(Pageable pageable);

    Page<Solicitation> listAllSolicitationAccept(Pageable pageable);
}
