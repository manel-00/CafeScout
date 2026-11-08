package com.cafescout.dto;

import java.util.List;

public record LocationResponse(
        double latitude,
        double longitude,
        String message,
        List<CoffeeShopResponse> coffeeShops
) {}