import React ,{useState,useEffect}from 'react';
import moment from 'moment';
import {Card, DatePicker,Form,Button,Spin} from 'antd';
import {LineChartOutlined,SearchOutlined} from '@ant-design/icons';
import LineChartComponent from './LineChartCom';
import 'antd/dist/antd.css';


const {Meta} = Card


const  FormChart = () => {
    
    const [forms,setForms] = useState([]);
    const [loading,setLoading] = useState(false);
    const [date,setDate] = useState(new Date().getFullYear());

    const onFinish = (value) => {
    
      const date = moment(value.date).format('YYYY');
      setDate(date)
       
    }
     
    useEffect(() => {
        setLoading(true)
       fetch(`/forms/total?date=${date}&keyword=year`)
       .then(res => res.json())
       .then(result => {
        setLoading(false)
        setForms(result.data)
       
       })
        
    },[date])

 
    return (
        <Card 
         className="chartStyle"
           
        >
              <Meta
            avatar={
                <LineChartOutlined />
            }
            title={`Forms created per month in ${date}`}
        
          />
              <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date" >
                          <DatePicker picker="year"/>  
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" icon={<SearchOutlined  />} />
                    </Form.Item>
                </Form>
              <LineChartComponent data={forms} loading={loading} />
        </Card>
    );
}

export default FormChart;