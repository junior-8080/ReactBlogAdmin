import React from 'react';
import {Menu,Dropdown,Button} from 'antd';
// import {FilterOutlined} from '@ant-design/icons'



const Actions = ({handleRefresh,handleReset,handleExport}) => {
    const menu = (
        <Menu>
            <Menu.Item>
              <div  onClick={() => handleRefresh()}>Refresh</div>
            </Menu.Item>
            <Menu.Item>
               <div  onClick={() => handleReset()}>Reset</div>
            </Menu.Item>
            <Menu.Item>
                <div  onClick={() => handleExport()}>Export</div>
            </Menu.Item>
        </Menu>
     )

    return (
        <Dropdown overlay={menu} >
        <Button  size="md" onClick={e => e.preventDefault()}>
          Actions 
        </Button>
      </Dropdown>
    );
}

export default Actions;
