import React from 'react';
import Form from '../FormComponent/Forms';
import  {props3,formLayout} from '../payload2';
import {message,Row,Col} from 'antd';
import {useHistory} from 'react-router-dom';
import {SnippetsOutlined} from "@ant-design/icons"


const InvoiceForm = () => {

    const history = useHistory();
    const onFinish = (values) => {

        fetch('/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then(result => {

                if (result.message.customer_name) {
                    message.success('New Invoice Created For: '+ result.message.customer_name);
                    history.push('/payment/invoice');
                   
                }           

            })
    }
    return (
        <Row style={{height:'100vh'}}>
            <Col span={12} offset={6}>
                <h4><SnippetsOutlined /> New Invoice</h4>
                <Form fields={props3} 
                    formLayout={formLayout}  
                    btnSize="small" onSubmit={onFinish}
                    className="invoice-form" 
                    layout="vertical"
               />
            </Col>
        </Row>
    );
}

export default InvoiceForm;
