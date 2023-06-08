package com.sds.amasoft.repo;

import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolicitationRepository extends JpaRepository<Solicitation, Long> {
    Page<Solicitation> findAll(Pageable pageable);

    Optional<Solicitation> findByIdAndUser_Id(Long id, Long userId);

    List<Solicitation> findByUser_Id(Long userId);

    Page<Solicitation> findByUser(User user, Pageable pageable);

    Page<Solicitation> findByServiceAndStatus(Servicing service, Status status, Pageable pageable);

    boolean existsByUser_IdAndService_Id(Long userId, Long serviceId);
}
