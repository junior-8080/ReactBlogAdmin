import React from 'react';
import {Card, Spin,Table} from 'antd';
import 'antd/dist/antd.css';
import PieChartCom from './PieChartCom'
import {UsergroupDeleteOutlined } from '@ant-design/icons';
const {Meta }= Card;


const AccountTypes = ({paidForms,accTypes}) => {
 

    const dataSource =  accTypes.length > 0 ? [
        {
          label:'Standard',
          value:accTypes[0].count
        },
        {
          label:'Enterprise',
          value:accTypes[1].count
        },
      
      ]: [];

      const columns = [
        {
          title:"Items",
          dataIndex: 'label',
          key: 'label',
        },
        {
          title:"Counts",
          dataIndex: 'value',
          key: 'value'
        }
      ];
    return (
        <Card
            style={
                {width:"100%",height:400,backgroundColor:"#348AA7"}}
             
            
        >
            <Meta
            avatar={
              <UsergroupDeleteOutlined />
            }
            title="Account Types"
        
            
          />
         {accTypes.length > 0 && paidForms.length > 0 ? <>
            <Table 
                dataSource={dataSource}
                  pagination={false}
                 columns={columns}
                 className="acctype"
                 />
             <p className="smaller-label">Forms Paid By Accounts Types</p>
           <PieChartCom  data={paidForms}/> 
           </>
             : <Spin size="sm"color="#fff" /> 
}
        </Card>
    );
}

export default AccountTypes;