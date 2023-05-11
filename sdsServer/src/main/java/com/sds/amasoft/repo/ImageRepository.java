package com.sds.amasoft.repo;

import com.sds.amasoft.model.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Page<Image> findAll(Pageable pageable);

    List<Image> findByServiceId(Long serviceId);
}
