import React,{useState,useEffect} from 'react';
import InvoiceTable from '../components/InvoiceTable';
import {Button, message, Modal,Popover,Input}  from 'antd';
import {UpOutlined,DownOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Advance  from '../components/Advance';
import Actions from '../components/Actions';



const Invoice = () => {
    
    const [result, setResult] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [loading, setloading] = useState(false);
    const [refresh,setFresh] =useState(false)
    const [page,setPage]= useState(1); 
    const [total,setTotal] = useState(0);
    const [chunck,setChunck] = useState(0);
    const [checkoutUrl,setCheckoutUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ispopVisible,setPop]  = useState(false)
    const [email,setEmail] = useState("");
    const [suffixUp,setSuffixUp] =  useState(false);
    const [searchValue,setAllSearch] = useState('');
    const [filter,setFilter] = useState("")
    

    const cols = [
        {
            title:"Amount",
            type:"number",
            value:"amount"
        },
        {
            title:"Customer Email",
            type:"text",
            value:"customerEmail"
    
        },
        {
            title:"Invoice Source",
            type:"select",
            value:"invoiceSource",
            options: [{title:"Insyt",value:"INSTY"},{title:"Push",value:"DFS"}]
    
        },
        {
            title:"Currency",
            type:"select",
            value:"currency",
            options: [{title:"Dollars",value:"USD"},{title:"Cedis",value:"GHS"}]
    
        },
        {
            title:"Staus",
            type:"select",
            value:"status",
            options: [{title:"Processing",value:"processing"},{title:"Paild",value:"paid"},{title:"Failed",value:"failed"}]
    
        },
        {
            title:"Date Created",
            type:"date",
            value:"dateCreated"
    
        },
        {
            title:"Invoice Date",
            type:"date",
            value:"invoiceDate"
        }
    ]
    

    const onFinish = (values ) => {
        let query= ''
        values.custom_field.forEach((field) => {
            query+= `${field.what_to}=${field.value}&`

        });

        setFilter(query)
        setPop(!ispopVisible)
        handleSuffix()
    }

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handlePopover = () => {
        setPop(!ispopVisible)
    }
  
    const handleSuffix = () => {
        setSuffixUp(!suffixUp)
        setPop(!ispopVisible);
    
       }

    useEffect(() => {
        
        const url = `http://payments.qa.esoko.com:9099/v1/invoices/?${filter}pageSize=100&page=${page}&order=asc`;
        setLoading(true)
        fetch(url)
        .then(res =>  res.json())
        .then(response => {
           
            setResult(response.data.items);
            setTotal(response.data.total);
            setChunck(response.meta.pageSize)
            setLoading(false);
            
        })
        .catch(err => {
            message.error('Error Occured While Performing Action',6)
        })
    },[page,refresh,filter])
    

    const onChange = (values) => {
        setLoading(true)
        setPage(values)
    }

    const handlePaid = (value,emailValue) => {

        setEmail(emailValue)
        const body = {
        mode:"checkout",
        payChannel:"momo",
        redirectUrl:`http://localhost:3000/payment/verification`
        }
        
        setloading(true)
        showModal();
        fetch(`http://payments.qa.esoko.com:9099/v1/invoices/${value}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(result => {
            if(result.code === 201 && result.status === 'RESOURCE_CREATED'){
                setCheckoutUrl(result.data.checkoutUrl);
                setloading(false)
            }
            
        })
        .catch(err => message.error(''))
    }
    
    const handleDelete = (key) => {
        
        fetch(`http://payments.qa.esoko.com:9099/v1/invoices/${key}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.code === 200 && result.status === 'SUCCESS'){
                 message.success('Inovice deleted')
                 setFresh(!refresh)
            }
            
        })
        .catch(err => {
            if(err.code === 500){
                message.error('Error Occured While Performing Action',6)
            }
        })

        // const data = [...result];
        // setResult(data.filter((record) => record.invoiceRef !== key))
    }

    const handleExport = () => {
        message.info('Exporting....')
        fetch(`/payment/download?pageSize=${total}&filter=${filter}&url=invoice`)
        .then(res => res.json())
        .then(result => {
            if(result.statusCode === 200 && result.message === 'success'){

                window.open(result.data.downloadUrl,'_blank')
                
            }
            
        })
        .catch(err => {
            if(err.code === 500){
                message.error('Error Occured While Performing Action',6)
            }
        })
    }

    const sendLink = () => {
        const body = {
            checkOutUrl: checkoutUrl,
            customerEmail:email
        }
        setEmail("")
        fetch(`/invoice/mail/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(result => {
            if(result.statusCode === 200 && result.message === 'success'){
                // console.log(result)
                message.success(`Link Send To ${email}`,6)
                handleCancel();
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
                 {/* <h4 style={{marginBottom:5}}  >Search</h4> */}
                 <p style={{color:'#000',fontSize:10,margin:0}}>Select the fields you want the search to be refined according</p>
             </div>
             <Advance  onFinish = {onFinish}  handleCancel={handlePopover}  cols={cols}  handleSuffix={handleSuffix}/>
           </>
        )
   }

  




    return (
        <div  className="invoice-table">
            <div style={{display:"flex",justifyContent:"space-between"}}>
               <Link to="/payment/invoice">Create Invoice</Link>
               <h3 className="page-title">INVOICES</h3>
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
                     <Input.Search placeholder="Search By Email"suffix= {suffixUp ?<UpOutlined    onClick ={handleSuffix} size="small"/> : <DownOutlined   onClick ={handleSuffix} /> } 
                         style={{marginRight:'1em'}}
                          value={searchValue}  onChange= {(event) =>{ searchValue !== event.target.value && setAllSearch(event.target.value)}}
                          onSearch = {() => setFilter(`customerEmail=${searchValue}&`) }
                    />
                    <Actions  handleRefresh = { () => setFresh(!refresh)} handleReset = {() => setFilter("")} handleExport ={handleExport} />
                      
               </div>
            </div>


           <InvoiceTable
             dataSource={result}
             isLoading={isLoading}
             currentPage={page}
             total={total}
             getValues={onChange}
             chunck={chunck}
             handlePaid={handlePaid}
             handleDelete={handleDelete}
              />
              <Modal
              visible={isModalVisible} 
              onCancel={handleCancel}
              closable = {false}
              footer={[
                <Button size="small" htmlType="button" type="primary" onClick={() => sendLink()} disabled={loading}>{email? 'Share':'Sending...'}</Button>,
                <Button key="back" onClick={handleCancel} size="small" type="primary">
                  Cancel
                </Button>
              ]}>
                 {loading ? <p>Loading.....</p> : <><h3 style={{color:"#f8d568"}}>Share This Link To Complete Payment Via Email Or Click To Pay</h3>
                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick ={()=> handleCancel()}>{checkoutUrl}</a></>}
              </Modal>
        </div>
    );
}

export default Invoice;
