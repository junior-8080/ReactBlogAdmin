import React, {useState} from 'react';
import {LoadingOutlined,FundOutlined} from '@ant-design/icons'
import {Form, Input, Button, message,Row,Col} from 'antd';
// import { authzation } from '../auth';
// import { Redirect } from 'react-router-dom';

const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
};

const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16
    }
};

const Signin = (props) => {

    const [isLoading,setIsLoading] = useState(false);
    // const isLogin = authzation();

    const style = {
        marginLeft: 'auto',
        backgroundColor: "#fff",
        padding: '2em',
        marginTop: "10em",
        borderRadius: 5
    }

    const antIcon = <LoadingOutlined style={{
        fontSize: "small",
        marginRight:0,
        paddingRight:0
        
    }} spin/>;


    // if(isLogin){
    //     return(
    //         <Redirect 
    //         to={{
    //             pathname:'/overview',
    //             state:{
    //                 from:props.location.pathname
    //             }
    //         }}
    //      />
    //     )
    // }
    
    
 
    const onFinish = (values) => {
        const data = {
            email: values.email,
            password: values.password
        };
        setIsLoading(true);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {

                if (result.message.email && result.message.username) {
                    localStorage.setItem('userProfile', JSON.stringify(result.message));
                    setIsLoading(false)
                    window.location = '/overview'
                }
                message.error(result.message);
        
                setIsLoading(false);

            })
            
    }

    return (
        
        <Row className="sign-form">
            <Col span={8}>
                <Form
                    style={style}
                    {...layout}
                    name="basic"
                    initialValues={{
                    remember: true
                }}
                    onFinish={onFinish}>
                    {/* <Form.Item> */}
                    <h4
                        style={{
                        color: "#001529",
                        textAlign: "center"
                    }}><FundOutlined size="md"/> INSTY FORM REPORTS
                    </h4>
                    {/* </Form.Item> */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            required: true,
                            type: 'email',
                            message:"Email is required"
                        }
                    ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Password is required'
                        }
                    ]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="small"
                            style={{
                            color: "#001529",
                            width:80
                        }}>
                        <span>Login</span>{isLoading
                                ? antIcon
                                : ""}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
     </Row>
    );
}

export default Signin;