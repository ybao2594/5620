import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Home from '../pages/Home/homePage';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import { AuthProvider } from '../AuthContext';
import axios from 'axios';


//自定义路由守卫
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/SignIn" />
        )
      }
    />
);

class index extends Component {

    //这边要默认true，如果是false那么后端传来true也会刷走
    //这边true后端传false也进不了主页
    constructor(props) {
        super(props);
        this.state = {
          isAuthenticated: true,
        };
      }
      
      async componentDidMount() {
        // 使用 Axios 来获取后端数据
        try {
          const response = await axios.get('http://demo7864709.mockable.io/auth'); // 替换为实际的后端接口地址
          const { reason } = response.data;
          console.log('路由的:', reason);
    
          if (reason === 'true') {
            // 如果后端返回 'true'，表示用户已认证
            this.setState({ isAuthenticated: true });
          } else {
            // 否则用户未认证
            this.setState({ isAuthenticated: false });
          }
        } catch (error) {
          console.error('Error fetching data from the backend:', error);
        }
      }


    render() {

        return (
            <Router>
              <AuthProvider>
                <Switch>
                    <Route path="/SignUp" component={SignUp}></Route>
                    <Route path="/SignIn" component={SignIn}></Route>

                    <PrivateRoute
                        path="/home"
                        component={Home}
                        isAuthenticated={this.state.isAuthenticated}
                    ></PrivateRoute>

                    <Redirect from="/" to="/SignIn"></Redirect>
                </Switch>
                </AuthProvider>
            </Router>
        );
    }
}

export default index;