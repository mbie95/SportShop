package com.ecommerce.sportshop.entity;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash("BasketItem")
public class BasketItem {
    @Id
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private String brand;
    private String type;
    private Integer quantity;
}