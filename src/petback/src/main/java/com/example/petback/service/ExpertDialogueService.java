package com.example.petback.service;

import com.example.petback.entity.ExpertDialogue;
import com.example.petback.mapper.ExpertDialogueMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ExpertDialogueService {
    @Autowired ExpertDialogueMapper expertDialogueMapper;
    public Map<String,Object> receivedialogue(ExpertDialogue expertDialogue)
    {

        if (Objects.equals(expertDialogue.getExpertId(), ""))
            return response_reason("Expert cannot be empty");
        if (Objects.equals(expertDialogue.getUserId(), ""))
            return response_reason("User cannot be empty");
        if (Objects.equals(expertDialogue.getInfo(), ""))
            return response_reason("Dialogue cannot be empty");
        if (expertDialogue.getUserId()==null)
            return response_reason("No transfer user");
        if (expertDialogue.getExpertId()==null)
            return response_reason("No transfer Expert");
        if (expertDialogue.getInfo()==null)
            return response_reason("No transfer Info");
        int result =expertDialogueMapper.receive(expertDialogue);
        if(result==1)
            return response_reason("success");
        else
            return response_reason("error");
    }
    public Map<Integer, ExpertDialogue> senddialogue(ExpertDialogue expertDialogue)
    {
        List<ExpertDialogue> expertdialoguelist=expertDialogueMapper.send(expertDialogue);
        Map<Integer, ExpertDialogue> ExpertDialogueMap = new HashMap<>();
        for (ExpertDialogue ed : expertdialoguelist) {
            ExpertDialogueMap.put(ed.getUserId(), ed);
        }
        return ExpertDialogueMap;
    }

    private Map<String,Object>response_reason(String reason)
    {
        Map<String, Object> response = new HashMap<>();
        response.put("reason", reason);
        return response;
    }
}


