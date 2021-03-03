import React,{useState,useEffect} from 'react';
import {Table,Popover,Input,message} from 'antd';
import moment from 'moment';
import {UpOutlined,DownOutlined} from '@ant-design/icons';
import {addZeroes,numberWithCommas}  from '../utils';
import Advance from '../components/Advance';
import {Link} from 'react-router-dom';
import Actions from '../components/Actions';

const Debits = () => {

    const [debits, setDebits] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [refresh,setFresh] =useState(false)
    const [page,setPage]= useState(1); 
    const [total,setTotal] = useState(0);
    const [chunck,setChunck] = useState(0);
    const [ispopVisible,setPop]  = useState(false)
    const [suffixUp,setSuffixUp] =  useState(false);
    const [searchValue,setAllSearch] = useState('');
    const [filter,setFilter] = useState("")

    const cols = [
        {
            title:"Customer Email",
            type:"text",
            value:"customerEmail"
        },
        {
            title:"Amount",
            type:"number",
            value:"amount"
    
        },
        {
            title:"Currency",
            type:"select",
            value:"currency",
            options: [{title:"DOLLARS",value:"USD"},{title:"CEDIS",value:"GHS"}]
    
        },
        {
            title:"Invoice Refernce",
            type:"text",
            value:"invoiceRef"
    
        }
    ]
    

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

   
    useEffect(() => {
        
        const url = `http://payments.qa.esoko.com:9099/v1/debits/?${filter}pageSize=100&page=${page}&order=asc`;
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
        .catch(err => {
            if(err.code === 500){
                message.error('Error Occured While Performing Action',6)
            }
        })
    },[page,refresh,filter])

    const onChange = (value) => {
        setPage(value)
    }

    const onFinish = (values ) => {
        let query= ''
        values.custom_field.forEach((field) => {
            query+= `${field.what_to}=${field.value}&`

        });

        setFilter(query)
        setPop(!ispopVisible)
    }

    const handlePopover = () => {
        setPop(!ispopVisible)
    }
  
    const handleSuffix = () => {
        setSuffixUp(!suffixUp)
        setPop(!ispopVisible);
    
    }

    const handleExport = () => {
        message.info('Exporting....')
        fetch(`/payment/download?pageSize=${total}&filter=${filter}&url=debit`)
        .then(res => res.json())
        .then(result => {
            if(result.statusCode === 200 && result.message === 'success'){

                window.open(result.data.downloadUrl,'_blank')
                // message.info('Exporting....')
            }
            
        })
        .catch(err => {
            if(err.code === 500){
                message.error('Error Occured While Performing Action',6)
            }
        })
        
    }

    const content = ()  => {

        return (
            <>
              <div>
                 <p style={{color:'#000',fontSize:10,margin:0}}>Select the fields you want the search to be refined according</p>
             </div>
             <Advance  onFinish = {onFinish}  handleCancel={handlePopover}  cols={cols} handleSuffix={handleSuffix} />
           </>
        )
   }


    return (

        <div  className="invoice-table">
             <div style={{display:"flex",justifyContent:"space-between"}}>
             <Link to="/payment/invoices">Invoices</Link>
               <h3 className="page-title">DEBITS</h3>
               <div style={{display:"flex",marginBottom:"5px"}}>
                <Popover
                            content={content}
                            title="Advance Search"
                            trigger="click"
                            placement="bottom"
                            visible={ispopVisible}
                            onVisibleChange={() => handleSuffix()}
                           
                        >
                           <div style={{padding:"10px",visibility:"hidden"}}></div>
                    </Popover>

                    {/* <Button icon={<SyncOutlined  />} style={{marginRight:"1em"}} onClick = {() => {setFresh(!refresh)}}>Refresh</Button> */}
                     <Input.Search placeholder="Search By Email"suffix= {suffixUp ?<UpOutlined    onClick ={handleSuffix} size="small"/> : <DownOutlined   onClick ={handleSuffix} /> } 
                         style={{marginRight:'1em'}}
                          value={searchValue}  onChange= {(event) =>{ searchValue !== event.target.value && setAllSearch(event.target.value)}}
                          onSearch = {() => setFilter(`customerEmail=${searchValue}&`) }
                    />
                     <Actions  handleRefresh = { () => setFresh(!refresh)} handleReset = {() => setFilter("")} handleExport ={handleExport} />
               </div>
            </div>
            
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
