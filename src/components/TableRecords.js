import React,{useEffect} from 'react';
import {Table} from 'antd';
import {expired,defaultDate} from '../utils';


const TableRecords = ({tableData,getPage,loading}) => {
   

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'u_name',
            fixed: 'left',
            width:300,
            key:'name'
        },
        {
            title: 'Organization Name',
            dataIndex: 'organization_name',
            width:300,
            key:'o_name'
        },
        {
            title: 'Signup Date',
            dataIndex: 'signup_date',
            render:(value,row)=>{
                if(row.signup_date){
                    return defaultDate(row.signup_date);
                }
                return 'N/A'
            },
            key:"sigup_date"

        }, 
        {
            title:'Creation Date',
            dataIndex:'form_creation_date',
            render:(value,row) => {
                if(row.form_creation_date){
                    return defaultDate(row.form_creation_date);
                }
                return 'N/A'
            },
            key:'c_date'
        },
        {
            title: 'Signup Country',
            dataIndex: 'signup_country',
            key:'country',
            render:(value,row) => {
                if(row.signup_country){
                  return row.signup_country = row.signup_country === "null" || row.signup_country === ''? 'N/A':row.signup_country;
                //   return row.signup_country = 'NA'
                }
            }

        },{
            title: 'Contact',
            dataIndex: 'contact',
            key:'contact',
            render:(value,row) => {
                if(row.contact){
                  return row.contact = row.contact === "null" || row.contact === ''? 'N/A':row.contact;
                //   return row.signup_country = 'NA'
                }
            }
        }, {
            title: 'Email',
            dataIndex: 'email',
            width:300,
            key:'email',
            render:(value,row) => {
                if(row.contact){
                  return row.email = row.email === "null" || row.contact === ''? 'N/A':row.email;
                //   return row.signup_country = 'NA'
                }
            }
        }, {
            title: 'Form title',
            dataIndex: 'form_title',
            width:300,
            key:'title',
            render:(value,row) => {
                if(row.form_title){
                  return row.form_title = row.form_title === "null" || row.form_title === ''? 'N/A':row.form_title;
                //   return row.signup_country = 'NA'
                }
            }
        },
        {
            title :'Number Of Responses',
            dataIndex:'number_of_responses',
            key:'num_response'
        },
        {
            title:'Number Of Agents',
            dataIndex:'number_of_agents',
            key:'num_agents'
        },
        {
            title:'Account Upgrade',
            dataIndex:"account_upgraded",
            key:'acc_type'
        },
        {
            title:'Subscription Type',
            dataIndex:'subscription_type',
            key:'sub_type'
        },
        {
            title:'Expiry Date',
            dataIndex:'expiry_date',
            render:(value,row)=> {
                if(row.expiry_date){
                  return expired(row.expiry_date);
                }
                return 'N/A'
            },
            key:'expiry_date'
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status'
        },
        {
            title:'Expiry Status',
            dataIndex:'expiry_status',
            key:'expiry_status'
        }

    ];

    useEffect(() => {
        // console.log('table rendered')
    },[tableData])

    return (
        <>
             <Table 
                dataSource={tableData.data}
                columns={columns}
                pagination={{
                    onChange:getPage,
                    current:tableData.currentPage,
                    total:tableData.total,
                    size:"small",
                    defaultPageSize:100,    
                    showTotal:() => `${tableData.chunck} out of ${tableData.total}`
                }}
                loading={loading}
                size="small"
                scroll={
                    {   x: 3000,
                        y:'75vh' 
                    }
                }/>
            
         </>
    );
}

export default TableRecords;
