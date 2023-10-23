package com.example.petback.controller;

import com.example.petback.entity.ExpertDialogue;
import com.example.petback.service.ExpertDialogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/sendExpertDialogue")
public class sendExpertDialogueController {

    @Autowired
    private ExpertDialogueService expertDialogueService;
    @PostMapping
    public Map<Integer, ExpertDialogue> send(@RequestBody ExpertDialogue expertDialogue) {

        return expertDialogueService.senddialogue(expertDialogue);
    }
}