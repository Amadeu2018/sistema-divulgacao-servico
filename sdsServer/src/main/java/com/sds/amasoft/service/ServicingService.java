package com.sds.amasoft.service;

import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.repo.ServicingRepository;
import com.sds.amasoft.util.Utils;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

//@Repository
@Service
@RequiredArgsConstructor
public class ServicingService {

    private final Utils utils;

    private final ServicingRepository repository;


    public Page<Servicing> listAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Servicing> getAll() {
        return repository.findAll();
    }


    public Servicing findById(Long id) {
        return utils.findServiceOrThrowNotFound(id, repository);
    }

    public Servicing create(Servicing servicing) {
        servicing.getSolicitations().clear();
        return repository.save(servicing);
    }


    public void delete(Long id) {
        Servicing servicing = findById(id);
        repository.delete(servicing);
    }


    public Servicing update(Long id, Servicing servicing) {
        Servicing oldServicing = findById(id);
        oldServicing.setName(servicing.getName());
        oldServicing.setDescription(servicing.getDescription());
        oldServicing.setPrice(servicing.getPrice());
        // adicione qualquer outro atributo que você queira atualizar aqui
        return repository.save(oldServicing);
    }

    public byte[] addImg(Long id, Part arquivo) {
        Optional<Servicing> servicing = repository.findById(id);
        return servicing.map(c -> {
            try {
                InputStream is = arquivo.getInputStream();
                byte[] bytes = new byte[(int) arquivo.getSize()];
                IOUtils.readFully(is, bytes);
                c.setPhoto(bytes);
                repository.save(c);
                is.close();
                return bytes;
            } catch (IOException e) {
                return null;
            }
        }).orElse(null);
    }

}
