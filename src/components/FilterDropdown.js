import React from 'react';
import {Select} from 'antd';

const {Option} = Select;

const FilterDropdown = ({getValue}) => {

    const handleChange = (value) => {
      getValue(value)
    }

    return (
        <Select defaultValue="All"
            style={
                {width: 100}
            }
            size="small"
            onChange={handleChange} 
            getPopupContainer={trigger => trigger.parentElement} 
            >
              <Option value=" ">All</Option>
            <Option value="account_type">Account Type</Option>
        </Select>
    )
}


export default FilterDropdown;
