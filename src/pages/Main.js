import React, {useEffect, useState} from 'react';
import Total from '../components/Total';
import Summary from '../components/Summary';
import AccountTypes from '../components/AccountTypes';
import LineChart from '../components/LineChart';
import {Col, Row} from 'antd';
// import CountryForm from '../components/CountryForm';
import BarChart from '../components/BarChart'
import {FileAddOutlined,TeamOutlined,FileOutlined,FlagOutlined}   from '@ant-design/icons'
import '../App.css';




function Main() {


    const [summary, setSummary] = useState('');
    const [total_acc,setTotal_Acc] = useState(0);
    const [total_country,setTotal_Country] = useState(0);
    const[total_form,setTotal_Form] = useState(0);
    const[paid_form_acc,setPaidFormAcc] = useState([]);
    const [accType,setAccType] = useState([]);
    const [newForms,setNewForms] = useState(0);
    

    useEffect(() => {
        fetch('/forms/total').then((res) => res.json()).then((response) => {
            // console.log(response.data)
            setSummary(response.data)
            
        }).catch(function (error) { 
            console.log(error);
        })
        fetch('/signups?keyword=total').then((res) => res.json()).then((response) => {
           console.log(response.data)
            setTotal_Acc(response.data)
        }).catch(function (error) { // handle error
            console.log(error);
        })
        fetch('/forms/total/?keyword=forms').then((res) => res.json()).then((response) => {
            // console.log(response)
            setTotal_Form(response.data.count)
        }).catch(function (error) { // handle error
            console.log(error);
        })
        fetch('/forms/total/?keyword=countries').then((res) => res.json()).then((response) => {
            // console.log(response)
            setTotal_Country(response.data.count)
        }).catch(function (error) { // handle error
            console.log(error);
        })
        fetch('/forms/total/?keyword=paid_forms').then((res) => res.json()).then((response) => {
            setPaidFormAcc(response.data);
        }).catch(function (error) { // handle error
            console.log(error);
        })

        fetch('/signups/?keyword=account_types').then((res) => res.json()).then((response) => {
             setAccType(response.data);
         }).catch(function (error) { // handle error
             console.log(error);
         })
         fetch('/forms/total/?keyword=new_forms').then((res) => res.json()).then((response) => {

             setNewForms(response.data.count);
         }).catch(function (error) { // handle error
             console.log(error);
         })
    }, [])

    return (
        <div style={{height:'100vh',overflowY:'scroll',overflowX:'hidden'}}>
            <Row gutter={2}> 
                <Col span={6}>
                    <Total total={total_acc} backgroundColor="#348AA7"color="#04142b" title="Total Accounts" avatar={<TeamOutlined />}/>
                </Col>
                <Col span={6}>
                    <Total total={newForms} backgroundColor="#7cb7e6" color="#fff" title="New Forms" avatar={<FileAddOutlined />}/>
                </Col>
                <Col span={6}>
                     <Total total={total_form} backgroundColor="#348AA7" color="#04142b" title="Total Forms" avatar={<FileOutlined />}/>
                </Col>
                <Col span={6}>
                   <Total total={total_country} backgroundColor="#7cb7e6" color="#fff" title="Countries" avatar={<FlagOutlined />}/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                     <Summary summary={summary}/>
                </Col>
                <Col span={12}>
                     <AccountTypes paidForms={paid_form_acc} accTypes={accType}/>
                 </Col>
            </Row>
            <Row gutter={4} style={{marginTop:20}}>
                <Col span={24} >
                    <LineChart title="Signups Per Month" path="signups"/>
                </Col>
            </Row>
            <Row gutter={4} style={{marginTop:20}}>
                <Col span={24} >
                    <LineChart title="Forms Per Moth" path="forms/total"/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col span={24} >
                    <BarChart title="Signups In Countries" path="signups" />
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col span={24} >
                    <BarChart title="Forms Created In Countries" path="forms/total" bottom={50}/>
                </Col>
            </Row>
           
        </div>

    );
}

export default Main;
