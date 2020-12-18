import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';
import {Spin} from 'antd';


const LineChartCom = ({data,loading}) => {

    let lines = ""

   if(data.length > 0){

    const key = Object.keys(data[0]);
     lines  =  key.map((item,index) => {
         if(item !== 'name')return  <Line type="monotone" dataKey={item} stroke="#348AA7" activeDot={{r: 6}}  isAnimationActive={false}  label={{stroke:"#000"}} />  
    })
   }
   



    return (
    // <div style={{width:"100%",height:400}}>
        <LineChart
        width={800}
        height={350}
        data={data}
        margin={
            {
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }
        }
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" tick={{ fill: '#000' }}  angle={40}  />
        <YAxis tick={{ fill: '#000' }} />
        {/* <Line type="monotone" dataKey="value" stroke="#348AA7" activeDot={{r: 6}}  isAnimationActive={false}  label={{stroke:"#000"}} />   */}
        {
            lines
        }
        <Tooltip   cursor={false} labelStyle={{color:"#000"}}   />
        <Legend />
      </LineChart>
    );
}

export default LineChartCom;

