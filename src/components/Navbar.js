import React, { useState,useEffect } from 'react';
import {
  Menu
} from 'antd';
import {Link} from 'react-router-dom';
import {UserOutlined,FormOutlined,UserAddOutlined,HomeOutlined,PayCircleOutlined
  ,ExportOutlined} from '@ant-design/icons';
  
  
const Navs = ({active}) => {

    const onClick = () => {
     
      localStorage.removeItem('userProfile');
      localStorage.removeItem('pevPath')
      window.location = '/'
    }

    const [role,setRole] = useState('');
    const [username,setUsername] = useState('');

    useEffect(() => {
       const profile = JSON.parse(localStorage.getItem('userProfile'));
      setRole(profile.role.trim());
      setUsername(profile.username);
    }, []);
    return (
        <Menu mode="inline"   defaultSelectedKeys={['/overview']} selectedKeys={[active]} theme="dark">
           <Menu.Item key="/profile"><UserOutlined />{username? username : 'Profile'}</Menu.Item>
          <Menu.Item key="/overview"><Link to="/overview"><HomeOutlined />Overview</Link></Menu.Item>
          <Menu.Item key="/forms"> <Link to="/forms"><FormOutlined />Insyt Forms</Link> </Menu.Item>
          <Menu.Item key="/payment"> <Link to="/payment"><PayCircleOutlined />Payment</Link> </Menu.Item>
          {role === 'A' ? <Menu.Item key='/new_user'> <Link to="/new_user"><UserAddOutlined />New User</Link></Menu.Item> : ''}
          <Menu.Item key='5' onClick={()=> onClick()}> <ExportOutlined />Logout</Menu.Item>
        </Menu>
    );
}

export default Navs;
