package com.sds.amasoft.service;

import com.sds.amasoft.exception.ResourceNotFoundException;
import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.model.User;
import com.sds.amasoft.repo.SolicitationRepository;
import com.sds.amasoft.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitationServiceImpl implements SolicitationService {

    private final Utils utils;

    private final SolicitationRepository repository;


    public Page<Solicitation> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

//    public List<Configuration> findByName(String name) {
//        return configurationRepository.findByName(name);
//    }

    public List<Solicitation> findAll() {
        return repository.findAll();
    }

//    public Solicitation findById(Long id) {
//        return utils.findSolicitationOrThrowNotFound(id, repository);
//    }

    @Transactional
    public Solicitation save(Solicitation solicitation){
        return repository.save(solicitation);
    }


//    public void delete(Long id) {
//        repository.delete(utils.findSolicitationOrThrowNotFound(id, repository));
//    }
//
//    @Transactional
//    public void update(Solicitation solicitation) {
//        repository.save(solicitation);
//    }
//
//    public Page<Solicitation> findByUser(User user, Pageable pageable) {
//        return repository.findByUser(user, pageable);
//    }

    public Page<Solicitation> findByServiceAndStatus(Servicing service, Status status, Pageable pageable) {
        return repository.findByServiceAndStatus(service, status, pageable);
    }


    @Override
    public Solicitation create(Solicitation solicitation) {
        return repository.save(solicitation);
    }

//    @Override
//    public Solicitation update(Long id, Solicitation solicitation) {
//        Solicitation existing = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Solicitation not found with id " + id));
//        existing.setDate(solicitation.getDate());
//        existing.setHour(solicitation.getHour());
//        existing.setStatus(solicitation.getStatus());
//        existing.setUser(solicitation.getUser());
//        existing.setService(solicitation.getService());
//        return repository.save(existing);
//    }

    @Override
    public Solicitation update(Long id, Solicitation solicitation) {
        Solicitation existing = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Solicitation not found with id " + id));
        existing.setDate(solicitation.getDate());
        existing.setHour(solicitation.getHour());
        existing.setStatus(solicitation.getStatus());
        existing.setUser(solicitation.getUser());
        existing.setService(solicitation.getService());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Solicitation findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Solicitation not found with id " + id));
    }

    @Override
    public List<Solicitation> findByUserId(Long userId) {
        return repository.findByUser_Id(userId);
    }

    @Override
    public Page<Solicitation> findByUser(User user, Pageable pageable) {
        return repository.findByUser(user, pageable);
    }

    @Override
    public Page<Solicitation> findByServiceAndStatus(Long serviceId, Status status, Pageable pageable) {
        Servicing service = new Servicing();
        service.setId(serviceId);
        return repository.findByServiceAndStatus(service, status, pageable);
    }

}
