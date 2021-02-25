import React,{useState,useEffect} from 'react';
import InvoiceTable from '../components/InvoiceTable';
import {Button, Modal}  from 'antd';
import { Link } from 'react-router-dom';


const Invoice = (props) => {
    
    const [result, setResult] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [loading, setloading] = useState(false);
    const [page,setPage]= useState(1); 
    const [total,setTotal] = useState(0);
    const [chunck,setChunck] = useState(0);
    const [checkoutUrl,setCheckoutUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  

    useEffect(() => {

        const url = `http://payments.qa.esoko.com:9099/v1/invoices/?pageSize=100&page=${page}&order=asc`;
        setLoading(true)
        fetch(url)
        .then(res =>  res.json())
        .then(response => {
            // console.log(data)
            setResult(response.data.items);
            setTotal(response.data.total);
            setChunck(response.meta.pageSize)
            setLoading(false)
        })
    },[page])

    const onChange = (values) => {
        setLoading(true)
        setPage(values)
    }

    const handlePaid = (value) => {

        const body = {
        mode:"checkout",
        payChannel:"momo",
        redirectUrl:"http://localhost:3000/payment/invoice"
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
    }
    
    const handleDelete = (key) => {

        const data = [...result];
        setResult(data.filter((record) => record.invoiceRef !== key))
    }


    return (
        <div  className="invoice-table">
            <Link to="/payment/invoice">Create Invoice</Link>
           <InvoiceTable
             dataSource={result}
             isLoading={isLoading}
             currentPage={page}
             total={total}
             getValues={onChange}
             chunck={chunck}
             handlePaid={handlePaid}
             handleDelete={handleDelete}
              />:
              <Modal
              visible={isModalVisible} 
              onCancel={handleCancel}
              closable = {false}
              footer={[
                <Button key="back" onClick={handleCancel} size="small" type="primary">
                  Cancel
                </Button>,
                // <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" >
                // <Button size="small" htmlType="button" type="primary">Proceed Payment</Button>
                // </a>
              ]}>
                 {loading ? <p>Loading.....</p> : <><h3>Share This Link To Complete Payment Or Click To Pay</h3>
                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">{checkoutUrl}</a></>}
              </Modal>
        </div>
    );
}

export default Invoice;
