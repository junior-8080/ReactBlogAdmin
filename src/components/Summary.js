import React from 'react';
import {Card, Spin, Table} from 'antd';
import 'antd/dist/antd.css';
import {numberWithCommas} from '../utils';
import {FolderOutlined} from "@ant-design/icons";
// const axios = require('axios');
const {Meta} = Card;

const TotalRecord = ({summary}) => {

    const dataSource = [
        {
          label:"Forms",
          value:summary ? numberWithCommas(summary.forms_count) : 0,
          key:'total_forms',
        },
        {
         label:"Organizations",
         value: summary ? numberWithCommas(summary.total_organizations) : 0,
         key:'total_organization'
        },
        {
        label:"Responses",
        value:summary ? numberWithCommas(summary.sum_of_response) : 0,
        key:'sum_response'
        },
        {
            label:"Agents",
            value: summary ?numberWithCommas(summary.sum_of_agents) : 0,
            key:'total_agents'
        }
      

      ];

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
                {width:"100%",height:400,backgroundColor:"#7cb7e6"}}
           
        >
           <Meta
            avatar={
              <FolderOutlined />
            }
            title="Summary"
        
          />
         {summary ? <Table   dataSource={dataSource} pagination={false} columns={columns}/> :  <Spin size="sm" color="white"/> }
        </Card>
    );
}

export default TotalRecord;
