import React from 'react';
import {Radio} from 'antd';




const GraphView = ({handleChange,view}) => {
    
    return (
       <div className="graph-view">
         <span>View:&nbsp;</span>
         <Radio.Group size="small"  value={view} onChange={(event) => {handleChange(event.target.value)}}>
          <Radio.Button value="year" >Yearly</Radio.Button>
          <Radio.Button value="month">Monthly</Radio.Button>
          <Radio.Button value="quarter" >Quaterly</Radio.Button>
          <Radio.Button value="week">Weekly</Radio.Button>
         </Radio.Group>
       </div>
    );
}

export default GraphView;
