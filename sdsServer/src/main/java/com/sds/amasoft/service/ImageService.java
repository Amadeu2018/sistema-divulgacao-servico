package com.sds.amasoft.service;

import com.sds.amasoft.model.Image;
import com.sds.amasoft.repo.ImageRepository;
import com.sds.amasoft.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final Utils utils;

    private final ImageRepository repository;


    public Page<Image> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

//    public List<Configuration> findByName(String name) {
//        return configurationRepository.findByName(name);
//    }

    public Image findById(Long id) {
        return utils.findImageOrThrowNotFound(id, repository);
    }

    public List<Image> findByServiceId(Long serviceId) {
        return repository.findByServiceId(serviceId);
    }

    @Transactional
    public Image save(Image image){
        return repository.save(image);
    }

    @Transactional
    public void update(Image image) {
        repository.save(image);
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(utils.findImageOrThrowNotFound(id, repository));
    }
}
