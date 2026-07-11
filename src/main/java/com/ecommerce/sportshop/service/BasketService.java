package com.ecommerce.sportshop.service;

import com.ecommerce.sportshop.entity.Basket;
import com.ecommerce.sportshop.model.BasketResponse;

import java.util.List;

public interface BasketService {
    List<BasketResponse> getAllBaskets();
    BasketResponse getBasketById(String basketId);
    void deleteBasketById(String basketId);
    BasketResponse createBasket(Basket basket);
}
