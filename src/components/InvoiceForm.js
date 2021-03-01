import React from 'react';
import {message,Row,Col,Form,Input,InputNumber,Select,DatePicker,Button,} from 'antd';
import {useHistory} from 'react-router-dom';
import {SnippetsOutlined,LeftCircleOutlined } from "@ant-design/icons"
import TextArea from 'antd/lib/input/TextArea';
import {Link} from 'react-router-dom';
import   uniqueString from 'unique-string';
import { v4 as uuidv4 } from 'uuid';
import moment  from 'moment';



const InvoiceForm = () => {

    const history = useHistory();
    const [form]= Form.useForm()
    const onFinish = (values) => {
        // console.log(values)
        values.invoiceDate = moment(values.invoiceDate).format("YYYY-MM-DD")
        values.invoiceRef = uuidv4();
        values.invoiceNo = uniqueString().substring(0, 12);
        fetch('http://payments.qa.esoko.com:9099/v1/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then(result => {

                if (result.code === 201 &&  result.status === 'RESOURCE_CREATED') {
                    message.success('New Invoice Created For: '+ values.customerName);
                    form.resetFields();
                    history.push('/payment/invoice');
                   
                }           
               
            })
    }
    return (
        <Row style={{height:'100vh'}}>
            <Col span={12} offset={6} >
                <h4><SnippetsOutlined /> New Invoice</h4>
                <Form className="invoice-form" onFinish ={onFinish} form={form}>
                     <Form.Item 
                      name="customerName"
                      rules={[{ required: true}]}
                     >
                         <Input 
                          placeholder="Customer Name"
                          rules={[{ required: true}]}
                        
                        />
                     </Form.Item>
                     <Form.Item
                       rules={[{ required: true}]}
                       name="customerEmail"
                     >
                     <Input 
                          placeholder="Customer Email"
                           type="email"
                         />
                     </Form.Item>
                     <Form.Item
                       rules={[{ required: true}]}
                       name="customerAddress"
                     >
                     <Input 
                          placeholder="Customer Address"
                         />
                     </Form.Item>
                     <Row gutter={6}>
                        <Col>
                            <Form.Item
                            name="amount"
                            rules={[{ type: 'number', min: 1, max: 100,message:"Invoice should be created in multiple of 1000" },{required:true}]}>
                                <InputNumber 
                                placeholder="Amount"/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                            name="currency"
                            rules={[{required:true}]}>
                                <Select placeholder="Currency">
                                        <Select.Option value="USD">CEDIS</Select.Option>
                                        <Select.Option value="GHS">USD</Select.Option>
                                        {/* <Select.Option value="usd">USD</Select.Option> */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name="invoiceSource" >
                                <Select placeholder="Invoice Source">
                                        <Select.Option value="dfs">DFS</Select.Option>
                                        <Select.Option value="insyt">INSYT</Select.Option>
                                        {/* <Select.Option value="usd">USD</Select.Option> */}
                                </Select>
                            </Form.Item>
                        </Col>
                     </Row>
                     <Form.Item
                      name="description"
                      rules={[{required:true}]}>
                         <TextArea placeholder="Write a note about this invoice"/>
                     </Form.Item>
                     <Form.Item
                     name="invoiceDate"
                    rules={[{required:true}]}
                    >
                        <DatePicker placeholder="Inoice Date"/>
                    </Form.Item>
                    <Form.Item
                      name="status"
                     >
                        <Select placeholder="Invoice Source" defaultValue="pending" disabled="true">
                                <Select.Option value="pending">Pending</Select.Option>
                                <Select.Option value="proceesing">Processing</Select.Option>
                                <Select.Option value="paid">Paid</Select.Option>
                        </Select>
                     </Form.Item>
                    <Form.Item className="invoice-form-button">
                        <Link to="/payment/invoices"><Button icon={ <LeftCircleOutlined />} type="primary">Invoices</Button></Link>
                        <Button htmlType="submit" type="primary">Save</Button>
                    </Form.Item>
                   
                 </Form>
            </Col>
        </Row>
    );
}

export default InvoiceForm;
