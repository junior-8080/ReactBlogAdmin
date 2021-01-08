import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';
import {Empty}  from 'antd';


function BarChartComponent({data}) {

    if(data.length === 0){
        return <div style={{height:300}}><Empty /></div>
      }

    return (
        <BarChart width={900}
            height={300}
            data={data}
            margin={
                {
                    top: 10,
                    bottom: 10
                }
        }>
            <CartesianGrid strokeDasharray="2 2"/>
            <XAxis dataKey="country" tick={{ fill: '#000' }}  interval={0} angle={40} />
            <YAxis tick={{ fill: '#000' }}/>
            <Tooltip labelStyle={{color:"#000"}}/>
            {/* <Legend/> */}
            <Bar dataKey="value" fill="#348AA7" label={{stroke:"#000",position:"top"}}/>
            {/* <Bar dataKey="signups" fill="#a6bfb7"/> */}
        </BarChart>
    );
}

export default BarChartComponent;
