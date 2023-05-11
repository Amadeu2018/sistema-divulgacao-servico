package com.sds.amasoft.repo;

import com.sds.amasoft.model.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {
    Page<Configuration> findAll(Pageable pageable);
}
