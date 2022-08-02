import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import image from "../images/image.svg";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

const Signin = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const style = {
    marginLeft: "auto",
    backgroundColor: "purple",
    padding: "2em",
    marginTop: "10em",
    borderRadius: 5,
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: "small",
        marginRight: 0,
        paddingRight: 0,
      }}
      spin
    />
  );

  const onFinish = (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          localStorage.setItem("profile", JSON.stringify(result.data));
          history.push("/articles");
        } else {
          if (result.statusCode === 304 && result.status === "UNAUTHORIZED") {
            message.error("Invlaid Username or Password");
          }
        }
      })
      .catch((err) => {
        message.error("Error Occured While Performing Action");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Row className="signin">
      <Col span={12} xs={0} md={12} className="signin-banner">
        <img src={image} alt="logo" />
      </Col>
      <Col span={8} md={8} xs={20}>
        <Form
          style={style}
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h4
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            MY BLOG SITE
          </h4>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              style={{
                color: "#fff",
                width: 80,
              }}
            >
              <span>Login</span>
              {isLoading ? antIcon : ""}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signin;
