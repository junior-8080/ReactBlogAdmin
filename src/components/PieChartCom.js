import React from 'react';

import { PieChart, Pie,Legend,Cell, Tooltip} from 'recharts';



// const renderActiveShape = (props) => {
//     const RADIAN = Math.PI / 180;
//     const {
//       cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
//       fill, payload, percent, value,
//     } = props;
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
// const textAnchor = cos >= 0 ? 'start' : 'end';
  
  //   return (
  //     <g>
  //       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         innerRadius={innerRadius}
  //         outerRadius={outerRadius}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         fill={fill}
  //       />
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         innerRadius={outerRadius + 6}
  //         outerRadius={outerRadius + 10}
  //         fill={fill}
  //       />
  //       <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
  //       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
  //       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`Total ${value}`}</text>
  //       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#000">
  //         {`(${(percent * 100).toFixed(2)}%)`}
  //       </text>
  //     </g>
  //   );
  // };


  const COLORS = ['#0000ff', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180; 
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // console.log(percent)
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  
   return (
     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="end" >
       {`${(percent * 100).toFixed(2)}%`}
     </text>
   );
 };

const PieChartCom = ({data}) => {
    //  console.log(data[0])
    
    return (
      
        <PieChart width={400} height={400}>
          <Pie
          data={data} 
          cx={200} 
          cy={60} 
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={60} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={30}/>
      </PieChart>
    );
}


export default PieChartCom

