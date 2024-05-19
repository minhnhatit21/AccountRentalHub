package com.AccountRentalHub.controllers;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;
import java.util.stream.Collectors;

import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.models.ERole;
import com.AccountRentalHub.models.Role;
import com.AccountRentalHub.models.User;
import com.AccountRentalHub.payload.request.ForgotPasswordRequest;
import com.AccountRentalHub.payload.request.LoginRequest;
import com.AccountRentalHub.payload.request.ResetPasswordRequest;
import com.AccountRentalHub.payload.request.SignupRequest;
import com.AccountRentalHub.payload.response.JwtResponse;
import com.AccountRentalHub.payload.response.MessageResponse;
import com.AccountRentalHub.repository.RoleRepository;
import com.AccountRentalHub.repository.UserRepository;
import com.AccountRentalHub.security.jwt.JwtUtils;
import com.AccountRentalHub.security.services.EmailService;
import com.AccountRentalHub.security.services.ResetTokenService;
import com.AccountRentalHub.security.services.ResetTokenServiceImpl;
import com.AccountRentalHub.security.services.UserDetailsImpl;

import com.AccountRentalHub.services.CustomerService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    private ResetTokenServiceImpl resetTokenService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Passwords do not match!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        // Save user entity first to generate the ID
        user = userRepository.save(user);

        // Create new Customer and associate it with the saved User
        Customer newCustomer = new Customer();
        newCustomer.setFullname(signUpRequest.getFullName());
        newCustomer.setUser(user);

        // Save the Customer entity
        customerService.createCustomer(newCustomer);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        String token = resetPasswordRequest.getToken();
        String newPassword = resetPasswordRequest.getNewPassword();
        String confirmPassword = resetPasswordRequest.getConfirmPassword(); // Thêm mật khẩu xác nhận

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Passwords do not match!"));
        }

        Optional<Long> userId = resetTokenService.getUserIdFromResetToken(token);
        if (userId.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid reset token!"));
        }

        User user = userRepository.findById(userId.get())
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        resetTokenService.deleteResetToken(token);

        return ResponseEntity.ok(new MessageResponse("Password reset successfully!"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {


        if(forgotPasswordRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Not Valid Email!"));
        }

        String email = forgotPasswordRequest.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: Email not found!"));

        String username = user.getUsername();

        String resetToken = UUID.randomUUID().toString();
        resetTokenService.saveResetToken(user.getId(), resetToken);

        String resetUrl = "http://localhost:3006/reset-password?token=" + resetToken;
        try {
            emailService.sendResetPasswordEmail(email, resetUrl, username);
        } catch (MessagingException | IOException | GeneralSecurityException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: Unable to send reset password email"));
        }

        return ResponseEntity.ok(new MessageResponse("Password reset instructions have been sent to your email."));
    }
}
