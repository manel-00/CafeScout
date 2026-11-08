
package com.cafescout.service;

import com.cafescout.dto.CoffeeShopResponse;
import com.cafescout.dto.LocationRequest;
import com.cafescout.dto.LocationResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.MediaType;

import tools.jackson.databind.JsonNode;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class LocationService {

    private static final Logger logger =
            LoggerFactory.getLogger(LocationService.class);

    private final RestClient restClient;

    public LocationService(RestClient restClient) {
        this.restClient = restClient;
    }

    public LocationResponse processLocation(LocationRequest request) {

        double latitude = request.latitude();
        double longitude = request.longitude();

        String query = """
                [out:json][timeout:25];
                nwr(around:2000,%f,%f)["amenity"="cafe"];
                out center tags;
                """.formatted(latitude, longitude);

        String encodedQuery = "data=" +
                URLEncoder.encode(query, StandardCharsets.UTF_8);

        JsonNode result;

        try {
            result = restClient.post()
                    .uri("/api/interpreter")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(encodedQuery)
                    .retrieve()
                    .body(JsonNode.class);

        } catch (Exception e) {
            logger.error(
                    "Failed to retrieve nearby coffee shops from Overpass API",
                    e
            );
            throw e;
        }

        List<CoffeeShopResponse> coffeeShops = new ArrayList<>();

        if (result != null) {
            for (JsonNode element : result.path("elements")) {

                JsonNode nameNode = element.path("tags").path("name");

                String name = nameNode.isMissingNode() || nameNode.isNull()
                        ? ""
                        : nameNode.asString();

                if (name.isBlank()) {
                    continue;
                }

                double cafeLat = element.path("center")
                        .path("lat").asDouble(
                                element.path("lat").asDouble()
                        );

                double cafeLon = element.path("center")
                        .path("lon").asDouble(
                                element.path("lon").asDouble()
                        );

                double distance = calculateDistance(
                        latitude, longitude,
                        cafeLat, cafeLon
                );

                coffeeShops.add(new CoffeeShopResponse(
                        name,
                        cafeLat,
                        cafeLon,
                        Math.round(distance)
                ));
            }
        }

        coffeeShops.sort(
                Comparator.comparingDouble(
                        CoffeeShopResponse::distanceInMeters
                )
        );

        return new LocationResponse(
                latitude,
                longitude,
                "Nearby coffee shops retrieved successfully",
                coffeeShops
        );
    }

    private double calculateDistance(
            double lat1, double lon1,
            double lat2, double lon2) {

        double earthRadius = 6371000;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
        );

        return earthRadius * c;
    }
}
