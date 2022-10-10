import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};



const ProfileForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  // const history = useHistory();
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("blog_admin_profile"));
  
    const userData = {
      username: profile.username,
      email: profile.email,
      twitter: profile.twitter,
      instagram: profile.instagram
    };
    setProfile(userData);
  }, []);

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
      email: values.email,
      instagram: values.instagram,
      twitter: values.twitter,
    };
    const token = localStorage.getItem("blog_admin_token");
    setIsLoading(true);
    axios(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      data,
    })
      .then((result) => {
        if (result.status === 200) {
          const userProfile = result.data.data;
          localStorage.setItem("blog_admin_profile", JSON.stringify(userProfile));
          message.success("User Update Successfully")
          window.location.reload()
        }
      })
      .catch((err) => {
        let errorData = err.response;
        if (errorData === undefined || errorData === "") {
          return message.error("Error Occurred While Performing Action");
        }
        if (err.response.status === 401) {
          message.error("Invalid Parameters");
        } else {
          return message.error("Error Occurred While Performing Action");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Row className="signin">
      <Col span={8} md={8} xs={20}>
        {profile ? <Form
          {...layout}
          name="basic"
          initialValues={{
            ...profile,
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
            Profile
          </h4>
          <Form.Item
            label="Email"
            name="email"
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
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Username is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Twitter Handle"
            name="twitter"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Instagram Page"
            name="instagram"
          >
            <Input />
          </Form.Item>
          <Form.Item
          label=" "
          colon={false}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                color: "#fff",
                width:"100%",
              }}
            >
              <span>Update Profile</span>
              {isLoading ? antIcon : ""}
            </Button>
          </Form.Item>
        </Form>
        :
        <div>
           <Spin />
        </div>
       
        }
      </Col>
    </Row>
  );
};

export default ProfileForm;
