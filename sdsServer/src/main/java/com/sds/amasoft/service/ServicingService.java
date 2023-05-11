package com.sds.amasoft.service;

import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.repo.ServicingRepository;
import com.sds.amasoft.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

//@Repository
@Service
@RequiredArgsConstructor
public class ServicingService {

    private final Utils utils;

    private final ServicingRepository repository;

//    private final EntityUtils<Servicing> utils;
//    private final EntityRepository<Servicing, Long> repository;

//    public ServicingService(EntityUtils<Servicing> utils, EntityRepository<Servicing, Long> repository) {
//        this.utils = utils;
//        this.repository = repository;
//    }


    public Page<Servicing> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Servicing> getAll() {
        return repository.findAll();
    }

//    public List<Servicing> findByName(String name) {
//        return repository.findByName(name);
//    }

    public Servicing findById(Long id) {
        return utils.findServiceOrThrowNotFound(id, repository);
    }
//    @Transactional
//    public Servicing save(Servicing servicing) {
//        if (servicing.getDateRegistration() == null) {
//            // Se a data de registro estiver nula, defina como a data atual
//            servicing.setDateRegistration(OffsetDateTime.now());
//        }
//        if (servicing.getPrice() == null || servicing.getPrice() <= 0) {
//            // Se o preço estiver nulo ou zero, lance uma exceção
//            throw new IllegalArgumentException("Price must be greater than zero");
//        }
//        return servicingRepository.save(servicing);
//    }
public Servicing create(Servicing servicing) {
    servicing.getSolicitations().clear();
    return repository.save(servicing);
}


//    public Servicing save(Servicing servicing) {
//        return repository.save(servicing);
//    }

//    @Transactional
//    public Servicing save(Servicing servicing){
//        //validações customizadas
////        if (servicing.getDateRegistration() == null) {
////            throw new IllegalArgumentException("Date registration cannot be null");
////        }
//        if (servicing.getPrice() == null || servicing.getPrice() <= 0){
//            throw new IllegalArgumentException("Price must be greater than zero");
//        }
//        return repository.save(servicing);
//    }

    public void delete(Long id) {
        Servicing servicing = findById(id);
        repository.delete(servicing);
    }

//    public void delete(Long id) {
//        repository.delete(utils.findServiceOrThrowNotFound(id, repository));
//    }

    public Servicing update(Long id, Servicing servicing) {
        Servicing oldServicing = findById(id);
        oldServicing.setName(servicing.getName());
        oldServicing.setDescription(servicing.getDescription());
        oldServicing.setPrice(servicing.getPrice());
        // adicione qualquer outro atributo que você queira atualizar aqui
        return repository.save(oldServicing);
    }


//    public Servicing update(Long id, Servicing servicing) {
//        Servicing oldServicing = findById(id);
//        BeanUtils.copyProperties(servicing, oldServicing, "id");
//        return repository.save(oldServicing);
//    }
//    @Transactional
//    public void update(Servicing servicing) {
//        repository.save(servicing);
//    }
}
