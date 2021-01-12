import React,{useEffect, useState} from 'react';
import {Card,DatePicker, Button,Form}
 from "antd";
import moment from 'moment';
import {BarChartOutlined,SearchOutlined} from '@ant-design/icons';
import BarChartComponent from './BarChartComponent';
// import GraphView from './GraphView.js';



const BarChart= ({title,path,bottom}) => {
    
  const [data, setData] = useState([]);
  const [date,setDate] = useState(new Date().getFullYear());
  
    const onFinish = (value) => {
        const date = moment(value.date).format('YYYY');
        setDate(date)
         
      }

      useEffect(()=> {
          
        fetch(`/${path}?date=${date}&keyword=country`)
        .then(res => res.json())
        .then(result => {
            setDate(date)
            setData(result.data)
        })
      },[date,path])
      
    return (
        <Card className="chartStyle" style={{marginBottom:bottom}}>
            <div className='date-picker-container'>
               <p><span><BarChartOutlined />&nbsp;{title}&nbsp;{date}</span></p>
               {/* <GraphView /> */}
                <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date">
                          <DatePicker picker="year" style={{borderColor:'#348AA7'}}/>  
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" icon={<SearchOutlined  />} />
                    </Form.Item>
                </Form>
              </div>
          <div>
              <BarChartComponent data={data} /> 
          </div> 
        </Card>
    );
}

export default BarChart;
