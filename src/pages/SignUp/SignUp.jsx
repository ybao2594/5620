import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CssBaseline, FormLabel, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';
import ShowPasswordButton from './ShowPasswordButton';
import { FormInputWrapper } from '../../components/FormInputWrapper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { message } from 'antd';


const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const history = useHistory()

  const instance = axios.create({
    baseURL: 'http://10.19.151.60:9090', // 后端的地址
});

  const formik = useFormik({
    initialValues: {
      userID:'',
      userName: '',
      email: '',
      userType: '',
      password: '',
    },
    //给后端的
    //onSubmit: values => { console.log(values) },
    onSubmit: async values => {
      console.log('values: ', values)
      try {
        const response = await instance.post('/sign_up', values);
        if (response.data.reason === 'success') {
          message.success('Registered successfully')
          history.push('/SignIn')
        } 
        else {
          message.error(response.data.reason)
          console.log(response.data.reason)
        }
      } catch (error) {
        console.error('请求失败', error)
      }
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().trim().required('Name is required'),
      email: Yup.string().trim().required('Email is required').email('Email is invalid'),
      userType: Yup.string().trim().required('User type is required'),
      password: Yup.string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must have at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .trim()
        .min(6, 'Password must have at least 6 characters')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
  })


  const commonProps = key => {
    const { errors, values, touched, handleChange, handleBlur } = formik
    return {
      fullWidth: true,
      size: 'small',
      name: key,
      onBlur: handleBlur,
      onChange: handleChange,
      value: values[key],
      error: touched[key] && errors[key],
      helperText: touched[key] && errors[key],
    }
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff', // 淡蓝色背景
  };

  return (
    <div style={containerStyle} className="row">
      {/* <div className='col-md-1'></div>
      <div className='col-md-5'> */}
      <Box 
        sx={{
          width: 500,
          backgroundColor: 'white', // 白色填充
          border: '1px solid #ccc', // 灰色边框
          borderRadius: '20px',
          display: 'flex',
            }}>
        <FormInputWrapper
          component="form"
          onSubmit={formik.handleSubmit}
          style={{ width: '95%' }}>
          <Typography variant="h2" fontWeight="bold" marginTop={3} align='center'>
            Sign Up
          </Typography>
          <Typography variant="h4" marginTop={2} align='center'>
            Energy Insights for a Better Today
          </Typography>
          <br />
          <FormLabel style={{ fontSize: '14px' }}>Name*</FormLabel>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}>
            <TextField placeholder="Your Name" {...commonProps('userName')} />
          </Stack>
          <br />

          <FormLabel style={{ fontSize: '14px' }}>Email*</FormLabel>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}>
            <TextField placeholder="Email" {...commonProps('email')} />
          </Stack>
          <br />

          <FormLabel style={{ fontSize: '14px' }}>User Type</FormLabel>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}>
            <Select name="userType" value={'Customer'} {...commonProps('userType')}>
              <MenuItem value={'Customer'}>Customer</MenuItem >
              <MenuItem value={'Energy company'}>Energy company</MenuItem >
            </Select>
          </Stack>
          <br />

          <FormLabel style={{ fontSize: '14px' }}>Password*</FormLabel>
          <Stack>
            <TextField
              sx={{ width: '100%' }}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              InputProps={{
                endAdornment: (
                  <ShowPasswordButton
                    onClick={() => {
                      setPasswordVisible(!passwordVisible)
                    }}
                    visibility={passwordVisible}
                  />
                ),
              }}
              {...commonProps('password')}
            />
          </Stack>
          <br />

          <FormLabel style={{ fontSize: '14px' }}>Confirm Password*</FormLabel>
          <Stack>
            <TextField
              sx={{ width: '100%' }}
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              {...commonProps('confirmPassword')}
              InputProps={{
                endAdornment: (
                  <ShowPasswordButton
                    onClick={() => {
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }}
                    visibility={confirmPasswordVisible}
                  />
                ),
              }}
            />
          </Stack>

          <Stack direction="row" justifyContent="center" marginTop={4}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              style={{
                backgroundColor: '#7593FF',
                color: '#FFF',
                width: 150,
                height: 50,
                borderRadius: 30,
              }}>
              Sign Up
            </Button>
          </Stack>

          <br />
          <h5>Already have an account?</h5>
          <Link to="/SignIn">
            Sign In
          </Link>
        </FormInputWrapper>
      </Box>  
      {/* </div> */}
    </div>
  );
}

export default SignUp;