import React ,{useState,useEffect}from 'react';
import moment from 'moment';
import {Card, DatePicker,Form,Button,Spin} from 'antd';
import {BarChartOutlined,SearchOutlined} from '@ant-design/icons';
import LineChartComponent from './LineChartCom';
import 'antd/dist/antd.css';
// import BarChartCom from './BarChart';

const {Meta} = Card;
const {RangePicker} = DatePicker;


const  SignUpChart = () => {
  
    const [signups,setSignUps] = useState([]);
    const [loading,setLoading] = useState(false);
    const [date,setDate] = useState( new Date().getFullYear());

    const onFinish = (values) => {
     
     const arraydate = values.date;
     let dates ='';
     arraydate.map((item => {
       if(dates !== moment(item).format('YYYY')+','){
        dates +=  `${moment(item).format('YYYY')},`;
       }
     
     }))
    setDate(dates)
    console.log(dates)
    }
     
    useEffect(() => {
        setLoading(true)
       fetch(`/signups?date=${date}&keyword=year`)
       .then(res => res.json())
       .then(result => {
        // console.log(result.data[0].signups)
        console.log(result.data)
        setSignUps(result.data)
        setLoading(false)
       })
        
    },[date])

 
    return (
        <Card className="chartStyle" >
              <Meta
            avatar={
                <BarChartOutlined />
            }
            title={`Signups per month in ${date}`}
        
          />
              <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date" style={{width:100}}>
                          <RangePicker picker="year"/>  
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" icon={<SearchOutlined  />} />
                    </Form.Item>
                </Form>
             <LineChartComponent data={signups}loading={loading} />
        </Card>
    );
}

export default SignUpChart;