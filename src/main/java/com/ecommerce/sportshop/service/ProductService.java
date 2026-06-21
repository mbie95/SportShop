package com.ecommerce.sportshop.service;

import com.ecommerce.sportshop.model.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Integer productId);
    List<ProductResponse> getAllProducts();
}
