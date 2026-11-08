
package com.cafescout.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;

public record LocationRequest(

        @NotNull
        @DecimalMin("-90.0")
        @DecimalMax("90.0")
        @Schema(example = "36.8065")
        Double latitude,

        @NotNull
        @DecimalMin("-180.0")
        @DecimalMax("180.0")
        @Schema(example = "10.1815")
        Double longitude

) {}
