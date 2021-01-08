import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';
import {Empty}  from  'antd';
import {hex} from '../utils';


const LineChartCom = ({data,loading}) => {
  // console.log(data)

    let lines = ""

   if(data.length > 0){
    

    const key = Object.keys(data[4] || data[0] || data[1] || data[2]);
     lines  =  key.map((item,index) => {
        console.log(item)
        return item !== 'name' && <Line type="monotone" dataKey={item} stroke={hex[index]} activeDot={{r: 6}}    label={{stroke:"#000"}} />  //eslint-disable-line
    }) //eslint-dsiable-line
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
        <XAxis dataKey="name" tick={{ fill: '#000' }}  angle={30}  />
        <YAxis tick={{ fill: '#000' }} />
        {
            lines
        }
        <Tooltip   cursor={false} labelStyle={{color:"#000"}}   />
        <Legend />
      </LineChart>
    );
}

export default LineChartCom;

