import React from 'react';
import {Table,Popconfirm} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import {addZeroes,numberWithCommas}  from '../utils';


const InvoiceTable = ({dataSource,getValues,total,currentPage,isLoading,chunck,handlePaid,handleDelete}) => { 
    

    const columns = [
        {
            title:'Invoice Date',
            dataIndex:'invoice_date',
            key:'invoice_date',
            width:'15%',
            render:(value,row) => {
                if(row.invoice_date){
                   return row.invoice_date = moment(row.invoice_date).format('MMM DD, YYYY')
                }

                return null
            }
        },
        {
            title:'Date',
            dataIndex:'creation_date',
            key:'creation_date',
            width:'15%',
            render:(value,row) => {
                if(row.creation_date){
                  return row.creation_date = moment(row.creation_date).format('MMM DD, YYYY')
                }
                return null
            }

        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            fixed: 'left',
            key:'customer_name',
            width:'18%',
           
        },
        {
            title: 'Customer Email',
            dataIndex: 'customer_email',
            key:'customer_email',
            width:'20%'
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key:'amount',
            width:'16%',
            className:'invoice-amount',
            render:(value, row) => {
              return numberWithCommas(addZeroes(row.amount.toString(),row.currency))
            }
            
        },{
            title: 'Source',
            dataIndex: 'invoice_source',
            key:'invoice_source',
            width:'10%'
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
            width:'13%'
          },
        {
            title:"",
            render: (text, record) =>{
                // console.log(record)

                if(dataSource.length > 0  && record.status === 'processing') {
        return <>
            <Popconfirm title="Are You Sure ?" onConfirm={() => handlePaid(record.reference)}
                okText="Yes" cancelText="No" placement="topRight" 
                >
                <span className="pay-btn" size="small">pay</span>&nbsp;
             </Popconfirm>
            <Popconfirm title="Are You Sure ?" onConfirm={() => handleDelete(record.reference)}
                okText="Yes" cancelText="No" placement="topRight" icon={<QuestionCircleOutlined  style={{color:"red"}}/>}
                >
                <span className="del-btn"  size="small">cancel</span>
            </Popconfirm>
           </>
                }

                return null
},
            width:'14%'
        }


    ];

const onChange = (values) =>{
    getValues(values)
}

    return (
           <Table dataSource={dataSource}
            columns={columns}
            pagination={{total:total,
                onChange:onChange,
                current:currentPage,
                defaultPageSize:100,
                size:'small',
                showTotal:(total) => `${chunck} out of ${total}`}}
                loading={isLoading}
            scroll={
                {
                    y:'75vh'
                } 
            }
            bordered
            
         /> 
        
     );
}

export default InvoiceTable;