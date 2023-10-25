import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    CssBaseline,
    FormLabel,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { Stack } from '@mui/material';
import { InfoRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { FormInputWrapper } from '../../components/FormInputWrapper';
import ShowPasswordButton from '../SignUp/ShowPasswordButton';
import axios from 'axios';
import { message } from 'antd';

const PasswordStrengthTooltip = () => {
    return (
        <Box>
            <ul>
                <li>Minimum of 6 characters</li>
            </ul>
        </Box>
    )
}

const PasswordTooltip = ({ isError }) => {
    return (
        <Tooltip
            title={<PasswordStrengthTooltip />}
            sx={{
                marginBottom: {
                    lg: isError ? '24px' : 0,
                },
            }}>
            <IconButton>
                <InfoRounded fontSize="small" sx={{ color: '#7593FF', fontSize: '1.3rem' }} />
            </IconButton>
        </Tooltip>
    )
}

const SignIn = ({ redirectPath }) => {

        // State to Manage password visibility
        const [passwordVisible, setPasswordVisible] = useState(false)
        // State for tracking loading request
        const [loading, setLoading] = useState(false)

        const history = useHistory()

        const instance = axios.create({
            baseURL: 'http://demo7864709.mockable.io/', // 后端的地址
        });

        // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'false';
        // console.log('登录页面的isAuthenticated', isAuthenticated)

        const formik = useFormik({
            initialValues: { userName: '', password: '' },
            //onSubmit: values => { console.log(values) },
            onSubmit: async values => {
                try {
                    const response = await instance.post('/sign_in', values);
                    if (response.data.reason === 'success') {
                        // localStorage.setItem('isAuthenticated', 'true');
                        // console.log('登录页面的isAuthenticated', isAuthenticated)
                        localStorage.setItem('userId', response.data.userId);
                        localStorage.setItem('userName', response.data.userName);
                        localStorage.setItem('userType', response.data.userType);
                        history.push('/home')
                        window.location.reload();
                        message.success('login successfully')
                        history.push('/home')
                    } else {
                        message.error('login failure')
                        console.log('login failure')
                    }
                }catch (error) {
                    console.error('request failed', error)
                }
            },

            validationSchema: Yup.object({
                userName: Yup.string().required('User Name or Email can not be empty'),
                password: Yup.string().required('Password can not be empty'),
            }),
        });


        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f8ff', // 淡蓝色背景
          };


        return (
            <div style={containerStyle} className="row">
                <Box
                    sx={{
                        width: 500,
                        backgroundColor: 'white', // 白色填充
                        border: '1px solid #ccc', // 灰色边框
                        borderRadius: '20px',
                        display: 'flex',
                    }}>
                    <FormInputWrapper onSubmit={formik.handleSubmit} component="form" target="none" style={{ width: '95%' }}>
                        <Typography variant="h2" fontWeight="bold" marginTop={3} align='center'>
                            Sign In
                        </Typography>
                        <Typography variant="h4" marginTop={2} align='center'>
                            Welcome to EnergyHub
                        </Typography>
                        <FormInputWrapper marginTop={5}>
                            <FormLabel style={{ fontSize: '15px', display: 'block', width: 200 }}>User Name/Email*</FormLabel>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                size="small"
                                placeholder="Your User Name or Email "
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.userName && formik.errors.userName}
                                helperText={formik.touched.userName && formik.errors.userName}
                            />
                        </FormInputWrapper>

                        <FormInputWrapper marginTop={2}>
                            <div style={{ display: 'block', width: 200 }}>
                                <FormLabel style={{ fontSize: '15px' }}>Password*</FormLabel>
                                <PasswordTooltip />
                            </div>

                            <TextField
                                size="small"
                                type={passwordVisible ? 'text' : 'password'}
                                variant="outlined"
                                placeholder="Your Password"
                                fullWidth
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password}
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
                                autoComplete="new-password"
                            // error={errors.password ? true : false}
                            // helperText={errors.password?.message}
                            />
                        </FormInputWrapper>
                        <Stack direction="row" justifyContent="center" marginTop={4}>
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                    backgroundColor: '#7593FF',
                                    color: '#FFF',
                                    width: 150,
                                    height: 50,
                                    borderRadius: 30,
                                }}
                                disabled={loading}>
                                Sign In
                            </Button>

                        </Stack>
                        <br />
                        <h5>Don't have an account?</h5>
                        <Link to="/SignUp">
                            Sign Up
                        </Link>
                    </FormInputWrapper>
                </Box>
            </div>
        );

}

export default SignIn;