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
                {width:120}
            }
            suffixIcon=""
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
