package com.stockwise.stockwise.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("StockWise API")
                        .version("1.0.0")
                        .description("API REST del sistema de inventarios StockWise. " +
                                "Permite gestionar productos, proveedores, categorias y movimientos de stock.")
                        .contact(new Contact().name("Equipo StockWise - UES FMOcc"))
                        .license(new License().name("Uso academico")));
    }
}
