import React,{useState} from 'react';
import { Form, Input,Row, Col } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import '../App.css';

const Custom = ({formLayout}) => {

  const [addIconCount, setaddIconCount] = useState(0);
  

return ( 
      <Form.List name="custom_field" >
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field,index) => (
                <Form.Item key={field.key}  style={{display:'flex'}}  label={index === 0 ?'Custom Field':" "} {...formLayout} colon={field.colon || false} >
                     <Row gutter={4}>
                       <Col span={11}>
                        <Form.Item
                            {...field}
                            name={[field.name, 'label']}
                            fieldKey={[field.fieldKey, 'label']}
                            colon={field.colon || false}
                             noStyle
                        >
                            <Input placeholder="Label" />
                        </Form.Item>
                        </Col>
                        <Col span={11}>
                        <Form.Item
                            {...field}
                            name={[field.name, 'Value']}
                            fieldKey={[field.fieldKey, 'value']}
                            noStyle
                    
                        >
                            <Input placeholder="value" />
                      </Form.Item>  
                      </Col>
                      <Col style={{display:'flex',alignItems:'center'}}>                   
                   { index > 0 ? <MinusCircleOutlined
                        onClick={() => {
                          setaddIconCount(addIconCount -1)
                        remove(field.name);
                        }}
                    /> : null}
                    </Col>
                    <Col style={{display:'flex',alignItems:'center'}}>
                  {index >= addIconCount ? <PlusCircleOutlined onClick={() => {
                    setaddIconCount(addIconCount + 1)
                    add();
                  }} />: null}
                  </Col>
                  </Row>
                </Form.Item>
              ))}
            </>
          );
        }}
      </Form.List>
  );
};

export default Custom;