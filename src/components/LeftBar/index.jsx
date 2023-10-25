import React, { useState, useEffect, Component } from 'react';
//import "./style.css"
import { Link } from 'react-router-dom';
import { Box, List, Button, CssBaseline, FormLabel, TextField, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import Switch from '@mui/material/Switch';


function LeftBar(params) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
          setSelectedIndex(index);
    };

    useEffect(() => {
      const storedIndex = localStorage.getItem('selectedIndex');
      if (storedIndex !== null) {
        setSelectedIndex(parseInt(storedIndex, 10));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('selectedIndex', selectedIndex);
    }, [selectedIndex]);

    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    //这个是为了开关才storedUserType，不然和下面的userType重了
    const storedUserType  = localStorage.getItem('userType');
    const [userType, setUserType] = useState(storedUserType || 'Customer'); // 设置默认值，如果没有存储的值就使用 'default'
    const [checked, setChecked] = useState(true); // 根据 userType 初始化开关状态
    //创建处理开关状态更改的函数
    const handleChange = () => {
      //根据开关状态更改 userType
      if (checked) {
        setUserType('Energy company');
      } else {
        setUserType('Customer');
      }
      // 更新开关状态
      setChecked(!checked);
    };
    const handleLogout = async () => {
      try {
        // 构建包含 "logout" 字段的 JSON 对象
        const data = { "logout": true, "userId": userId};
        //换成后端接口
        const response = await fetch('/logoutEndpoint', {
          method: 'POST', // 或其他适当的 HTTP 方法
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        //具体看后端传来啥
        if (response.ok) {
          // 在成功响应后执行的操作，例如跳转到登录页面
          window.location.href = '/SignIn';
        } else {
          console.error('Request failed with status:', response.status);
          // 可以在此处处理其他失败情况
        }
      } catch (error) {
        console.error('Error:', error);
        // 处理网络请求错误
      }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        <Switch
          checked={checked}
          onChange={handleChange}
        />
        <Typography fontSize={16}>这个开关连上后端就删 现在user type是{userType}</Typography>
          {userType  === 'Customer' && (<>
            <List 
              component="nav" aria-label="main mailbox folders"
              sx={{
              '&& .Mui-selected, && .Mui-selected:hover': {
                bgcolor: '#87A9FF',
                },
              }}>
              <ListItemButton 
                component={Link}
                to="/home/Home" 
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
              </ListItemButton>

              <ListItemButton
                  component={Link}
                  to="/home/chat" 
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}>
                  <ListItemIcon>
                    <SmartToyOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="AI Q&A" />
              </ListItemButton>

              <ListItemButton 
                component={Link}
                to="/home/social" 
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}>
                  <ListItemIcon>
                    <GroupsOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Social Incentives" />
              </ListItemButton>

              <ListItemButton 
                component={Link}
                to="/home/calculator" 
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}>
                  <ListItemIcon>
                    <StackedBarChartOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Energy Calculator" />
              </ListItemButton>

              <ListItemButton 
                component={Link}
                to="/home/education"
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)} >
                  <ListItemIcon>
                    <MenuBookOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Energy Education" />
              </ListItemButton>
            </List>
          </>)}
          {userType  === 'Energy company' && (<>
            <List 
              component="nav" aria-label="main mailbox folders"
              sx={{
              '&& .Mui-selected, && .Mui-selected:hover': {
                bgcolor: '#87A9FF',
                },
              }}>
              <ListItemButton 
                component={Link}
                to="/home/uereFeedback" 
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}>
                  <ListItemIcon>
                    <ChecklistOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="User Feedback" />
              </ListItemButton>

              <ListItemButton
                  component={Link}
                  to="/home/AIDemandForecast" 
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}>
                  <ListItemIcon>
                    <ForumOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="AI Demand Forecast" />
              </ListItemButton>

              <ListItemButton 
                component={Link}
                to="/home/consumptionAnalysis" 
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}>
                  <ListItemIcon>
                    <QueryStatsOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Consumption Analysis" />
              </ListItemButton>
            </List>
          </>)}
            <br />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center', // 居中水平
          alignItems: 'center', // 居中垂直
        }}>
          <Typography
            fontSize={16}
            component={Link}
            to="/SignIn"
            onClick={handleLogout}
          >
            log out</Typography>
        </Box>
            <br />
          <Divider />
        </Box>
        );
    }
export default LeftBar;