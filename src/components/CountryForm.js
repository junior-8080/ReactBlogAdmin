import React,{useEffect, useState} from 'react';
import {Card,DatePicker, Button,Form}
 from "antd";
import moment from 'moment';
import {BarChartOutlined,SearchOutlined} from '@ant-design/icons';
import BarChartComponent from './BarChartComponent';

 const {Meta } = Card;

const CountryForm = () => {
    
  const [data, setData] = useState(null);
  const [date,setDate] = useState(new Date().getFullYear());
  
    const onFinish = (value) => {
        
        const date = moment(value.date).format('YYYY');
        setDate(date)
  
         
      }

      useEffect(()=> {
       
        fetch(`/forms/total?date=${date}&keyword=country`)
        .then(res => res.json())
        .then(result => {
            result.data.forEach(obj => {
                obj.value = parseInt(obj.value)
            })
            setDate(date)
            setData(result.data)
        })
      },[date])

    return (
        <Card className="chartStyle" style={{marginBottom:50}}>
            <Meta avatar={<BarChartOutlined/>}
                title={`Forms created in countries in ${date}`} />
                <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date" >
                          <DatePicker picker="year"/>  
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" icon={<SearchOutlined  />} />
                    </Form.Item>
                </Form>
            <BarChartComponent data={data} /> 
          
        </Card>
    );
}

export default CountryForm;
