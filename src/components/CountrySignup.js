import React,{useEffect, useState} from 'react';
import {Card,Spin,DatePicker, Button,Form}
 from "antd";
import moment from 'moment';
import {BarChartOutlined,SearchOutlined} from '@ant-design/icons';
import BarChartComponent from './BarChartComponent';

 const {Meta } = Card;

const CountrySignup = () => {
    
  const [data, setData] = useState(null);
  const [date,setDate] = useState(new Date().getFullYear());
  
    const onFinish = (value) => {
        
        const date = moment(value.date).format('YYYY');
        setDate(date)
  
         
      }

      useEffect(()=> {
          
        fetch(`/signups/?date=${date}&keyword=country`)
        .then(res => res.json())
        .then(result => {
            setDate(date)
            setData(result.data)
        })
      },[date])

    return (
        <Card className="chartStyle" >
            <Meta avatar={<BarChartOutlined/>}
                title={`Signups  in countries in ${date}`} />
                <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date">
                          <DatePicker picker="year" style={{borderColor:'#348AA7'}}/>  
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" icon={<SearchOutlined  />} />
                    </Form.Item>
                </Form>
            { data ? <BarChartComponent data={data} /> : <Spin  size="sm" />}
          
        </Card>
    );
}

export default CountrySignup;
