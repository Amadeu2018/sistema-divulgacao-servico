package com.sds.amasoft.service;

import com.sds.amasoft.model.Configuration;
import com.sds.amasoft.repo.ConfigurationRepository;
import com.sds.amasoft.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ConfigurationService {

    private final Utils utils;
    private final ConfigurationRepository repository;

//    private final ConfigurationRepository repository;

//    public ConfigurationService(EntityUtils<Configuration> utils, EntityRepository<Configuration, Long> repository) {
//        this.utils = utils;
//        this.repository = repository;
//    }


    public Page<Configuration> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

//    public Configuration findById(Long id) {
//        return utils.findOrThrowNotFound(id, repository);
//    }

//    public void delete(Long id) {
//        repository.delete(utils.findOrThrowNotFound(id, repository));
//    }

    @Transactional
    public Configuration save(Configuration configuration){
        return repository.save(configuration);
    }


    @Transactional
    public void update(Configuration configuration) {
        repository.save(configuration);
    }
}
