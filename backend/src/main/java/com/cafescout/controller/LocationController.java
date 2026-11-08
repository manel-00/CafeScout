package com.cafescout.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafescout.dto.LocationRequest;
import com.cafescout.dto.LocationResponse;
import com.cafescout.service.LocationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/locations")
@Tag(name = "Location", description = "User location management")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping
    @Operation(summary = "Submit user's current location")
    public ResponseEntity<LocationResponse> submitLocation(
            @Valid @RequestBody LocationRequest request) {

        LocationResponse response =
                locationService.processLocation(request);

        return ResponseEntity.ok(response);
    }
}