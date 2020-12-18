import React,{useState} from 'react';

import { PieChart, Pie, Sector } from 'recharts';



const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Total ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#000">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };


const PieChartCom = ({data}) => {
    //  console.log(data[0])
    const data1 = [
        { name: data[0].subscription_type, value:parseInt(data[0].count)},
        { name: data[1].subscription_type, value:parseInt(data[1].count)}
      ];



      const [index, setindex] = useState(0);

      const onPieEnter = (data, index) => {
         setindex(index)
      };
    

    return (
      
        <PieChart width={400} height={400}>
        <Pie
          activeIndex={index}
          activeShape={renderActiveShape}
          data={data1}
          cx={160}
          cy={90}
          innerRadius={30}
          outerRadius={50}
          fill="#fff"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    );
}


export default PieChartCom

