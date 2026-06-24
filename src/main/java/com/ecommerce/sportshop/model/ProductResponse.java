package com.ecommerce.sportshop.model;

import com.ecommerce.sportshop.entity.Brand;
import com.ecommerce.sportshop.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private String pictureUrl;
    private String brand;
    private String type;
}
