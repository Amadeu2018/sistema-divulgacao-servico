package com.sds.amasoft.controller;

import com.sds.amasoft.dto.SolicitationRequest;
import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.model.User;
import com.sds.amasoft.repo.SolicitationRepository;
import com.sds.amasoft.service.ServicingService;
import com.sds.amasoft.service.SolicitationServiceImpl;
import com.sds.amasoft.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/solicitations")
@Slf4j
@RequiredArgsConstructor
public class SolicitationController {

    private final SolicitationServiceImpl solicitationServiceImpl;
    private final SolicitationRepository repository;

    private final ServicingService servicingService;
    private final UserServiceImpl userService;


    @GetMapping("/all")
    public ResponseEntity<?> getContent() {
        return ResponseEntity.ok("Solicitation content goes here");
    }

    @GetMapping
//    @Operation(summary = "List all Services paginated", description = "The default size is 20, use the parameter size to change the default value",
//        tags = {"servicing"})
    public ResponseEntity<Page<Solicitation>> listAll(Pageable pageable) {
        return ResponseEntity.ok(solicitationServiceImpl.listAll(pageable));
    }

//    @GetMapping("/solicitation")
//    @GetMapping
//    public ResponseEntity<Page<Solicitation>> listAll(@RequestParam("page") int page, @RequestParam("size") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return ResponseEntity.ok(solicitationServiceImpl.listAll(pageable));
//    }


    @GetMapping("/{id}")
    public ResponseEntity<Solicitation> getById(@PathVariable Long id) {
        Solicitation solicitation = solicitationServiceImpl.findById(id);
        return ResponseEntity.ok(solicitation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitation> update(@PathVariable Long id, @RequestBody Solicitation solicitation) {
        Solicitation updatedSolicitation = solicitationServiceImpl.update(id, solicitation);
        return ResponseEntity.ok(updatedSolicitation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        solicitationServiceImpl.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Solicitation>> getByUserId(@PathVariable Long userId) {
        List<Solicitation> solicitations = solicitationServiceImpl.findByUserId(userId);
        return ResponseEntity.ok(solicitations);
    }

    @GetMapping("/user/{userId}/page")
    public ResponseEntity<Page<Solicitation>> getByUser(@PathVariable Long userId, Pageable pageable) {
        User user = new User();
        user.setId(userId);
        Page<Solicitation> solicitations = solicitationServiceImpl.findByUser(user, pageable);
        return ResponseEntity.ok(solicitations);
    }

    @GetMapping("/service/{serviceId}/{status}")
    public ResponseEntity<Page<Solicitation>> getByServiceAndStatus(@PathVariable Long serviceId, @PathVariable Status status, Pageable pageable) {
        Page<Solicitation> solicitations = solicitationServiceImpl.findByServiceAndStatus(serviceId, status, pageable);
        return ResponseEntity.ok(solicitations);
    }

    @PostMapping("/request")
    public ResponseEntity<String> requestService(@RequestParam("userId") Long userId, @RequestParam("serviceId") Long serviceId) {
        Solicitation solicitation = solicitationServiceImpl.requestService(userId, serviceId);
        if (solicitation != null) {
            // A solicitação foi realizada com sucesso
            return ResponseEntity.ok("A sua solicitação foi recebida com sucesso, ligaremos para você brevemente!");
        } else {
            // Já existe uma solicitação para este serviço pelo usuário
            return ResponseEntity.badRequest().body("Você já fez uma solicitação para este serviço");
        }
    }


//    @GetMapping("/byUser/{userId}")
//    public ResponseEntity<Page<Solicitation>> findByUser(@PathVariable Long userId,
//                                                         @RequestParam(defaultValue = "0") int page,
//                                                         @RequestParam(defaultValue = "10") int size) {
//        Page<Solicitation> solicitations = solicitationService.findByUser(new User(userId), PageRequest.of(page, size));
//        return ResponseEntity.ok(solicitations);
//    }
//
//    @GetMapping("/byServiceAndStatus/{serviceId}")
//    public ResponseEntity<Page<Solicitation>> findByServiceAndStatus(@PathVariable Long serviceId,
//                                                                     @RequestParam Status status,
//                                                                     @RequestParam(defaultValue = "0") int page,
//                                                                     @RequestParam(defaultValue = "10") int size) {
//        Page<Solicitation> solicitations = solicitationService.findByServiceAndStatus(new Servicing(serviceId), PageRequest.of(page, size));
//        return ResponseEntity.ok(solicitations);

//    @GetMapping(path = "/find")
//    public ResponseEntity<List<Solicitation>> findByName(@RequestParam(value = "name") String name) {
//        return ResponseEntity.ok(solicitationService.findByName(name));
//    }

//    @PostMapping(consumes = "application/json")
//    public ResponseEntity<Solicitation> save(@RequestBody @Valid Solicitation solicitation) {
//        return ResponseEntity.ok(solicitationService.save(solicitation));
//    }



//    @PutMapping("/{id}")
//    public ResponseEntity<Void> update(@PathVariable("id") Long id, @RequestBody Solicitation solicitation) {
//        solicitation.setId(id);
//        solicitationService.update(solicitation);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }


}
