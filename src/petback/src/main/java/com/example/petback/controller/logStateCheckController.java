package com.example.petback.controller;

import com.example.petback.entity.User;
import com.example.petback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/log_state_check")
public class logStateCheckController {

    @Autowired
    private UserService userService;
    @PostMapping
    public int log_state(@RequestBody User user) {
        return userService.log_state_check(user);
    }
}