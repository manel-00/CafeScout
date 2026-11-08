package com.cafescout.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI cafeScoutOpenAPI() {
		return new OpenAPI()
				.info(new Info()
						.title("CafeScout API")
						.description("Backend API for the CafeScout coffee shop discovery and recommendation platform.")
						.version("v1"));
	}

}
