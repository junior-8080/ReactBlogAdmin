import React from "react";
import { Col } from "antd";
import AdminLayout from "./AdminLayout";
import Menusm from "./Menusm";
import ProfileForm from "./ProfileForm";

const Profile = (props) => {
  return (
    <AdminLayout>
      <Col md={20} xs={24} sm={24} className="main-view">
        <div className="navs-sm">
          <Menusm />
        </div>
        <ProfileForm />
      </Col>
    </AdminLayout>
  );
};

export default Profile;
