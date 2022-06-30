import { Col, Row } from "antd";
import React from "react";
import SideBar from "./SideBar";

const AdminLayout = (props) => {
  return (
    <Row>
      <Col md={4} xs={0}>
        <SideBar handleVisibility={props.handleVisibility} />
      </Col>
      {props.children}
    </Row>
  );
};

export default AdminLayout;
