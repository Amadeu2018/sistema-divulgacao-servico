package com.sds.amasoft.controller;

import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.model.User;
import com.sds.amasoft.repo.SolicitationRepository;
import com.sds.amasoft.service.ServicingService;
import com.sds.amasoft.service.SolicitationService;
import com.sds.amasoft.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/solicitations")
@Slf4j
@RequiredArgsConstructor
public class SolicitationController {

//    private final SolicitationServiceImpl solicitationServiceImpl;
    private final SolicitationService solicitationService;
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
        return ResponseEntity.ok(solicitationService.listAll(pageable));
    }

    @GetMapping("/status/true")
    public ResponseEntity<Page<Solicitation>> listAllWithStatusTrue(Pageable pageable) {
        return ResponseEntity.ok(solicitationService.listAllSolicitationAccept(pageable));
    }



    @GetMapping("/{id}")
    public ResponseEntity<Solicitation> getById(@PathVariable Long id) {
        Solicitation solicitation = solicitationService.findById(id);
        return ResponseEntity.ok(solicitation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitation> update(@PathVariable Long id, @RequestBody Solicitation solicitation) {
        Solicitation updatedSolicitation = solicitationService.update(id, solicitation);
        return ResponseEntity.ok(updatedSolicitation);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        solicitationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Solicitation>> getByUserId(@PathVariable Long userId) {
        List<Solicitation> solicitations = solicitationService.findByUserId(userId);
        return ResponseEntity.ok(solicitations);
    }

    @GetMapping("/user/{userId}/page")
    public ResponseEntity<Page<Solicitation>> getByUser(@PathVariable Long userId, Pageable pageable) {
        User user = new User();
        user.setId(userId);
        Page<Solicitation> solicitations = solicitationService.findByUser(user, pageable);
        return ResponseEntity.ok(solicitations);
    }

    @GetMapping("/service/{serviceId}/{status}")
    public ResponseEntity<Page<Solicitation>> getByServiceAndStatus(@PathVariable Long serviceId, @PathVariable Status status, Pageable pageable) {
        Page<Solicitation> solicitations = solicitationService.findByServiceAndStatus(serviceId, status, pageable);
        return ResponseEntity.ok(solicitations);
    }

    @GetMapping("/check-solicitation")
    public ResponseEntity<?> checkIfSolicitationExists(@RequestParam("userId") Long userId, @RequestParam("serviceId") Long serviceId) {
        boolean exists = solicitationService.existsByUserIdAndServiceId(userId, serviceId);
        return ResponseEntity.ok().body(Map.of("exists", exists));
    }


    @PostMapping("/request")
    public ResponseEntity<?> requestService(@RequestParam("userId") Long userId, @RequestParam("serviceId") Long serviceId) {
        Solicitation solicitation = solicitationService.requestService(userId, serviceId);
        if (solicitation != null) {
            return ResponseEntity.ok("A sua solicitação foi recebida com sucesso, ligaremos para você brevemente!");
        } else {
            return ResponseEntity.badRequest().body("Você já fez uma solicitação para este serviço");
        }
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id) {
        solicitationService.updateStatus(id);
        return ResponseEntity.noContent().build();
    }

}
