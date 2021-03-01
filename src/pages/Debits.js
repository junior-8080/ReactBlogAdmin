import React,{useState,useEffect} from 'react';
import {Table} from 'antd';
import moment from 'moment';
import {addZeroes,numberWithCommas}  from '../utils';


const Debits = () => {

    const [debits, setDebits] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [refresh,setFresh] =useState(false)
    const [page,setPage]= useState(1); 
    const [total,setTotal] = useState(0);
    const [chunck,setChunck] = useState(0);

    const columns = [
        {
            title:'Date',
            dataIndex:'postedDate',
            key:'invoiceDate',
            width:'15%',
            render:(value,row) => {
                if(row.postedDate){
                   return row.postedDate = moment(row.postedDate).format('MMM DD, YYYY')
                }

                return null
            }
        },
        {
            title:'Transcation Id',
            dataIndex:'transactionId',
            key:'transcationId',
            width:'15%',
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
            width:'20%',
            className:'invoice-amount',
            render:(value, row) => {
              if(row.amount){
                return numberWithCommas(addZeroes(row.amount.toString(),row.currency))
              }
             
            }
            
        },{
            title: 'Description',
            dataIndex: 'description',
            key:'description',
            width:'25%'
        }
    ]

    const onChange = (value) => {
        setPage(value)
    }

    useEffect(() => {
        
        const url = `http://payments.qa.esoko.com:9099/v1/debits/?pageSize=100&page=${page}&order=asc`;
        setLoading(true)
        fetch(url)
        .then(res =>  res.json())
        .then(response => {
            // console.log(data)
            setDebits(response.data.items);
            setTotal(response.data.total);
            setChunck(response.meta.pageSize)
            setLoading(false);
            
        })
    },[page,refresh])


    return (

        <div  className="invoice-table">
            <Table 
                columns ={columns}
                dataSource = {debits}
                pagination={{total:total,
                    onChange:onChange,
                    current:page,
                    defaultPageSize:100,
                    size:'small',
                    showTotal:(total) => debits.length === 100 ?`${((page * chunck) + 1) - chunck} - ${chunck * page} out of ${total}`
                    : `${((page - 1) * chunck) + 1} - ${total} out of ${total}`
                }}
                    loading={isLoading}
                scroll={
                    {
                        y:'75vh'
                    } 
                }
                bordered
            />
        </div>
    );
}

export default Debits;
