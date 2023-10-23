package com.example.petback.mapper;

import com.example.petback.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
@Mapper
public interface UserMapper {
    @Insert("INSERT INTO user(userName,password,pet,email,userType) VALUES (#{userName},#{password},#{pet},#{email},#{userType})")
    int sign_up(User user);
    @Select("Select * from user WHERE userId = #{userId}")
    List<User> select(User user);
    @Select("SELECT COUNT(*) from user where userName =#{userName}")
    int check_userName_repeat(User user);
    @Select("SELECT COUNT(*) from user where email =#{email}")
    int check_email_repeat(User user);
    @Select("SELECT * FROM user where userName=#{userName} AND password=#{password}")
    List<User> sign_in_by_username(User user);
    @Select("SELECT COUNT(*) from user where email =#{userName}")
    int sign_in_check_email(User user);
    @Select("SELECT * FROM user where email=#{userName} AND password=#{password}")
    List<User> sign_in_by_email(User user);
    @Select("SELECT *FROM user where userName=#{userName}")
    List<User> get_userinfo_by_username(User user);
    @Select("SELECT userState FROM user WHERE userId = #{userId}")
    int log_state_check(User user);
    @Update("UPDATE user SET userState = #{userState}  WHERE userId = #{userId}")
    int log_state_update(User user);

}
