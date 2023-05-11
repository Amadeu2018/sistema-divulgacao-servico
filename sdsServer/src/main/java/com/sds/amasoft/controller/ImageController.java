package com.sds.amasoft.controller;

import com.sds.amasoft.model.Image;
import com.sds.amasoft.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@Slf4j
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

//    public ImageController(ImageService imageService) {
//        this.imageService = imageService;
//    }

    @GetMapping
//    @Operation(summary = "List all Services paginated", description = "The default size is 20, use the parameter size to change the default value",
//        tags = {"servicing"})
    public ResponseEntity<Page<Image>> listAll(Pageable pageable) {
        return ResponseEntity.ok(imageService.listAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> findById(@PathVariable Long id) {
        return ResponseEntity.ok(imageService.findById(id));
    }

    @GetMapping("/byServiceId/{serviceId}")
    public ResponseEntity<List<Image>> findByServiceId(@PathVariable Long serviceId) {
        return ResponseEntity.ok(imageService.findByServiceId(serviceId));
    }

    @PostMapping
    public ResponseEntity<Image> create(@RequestBody Image image) {
        return ResponseEntity.ok(imageService.save(image));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody Image image) {
        image.setId(id);
        imageService.update(image);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        imageService.delete(id);
        return ResponseEntity.ok().build();
    }

}
