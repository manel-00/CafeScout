package com.cafescout.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Test", description = "Endpoint used to verify the backend is running")
public class TestController {

	@Operation(
			summary = "Verify the backend is running",
			description = "Returns a confirmation message indicating the CafeScout backend started successfully."
	)
	@GetMapping("/test")
	public ResponseEntity<Map<String, String>> test() {
		return ResponseEntity.ok(Map.of("message", "CafeScout backend is running successfully!"));
	}

}
