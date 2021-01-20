import React from 'react';
import {Menu,Dropdown,Button} from 'antd';
import {FilterOutlined} from '@ant-design/icons'



const Filter = ({getFilter}) => {
    const menu = (
        <Menu>
            <Menu.Item>
              <div  onClick={() => getFilter('all')}>All</div>
            </Menu.Item>
            <Menu.Item>
               <div  onClick={() => getFilter('almostexpired')}>Almost Expired</div>
            </Menu.Item>
            <Menu.Item>
                <div  onClick={() => getFilter('expired')}>Expired</div>
            </Menu.Item>
        </Menu>
     )

    return (
        <Dropdown overlay={menu}>
        <Button  size="md" onClick={e => e.preventDefault()}>
          Filter <FilterOutlined />
        </Button>
      </Dropdown>
    );
}

export default Filter;
