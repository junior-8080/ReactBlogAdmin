import React,{useState,useEffect} from 'react';
import {Card,Avatar, message} from 'antd';
import {LoadingOutlined,CheckCircleTwoTone,CloseCircleOutlined} from '@ant-design/icons';

import logo from '../images/esoko_logo.png';

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
                    setStatus(result.data)
                    setloading(false)
                    
                }
            })
          }else {
              message.error('Error Occured ,Contact Esoko Help For Assitance')
          }
          
      })
    }, [transactionId]);
  
    return (
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
                 <div style= {{color:"#52c41a",fontSize:14}}>
                     <h2 style={{color:"#52C41a"}}>SUCCESS</h2>
                     <CheckCircleTwoTone twoToneColor="#52c41a" />
                     <p>{transactionStatus.reason}</p>
                 </div>
                 :
                 <div style={{color:"#FF0000"}}>
                     <h2 style={{color:"#FF0000"}}>FAILED</h2>
                     <CloseCircleOutlined  color="#FF0000"/>
                     <p style={{color:"#FF0000",fontSize:14}}>Transcation Declined</p>
                </div>
               }
           </div>
          }
      </Card>
    );
}

export default ConfirmPayment;
