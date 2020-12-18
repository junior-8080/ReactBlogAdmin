import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { authzation } from './auth';
import {Row,Col} from 'antd';
import Navs from './components/Navbar';



 export const  ProtectedRouter = ({component:Component,...rest}) => {
   
    return (
        <Route  {...rest} render={props => {
                const  isLogin = authzation();
                // console.log(props)
                if(isLogin){
                    return(
                        <>
                         <Row>
                            <Col span={4} style={{backgroundColor:'#001529'}}>
                                <Navs active={props.location.pathname}/>
                            </Col>
                            <Col span={20}
                               className="content">
                                   <Component {...props} />
                            </Col>
                         </Row>
                          
                        </>
                    )
                }else{
                   return(<Redirect 
                        to={{
                            pathname:"/",
                            state:{
                                from:props.location.pathname
                            }
                        }}
                     />
                   )
                }
        }} />
    );
}

