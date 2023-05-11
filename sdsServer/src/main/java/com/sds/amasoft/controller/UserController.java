package com.sds.amasoft.controller;

import com.sds.amasoft.model.User;
import com.sds.amasoft.service.UserServiceImpl;
import com.sds.amasoft.config.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sds.amasoft.dto.LocalUser;
import com.sds.amasoft.util.GeneralUtils;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getCurrentUser(@CurrentUser LocalUser user) {
		return ResponseEntity.ok(GeneralUtils.buildUserInfo(user));
	}

	@GetMapping("/all")
	public ResponseEntity<?> getContent() {
		return ResponseEntity.ok("Public content goes here");
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getUserContent() {
		return ResponseEntity.ok("Bem a tela de Usuário");
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAdminContent() {
		return ResponseEntity.ok("Bem a tela de Administrador");
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public ResponseEntity<?> getModeratorContent() {
		return ResponseEntity.ok("Bem a tela de Supervisor");
	}

    @GetMapping
    public ResponseEntity<Page<User>> findAll(Pageable pageable) {
        return ResponseEntity.ok(userService.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
