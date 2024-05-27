package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.*;
import com.AccountRentalHub.models.Enum.EAccountRental;
import com.AccountRentalHub.models.Enum.EOrderStatus;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.payload.response.CartItemResponse;
import com.AccountRentalHub.repository.*;
import com.AccountRentalHub.services.CartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
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

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public void addItemToCart(Long userId, Long accountPackageId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Use Optional and create a new cart if not present
        Cart cart = cartRepository.findByUser(user);
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }


        Optional<AccountRental> accountRental = accountRentalRepository
                .findFirstByPackageIdAndStatusAndAmountGreaterThan(accountPackageId, EAccountRental.ACTIVE.toString(), 0,0)
                .stream()
                .findFirst();

        accountRental.orElseThrow(() -> new RuntimeException("Active account rental not found or out of stock"));


        // Create and save the cart item
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setAccountRental(accountRental.get());
        cartItem.setQuantity(quantity);

        cartItemRepository.save(cartItem);
    }

    @Override
    public List<CartItemResponse> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId)
                .map(cart -> cart.getCartItems().stream()
                        .map(cartItem -> new CartItemResponse(
                                cartItem.getId(),
                                cartItem.getAccountRental().getAccountRentalPackage(),
                                cartItem.getQuantity()))
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new RuntimeException("Cart not found for user id: " + userId));
    }


    @Transactional
    @Override
    public Order createOrderFromCart(Long userId) {
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
        order.setStatus(EOrderStatus.PENDING.toString());

        // Generate unique order code
        String orderCode = generateSequentialOrderCode();
        order.setOrderCode(orderCode);


        List<OrderDetail> orderDetails = cart.getCartItems().stream().map(cartItem -> {
            OrderDetail orderDetail = new OrderDetail();
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
        cart.getCartItems().forEach(cartItem -> cartItemRepository.delete(cartItem));
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return order;
    }

    @Override
    @Transactional
    public void removeCartItems(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    private String generateSequentialOrderCode() {
        // Insert into the order_code_seq table to get the next sequence value
        jdbcTemplate.update("INSERT INTO order_code_seq (id) VALUES (NULL)", new Object[]{});

        // Retrieve the last inserted ID
        Long seqId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);

        // Format the order code with leading zeros to a width of 5 digits
        return String.format("ORD%05d", seqId);
    }
}
