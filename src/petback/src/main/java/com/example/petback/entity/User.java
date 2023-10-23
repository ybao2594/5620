package com.example.petback.entity;

import com.fasterxml.jackson.annotation.JsonProperty;


public class User
{
    @JsonProperty("userId")
    private Integer userId;
    private String userName;
    private String password;
    private String pet;
    private String email;
    private String userType;
    private int userState;

    public int getUserState() {
        return userState;
    }

    public void setUserState(int userState) {
        this.userState = userState;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPet() {
        return pet;
    }

    public void setPet(String pet) {
        this.pet = pet;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public boolean success(){
        return true;
    }
}
