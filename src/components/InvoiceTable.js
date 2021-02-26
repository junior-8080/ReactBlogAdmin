import React from 'react';
import {Table,Popconfirm} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import {addZeroes,numberWithCommas}  from '../utils';


const InvoiceTable = ({dataSource,getValues,total,currentPage,isLoading,chunck,handlePaid,handleDelete}) => { 
     
     

    const columns = [
        {
            title:'Payment Date',
            dataIndex:'invoiceDate',
            key:'invoiceDate',
            width:'15%',
            render:(value,row) => {
                if(row.invoiceDate){
                   return row.invoiceDate = moment(row.invoiceDate).format('MMM DD, YYYY')
                }

                return null
            }
        },
        {
            title:'Created Date',
            dataIndex:'createdTime',
            key:'creationTime',
            width:'15%',
            render:(value,row) => {
                if(row.createdTime){
                  return row.createdTime = moment(row.createdTime).format('MMM DD, YYYY')
                }
                return null
            }

        },{
        
            title: 'Customer Name',
            dataIndex: 'customerName',
            fixed: 'left',
            key:'customerName',
            width:'18%',
           
        },
        {
            title: 'CustomerEmail',
            dataIndex: 'customerEmail',
            key:'customerEmail',
            width:'20%'
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key:'amount',
            width:'16%',
            className:'invoice-amount',
            render:(value, row) => {
              if(row.amount){
                return numberWithCommas(addZeroes(row.amount.toString(),row.currency))
              }
             
            }
            
        },{
            title: 'Source',
            dataIndex: 'invoiceSource',
            key:'invoiceSource',
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

                if(dataSource.length > 0  && record.status  !== 'paid') {
           return <>
                <Popconfirm title="Are You Sure ?" onConfirm={() => handlePaid(record.invoiceRef,record.customerEmail)}
                    okText="Yes" cancelText="No" placement="topRight" okButtonProps={{size:"small",type:"primary"}}
                   
                    >
                    <span className="pay-btn" size="small">pay</span>&nbsp;
                </Popconfirm>
                <Popconfirm title="Are You Sure ?" onConfirm={() => handleDelete(record.invoiceRef)}
                    okText="Yes" cancelText="No" placement="topRight" icon={<QuestionCircleOutlined  style={{color:"red"}}/>}
                    >
                    <span className="del-btn"  size="small">Delete</span>
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
                showTotal:(total) => dataSource.length === 100 ?`${((currentPage * chunck) + 1) - chunck} - ${chunck * currentPage} out of ${total}`
                : `${((currentPage - 1) * chunck) + 1} - ${total} out of ${total}`
            }}
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