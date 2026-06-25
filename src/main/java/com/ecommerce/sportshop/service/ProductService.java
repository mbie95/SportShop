package com.ecommerce.sportshop.service;

import com.ecommerce.sportshop.model.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    ProductResponse getProductById(Integer productId);
    Page<ProductResponse> getAllProducts(Pageable pageable);
}
