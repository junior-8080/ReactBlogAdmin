import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';
import {Empty}  from  'antd';
import {hex} from '../utils';


const LineChartCom = ({data}) => {
  
  // console.log(data)

    let lines = ""

   if(data.length > 0 && (data[0].Standard || data[0].Enterprise)){
    const key = ['Standard','Enterprise']
     lines  =  key.map((item,index) => {
    
        return item !== 'name' && <Line type="monotone" dataKey={item} stroke={hex[index]} activeDot={{r: 6}} dot={{ stroke: hex[0], strokeWidth: 2 }}    label={false} />  //eslint-disable-line
    }) 
   }else {
     lines = <Line type="monotone" dataKey="value" stroke={hex[0]}  activeDot={{r: 6}} dot={{ stroke: hex[0], strokeWidth: 2 }}    label={false} /> 
   }
   
   if(data.length === 0){
     return <div style={{height:300}}><Empty /></div>
   }

   



    return (
        <LineChart
        width={900}
        height={300}
        data={data}
        margin={
            {
                top: 5,
                right: 10,
                left: 0,
                bottom: 5
            }
        }
      >
        <CartesianGrid strokeDasharray="2 2"  />
        <XAxis dataKey="name" tick={{ fill: '#000' }}  interval={0} angle={40}/>
        <YAxis tick={{ fill: '#000'}}   />
          {
            lines
          }
        <Tooltip   cursor={false} labelStyle={{color:"#000"}}   />
        <Legend />
      </LineChart>
    );
}

export default LineChartCom;

