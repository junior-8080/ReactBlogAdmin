import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';
import {randomColors} from '../utils';


const LineChartCom = ({data,loading}) => {

    let lines = ""

   if(data.length > 0){

    const key = Object.keys(data[0]);
     lines  =  key.map((item,index) => {
        return item !== 'name' && <Line type="monotone" dataKey={item} stroke={randomColors()} activeDot={{r: 6}}    label={{stroke:"#000"}} />  //eslint-disable-line
    }) //eslint-dsiable-line
   }
   
   const handleClick = (value) => {
     console.log(value)
    // value.payload.hide = true
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
        <XAxis dataKey="name" tick={{ fill: '#000' }}  angle={40}  />
        <YAxis tick={{ fill: '#000' }} />
        {
            lines
        }
        <Tooltip   cursor={false} labelStyle={{color:"#000"}}   />
        <Legend onClick={handleClick} />
      </LineChart>
    );
}

export default LineChartCom;

