import React ,{useState,useEffect}from 'react';
import moment from 'moment';
import {Card, DatePicker,Form,Button} from 'antd';
import {BarChartOutlined,SearchOutlined} from '@ant-design/icons';
import LineChartComponent from './LineChartCom';
import 'antd/dist/antd.css';
import GraphView from './GraphView.js';
import FilterDropdown from './FilterDropdown';

const {RangePicker} = DatePicker;


const  LineChartAcc = ({title,path}) => {
  
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [date,setDate] = useState( new Date().getFullYear());
    const [view,setView] = useState('month');
    const [search,setSearch] = useState('')

    const onFinish = (values) => {
     let dates ='';
     let startDate = moment(values.date[0]).format('YYYY');
     let endDate = moment(values.date[1]).format('YYYY');
     for (let index= startDate; index <= endDate; index++) {
       if(date !== index+','){
         dates +=  `${index},`;
        }
        
   }
   dates = dates.slice(0, -1)
    setDate(dates);
  }
     
    useEffect(() => {
        setLoading(true)
       fetch(`/${path}?dates=${date}&keyword=${view}`)
       .then(res => res.json())
       .then(result => {
        setData(result.data)
        setLoading(false)
       })
        
    },[date,view])   //eslint-disable-line

    const getValue = (value) => {
      setSearch(value)
    }

    return (
        <Card className="chartStyle" >
          <div className="date-picker-container">
              <p><BarChartOutlined /><span>&nbsp;{title}&nbsp;{date}</span></p>
              {/* <GraphView  handleChange={handleChange} view={view} disable={disable}/> */}
              < FilterDropdown getValue={getValue} />
              {/* <FilterDropdown getValue={getValue} /> */}
              <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date">
                          <RangePicker picker="year"/>  
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" icon={<SearchOutlined  />} />
                    </Form.Item>
            </Form>
          </div>             
            <div style={{display:"block"}}>
                <LineChartComponent data={data}loading={loading} view={view}/>
            </div>
           
        </Card>
    );
}

export default LineChartAcc;