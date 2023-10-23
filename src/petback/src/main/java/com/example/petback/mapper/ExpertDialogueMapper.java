package com.example.petback.mapper;

import com.example.petback.entity.ExpertDialogue;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ExpertDialogueMapper {
    @Insert("INSERT INTO expertDialogue(userId,expertId,info) VALUES (#{userId},#{expertId},#{info})")
    int receive(ExpertDialogue expertDialogue);
    @Select("SELECT * FROM expertDialogue where expertId=#{expertId}")
    List<ExpertDialogue> send(ExpertDialogue expertDialogue);
}
