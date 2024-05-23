package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.*;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.repository.*;
import com.AccountRentalHub.services.CartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private AccountRentalRepository accountRentalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RentalHistoryRepository rentalHistoryRepository;

    @Autowired
    private AccountRentalPackageRepository accountRentalPackageRepository;

    @Override
    public void addItemToCart(Long userId, Long accountRentalId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user);
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }

        AccountRental accountRental = accountRentalRepository.findById(accountRentalId)
                .orElseThrow(() -> new RuntimeException("Account rental not found"));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setAccountRental(accountRental);
        cartItem.setQuantity(quantity);

        cartItemRepository.save(cartItem);
    }

    @Transactional
    @Override
    public void createOrderFromCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user);
        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Customer customer = customerRepository.findByUser(user);

        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(new Date());
        order.setStatus("PENDING");

        List<OrderDetail> orderDetails = cart.getCartItems().stream().map(cartItem -> {
            OrderDetail orderDetail = new OrderDetail();
            if(orderDetail.getRentalAccount().getAccountRentalPackage().getAmount() < 1) {
                throw new RuntimeException("Package: " + orderDetail.getRentalAccount().getAccountRentalPackage().getName() +  " is out of stock");
            }
            orderDetail.setOrder(order);
            orderDetail.setRentalAccount(cartItem.getAccountRental());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setUnitPrice(cartItem.getAccountRental().getAccountRentalPackage().getDiscountedPrice()); // Example price, should be retrieved from the rental account or pricing service
            return orderDetail;
        }).collect(Collectors.toList());

        order.setOrderDetails(orderDetails);
        order.setTotalAmount(orderDetails.stream()
                .mapToDouble(od -> od.getUnitPrice() * od.getQuantity())
                .sum());

        orderRepository.save(order);
        orderDetailRepository.saveAll(orderDetails);

        // Clear the cart after checkout
        cartItemRepository.deleteAll(cart.getCartItems());
    }
}
