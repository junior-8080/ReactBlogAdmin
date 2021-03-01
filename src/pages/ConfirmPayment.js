import React,{useState,useEffect} from 'react';
import {Card,Avatar, message} from 'antd';
import {LoadingOutlined,CheckCircleTwoTone,CloseCircleOutlined} from '@ant-design/icons';

import logo from '../images/logo.png';
// import logo1 from '../images/logo.png';
import ConfrimationCard from '../components/ConfrimationCard';

const ConfirmPayment = (props) => {
  
    const note = {
        fontSize:11,
        color:"#000",
        opacity:.5
    }
    
    
    const transactionId = props.location.search.split('=').splice(-1)[0];
    const [transactionStatus, setStatus] = useState("");
    const [loading, setloading] = useState(true);
    
    useEffect(() => {
      setloading(true)
      fetch(`http://payments.qa.esoko.com:9099/v1/debits/${transactionId}/payswitchStatus`)
      .then(res => res.json())
      .then(result => {
          if(result.code === 200 && result.status === "SUCCESS") {
            fetch(`http://payments.qa.esoko.com:9099/v1/debits/confirmations/payswitch?transaction_id=${transactionId}`)
            .then(res => res.json())
            .then(update => {
                if(update.code === 200 && update.status === "SUCCESS"){

                    fetch(`http://payments.qa.esoko.com:9099/v1/invoices/${update.data.invoiceRef}`)
                    .then(res => res.json())
                    .then( invoiceResult => {
                        if(invoiceResult.code === 200 && invoiceResult.status === 'SUCCESS'){
                            const body = {
                                transactionId :transactionId,
                                amount : invoiceResult.data.amount,
                                currency : invoiceResult.data.currency,
                                status: invoiceResult.data.status,
                                customerEmail:invoiceResult.data.customerEmail
                            }
                            fetch(`/invoice/mail/receipt`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })
                            .then(res => res.json()) 
                            .then(emailResult => {
                                if(emailResult.statusCode === 200 && emailResult.message === 'success'){
                                
                                       setStatus(result.data)
                                       setloading(false)
                                      message.success(`Receipt Send To ${invoiceResult.data.customerEmail}`,6)
                                }
                                
                            })
                        }
      
                    })
                                     
                }
            })
          }else {
              message.error('Error Occured ,Contact Esoko Help For Assitance')
          }
          
      })
    }, [transactionId]);
  
    return (
     <section className="payment-verification">
      <>
      {/* <img src={logo1} width="20%"/> */}
      <Card className="verification-card">
          <Card.Meta 
             avatar ={
                 <Avatar src={logo} size="large"/>
             }
            
          />
          {loading? <div>
            <h3>Verifying Payment...</h3>
             <LoadingOutlined color="#000" size="large" />
            <p style={note}>This will take a few minutes...</p>
          </div> : 
           <div>
               {
                 transactionStatus.status === 'approved'? 
                    <ConfrimationCard color="green"  icon={<CheckCircleTwoTone twoToneColor="green" size="large"/>}
                        reason={transactionStatus.reason} status="SUCCESS" />
                 :
                 <ConfrimationCard color="#FF0000"  icon={<CloseCircleOutlined size="large"/>}
                 reason="Transcation Declined!" status="FAILED" />
               }
           </div>
          }
      </Card>
     </>
    </section>
    );
}

export default ConfirmPayment;
