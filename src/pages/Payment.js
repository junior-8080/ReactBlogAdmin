import React from 'react';
import invoice from '../images/invoice.svg';
import invoice1 from '../images/invoice1.svg';
import debits from '../images/debit.svg';
import {Link} from 'react-router-dom'; 
import {Col,Row} from 'antd';


const Payment = (props) => {

    if(props.location.pathname !== '/'){
        localStorage.setItem('prevPath',props.location.pathname);
    }
    
    return (
        <div className="payment">
            <Row className="payment-row">
                <Col    className="payment-link">
                 <Link to='/payment/invoices'>
                    <img src={invoice} alt="list-invoice"  className="payment-svg" />
                    <h3>View Invoices</h3>
                    </Link>
                </Col>
                <Col  className="payment-link">
                    <Link to='/payment/invoice'>
                        <img src={invoice1} alt="invoice" className="payment-svg" />
                        {/* <PlusOutlined  size={24}/>s */}
                        <h3>Create Invoice</h3>
                    </Link>
                </Col>
                <Col  className="payment-link">
                    <Link to='/payment/debits'>
                        <img src={debits} alt="debits" className="payment-svg" />
                        <h3>View Debits</h3>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default Payment;
