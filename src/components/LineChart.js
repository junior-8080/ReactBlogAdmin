import React ,{useState,useEffect}from 'react';
import moment from 'moment';
import {Card, DatePicker,Form,Button} from 'antd';
import {BarChartOutlined,SearchOutlined} from '@ant-design/icons';
import LineChartComponent from './LineChartCom';
import 'antd/dist/antd.css';
import GraphView from './GraphView.js';
import FilterDropdown from './FilterDropdown';

const {RangePicker} = DatePicker;


const  LineChart = ({title,path,showView}) => {
  
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [date,setDate] = useState( new Date().getFullYear());
    const [view,setView] = useState('month');
    // const [disable,setDisable] = useState(false);
    const [search,setSearch] = useState(undefined);

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
        fetch(`/${path}?dates=${date}&keyword=${view}` + (search ? `&search=${search}`:''))
       .then(res => res.json())
       .then(result => {
        setData(result.data)
        setLoading(false)
       })
        
    },[date,view,search])   //eslint-disable-line

    const handleChange = (value) => {
      setView(value)
 }
    const getValue = (value) => {
      setSearch(value)
    }

    return (
        <Card className="chartStyle">
          <div className="date-picker-container">
              <div><BarChartOutlined /><span className="graphs-title">&nbsp;{title}&nbsp;{date}</span></div>
             <GraphView  handleChange={handleChange} view={view} /> 
              {showView ? <FilterDropdown getValue={getValue}/> : null}
              <Form onFinish={onFinish} style={{display:"flex"}} className="date-pick">
                    <Form.Item name="date" >
                      <RangePicker picker="year" getPopupContainer={trigger => trigger.parentElement} size="small" style={{marginTop:0}} /> 
                    </Form.Item>
                    <Form.Item>
                         <Button htmlType="submit" size="small" icon={<SearchOutlined  />} />
                    </Form.Item>
            </Form>
          </div>             
            <div style={{display:"block"}}>
                <LineChartComponent data={data}loading={loading} view={view}/>
            </div>
           
        </Card>
    );
}

export default LineChart;