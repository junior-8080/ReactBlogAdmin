import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';


function BarChartComponent({data}) {

    return (
        <BarChart width={900}
            height={350}
            data={data}
            margin={
                {
                    top: 10,
                    bottom: 10
                }
        }>
            <CartesianGrid strokeDasharray="2 2"/>
            <XAxis dataKey="country" tick={{ fill: '#000' }}  interval={0} angle={40}/>
            <YAxis tick={{ fill: '#000' }}/>
            <Tooltip labelStyle={{color:"#000"}}/>
            {/* <Legend/> */}
            <Bar dataKey="value" fill="#348AA7" label={{stroke:"#000"}}/>
            {/* <Bar dataKey="signups" fill="#a6bfb7"/> */}
        </BarChart>
    );
}

export default BarChartComponent;
