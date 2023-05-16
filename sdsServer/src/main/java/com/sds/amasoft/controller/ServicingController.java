package com.sds.amasoft.controller;

import com.sds.amasoft.model.Servicing;
import com.sds.amasoft.model.Solicitation;
import com.sds.amasoft.model.Status;
import com.sds.amasoft.service.ServicingService;
import com.sds.amasoft.service.SolicitationServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;

import javax.servlet.http.Part;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/services")
@Slf4j
@RequiredArgsConstructor
public class ServicingController {

    private final ServicingService servicingService;
    private final SolicitationServiceImpl solicitationServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<?> getContent() {
        return ResponseEntity.ok("Services content goes here");
    }

    @GetMapping
//    @Operation(summary = "List all Services paginated", description = "The default size is 20, use the parameter size to change the default value",
//        tags = {"servicing"})
    public ResponseEntity<Page<Servicing>> listAll(Pageable pageable) {
        return ResponseEntity.ok(servicingService.listAll(pageable));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Servicing> findById(@PathVariable Long id) {
        return ResponseEntity.ok(servicingService.findById(id));
    }

//    @GetMapping(path = "/find")
//    public ResponseEntity<List<Servicing>> findByName(@RequestParam(value = "name") String name) {
//        return ResponseEntity.ok(servicingService.findByName(name));
//    }

    @PostMapping
    public ResponseEntity<Servicing> create(@RequestBody @Valid Servicing servicing) {
        Servicing createdServicing = servicingService.create(servicing);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdServicing);
    }

    @PostMapping("/servicing/{servicingId}/solicitations")
    public ResponseEntity<Solicitation> createSolicitation(@PathVariable Long servicingId, @RequestBody Solicitation solicitation) {
        Servicing servicing = servicingService.findById(servicingId);
        if (servicing == null) {
            return ResponseEntity.notFound().build();
        }

        solicitation.setService(servicing);
        solicitation.setStatus(Status.PENDING);
        Solicitation newSolicitation = solicitationServiceImpl.create(solicitation);
        return ResponseEntity.ok(newSolicitation);
    }


//    @PostMapping
//    public ResponseEntity<Servicing> save(@RequestBody @Valid Servicing servicing) {
//        Servicing createdServicing = servicingService.save(servicing);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdServicing);
//    }

//    @PostMapping(consumes = "application/json")
//    public ResponseEntity<Servicing> save(@RequestBody @Valid Servicing servicing) {
//        return ResponseEntity.ok(servicingService.save(servicing));
//    }

    @DeleteMapping(path = "/admin/{id}")
//    @ApiResponses(value = {
//        @ApiResponse(responseCode = "204", description = "Sucessful Operation"),
//        @ApiResponse(responseCode = "400", description = "When Service Does not Exist in the Database")
//    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        servicingService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PutMapping
//    public ResponseEntity<Void> update(@RequestBody Servicing servicing) {
//        servicingService.update(servicing);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicing> update(@PathVariable Long id, @RequestBody @Valid Servicing servicing) {
        Servicing updatedServicing = servicingService.update(id, servicing);
        return ResponseEntity.ok(updatedServicing);
    }

    @PutMapping("{id}/img")
    public ResponseEntity<byte[]> addPhoto(@PathVariable Long id, @RequestParam("photo") Part arquivo) {
        byte[] updateImgServing = servicingService.addImg(id, arquivo);
        return ResponseEntity.ok(updateImgServing);
    }


//    @PutMapping("/{id}")
//    public ResponseEntity<Servicing> update(@PathVariable Long id, @RequestBody @Valid Servicing servicing) {
//        Servicing updatedServicing = servicingService.update(id, servicing);
//        return ResponseEntity.ok(updatedServicing);
//    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Void> update(@PathVariable("id") Long id, @RequestBody Servicing servicing) {
//        servicing.setId(id);
//        servicingService.update(servicing);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

}
