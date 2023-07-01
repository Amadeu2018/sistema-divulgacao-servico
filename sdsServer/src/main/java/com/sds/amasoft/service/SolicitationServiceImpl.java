package com.sds.amasoft.service;

import com.sds.amasoft.exception.BadRequestException;
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
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SolicitationServiceImpl implements SolicitationService {

    private final Utils utils;

    private final SolicitationRepository repository;
    private final ServicingService servicingService;
    private final UserServiceImpl userService;


    @Override
    public Page<Solicitation> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Page<Solicitation> listAllSolicitationAccept(Pageable pageable) {
        return repository.findAllByStatusTrue(pageable);
    }


    public List<Solicitation> findAll() {
        return repository.findAll();
    }

    @Transactional
    public Solicitation save(Solicitation solicitation){
        return repository.save(solicitation);
    }


    public Page<Solicitation> findByServiceAndStatus(Servicing service, Status status, Pageable pageable) {
        return repository.findByServiceAndStatus(service, status, pageable);
    }

    @Override
    public Solicitation create(Solicitation solicitation) {
        return repository.save(solicitation);
    }


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
    public void updateStatus(Long id) {
        Optional<Solicitation> optionalSolicitation = repository.findById(id);
        optionalSolicitation.ifPresent(solicitation -> {
            boolean status = solicitation.getStatus() != null && solicitation.getStatus();
            solicitation.setStatus(!status);
            repository.save(solicitation);
        });
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

    @Override
    @Transactional
    public Solicitation requestService(Long userId, Long serviceId) {
        if (existsByUserIdAndServiceId(userId, serviceId)) {
            throw new BadRequestException("Você já fez uma solicitação para este serviço");
        } else {
            Solicitation solicitation = new Solicitation();
            solicitation.setDate(LocalDate.now());
            solicitation.setHour(LocalTime.now());
            solicitation.setStatus(false);

            Optional<User> userOptional = userService.findUserById(userId);
            if (userOptional.isEmpty()) {
                throw new ResourceNotFoundException("User not found with id " + userId);
            }
            User user = userOptional.get();
            solicitation.setUser(user);

            Servicing service = servicingService.findById(serviceId);
            if (service == null) {
                throw new ResourceNotFoundException("Service not found with id " + serviceId);
            }
            solicitation.setService(service);

            return repository.save(solicitation);
        }
    }

    @Override
    public Boolean existsByUserIdAndServiceId(Long userId, Long serviceId) {
        return repository.existsByUserIdAndServiceId(userId, serviceId);

    }


}
