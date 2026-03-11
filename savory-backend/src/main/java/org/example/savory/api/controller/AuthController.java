package org.example.savory.api.controller;

import lombok.AllArgsConstructor;
import org.example.savory.api.repository.UserRepository;
import org.example.savory.api.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String registerForm() {
        return "register";
    }

    // CREATE
    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           Model model) {

        // Check if user already exists
        if (userRepository.findByUsername(username).isPresent()) {
            model.addAttribute("errorMessage", "User with this name already exists.");
            return "register";
        }

        userService.registerUser(username, password);
        return "redirect:/login";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }
}
