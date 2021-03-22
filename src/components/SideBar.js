import React from 'react'
import{ Link} from 'react-router-dom'
import { Menu, Button } from 'antd';



const SideBar = ({handleVisibility}) => {

    const logout = () => {
        
        localStorage.removeItem('profile');
        window.location = '/'
    }

   
    return (
        <div className="sideBar" >
            <Menu
              mode="inline"
              theme="dark"
              style={{height:'100vh',backgroundColor:'burlywood',color:'#000'}}
              defaultSelectedKeys={['1']}>
                <Menu.Item className="newPost" key="1">
                    <Link to='/articles'>Articles</Link>
                </Menu.Item>
                <Menu.Item  onClick = {handleVisibility} key="2">
                     Create Article
                </Menu.Item>
                <Menu.Item className="newPost" onClick = {logout} key="3">
                    logout
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default SideBar;
