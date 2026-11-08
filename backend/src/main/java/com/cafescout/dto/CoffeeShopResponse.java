package com.cafescout.dto;

public record CoffeeShopResponse(
        String name,
        double latitude,
        double longitude,
        double distanceInMeters
) {}