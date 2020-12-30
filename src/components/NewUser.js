import React,{useState} from 'react';
import {LoadingOutlined,UserAddOutlined} from '@ant-design/icons'
import {Form, Input, Button, message, Col,Row} from 'antd';

const layout = {
    labelCol: {
        span: 0
    },
    wrapperCol: {
        span: 24
    }
};

const tailLayout = {
    wrapperCol: {
        offset: 22,
        span: 24
    }
};

const NewUser = (props) => {

    const [isLoading,
        setIsLoading] = useState(false);

    const antIcon = <LoadingOutlined style={{
        fontSize: "small"
    }} spin/>;

    const onFinish = (values) => {
        const data = {
            email: values.email,
            username:values.username,
            password: values.password
        };
       
        setIsLoading(true);
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {

                if (result.message.email) {
                    setIsLoading(false)
                    message.success('New User Created: '+ result.message.email);
                   
                }else{
                    message.success(result.message);
                    setIsLoading(false);
                }
               

            })
    }

    return (
       <Row style={{height:'100vh'}}> 
       <Col span={12} offset={6} style={{marginTop:"8em"}}>
           <h4><UserAddOutlined /> New User</h4>
        <Form
            className="new-user-form"
            {...layout}
            name="basic"
            onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[{
                    required: true,
                    type: 'email'
                }
            ]}>
                <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item
                name="username"
                rules={[{
                    required: true,
                    message:'Please input your username'
                }
            ]}>
                <Input placeholder="Username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{
                    required: true,
                    message: 'Please input your password!'
                }
            ]}>
                <Input.Password placeholder="Password"/>
            </Form.Item>
            <Form.Item
            
                name="confirmPassword"
                rules={[{
                    required: true,
                    message: 'Please input your password!'
                } ,({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
            ]}>
                <Input.Password placeholder="Confirm Password"/>
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="small"
                >
                  Save{isLoading
                        ? antIcon
                        : ""}
                </Button>
            </Form.Item>
        </Form>
        </Col>
    </Row>
    );
}


export default NewUser;
