package com.sds.amasoft.repo;

import com.sds.amasoft.model.Servicing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicingRepository extends JpaRepository<Servicing, Long> {
//    List<Servicing> findByName(String name);

    Page<Servicing> findAll(Pageable pageable);

    List<Servicing> findByNameContainingIgnoreCase(String name);

}
