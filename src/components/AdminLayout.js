import React from 'react'
import {useState} from 'react'
import StepModal from "./StepModal";
import SideBar from './SideBar'
import {Row,Col} from 'antd'


const AdminLayout = ({children}) => {

    const [isModalVisible,setVisibilty] = useState(false);
   
    const handleVisibility = () => {     
        setVisibilty(!isModalVisible)
    }

    return (
        <Row>
            <Col md={4} xs={0}>
               <SideBar handleVisibility = {handleVisibility} />
            </Col>
            {
                children
            }
          <StepModal handleVisibility = {handleVisibility} isModalVisible = {isModalVisible}/>
        </Row>
    );
}

export default AdminLayout;
