import React,{useContext} from "react";
import SideBar from "./SideBar";
import { Col, Row } from "antd";
import { VisibleContext } from "./VisibilityContext";



const AdminLayout = (props) => {
  const {handleVisibility} = useContext(VisibleContext);

  return (
    <Row>
      <Col md={4} xs={0}>
        <SideBar handleVisibility={handleVisibility} />
      </Col>
      {props.children}
    </Row>
  );
};

export default AdminLayout;
