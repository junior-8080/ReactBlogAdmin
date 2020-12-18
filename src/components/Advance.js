import React,{useState} from 'react';
import { Form, Input,Select,DatePicker, Col,Row,Button } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../App.css';

const Custom = ({onFinish,handleSuffix}) => {

  const [addIconCount, setaddIconCount] = useState(0);
  const{Option} = Select;
  const {RangePicker} = DatePicker;
  const [to, setTo] = useState({});

  const handleTo = (value,allvalues) => {
        const see = allvalues.custom_field.filter(field => typeof field === 'object')
        if((see.length > 0)){
          if((see[0].what_to === "signup_date" || see[0].what_to === "form_creation_date" ) && (see[0].value)){
                  delete see[0].value
          }
        }
        const index = allvalues.custom_field.findIndex(x =>x.what_to === see[0].what_to);
        allvalues[index] = see[0]
        console.log(see[0])
        setTo(allvalues);
    }

return ( 
  <Form initialValues={{ custom_field: [""] }} onValuesChange={handleTo}  onFinish={onFinish} > 
  
      <Form.List name="custom_field" style={{fontSize:12}} >
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field,index) => {
                let too = ((to.custom_field || [])[field.key] || {}).what_to || '';
                
                
                return (

                  <Form.Item key={field.key} style={{ display: 'flex', marginBottom: 2 }} align="baseline">
                    <Row gutter={4}>
                      <Col span={10}>
                        <Form.Item
                            {...field}
                            name={[field.name, 'what_to']}
                            fieldKey={[field.fieldKey, 'what_to']}
                            rules={[{ required: true, message: 'Required' }]}
                            noStyle
                            // style={{style}}
                  
                        >
                             <Select placeholder="Field">
                                <Option value="organization_name">Organization name</Option>
                                <Option value="u_name">User Name</Option>
                                <Option value="signup_country">
                                    Country
                                </Option>
                                <Option value="signup_date">Sign Up Date</Option>
                                <Option value="form_creation_date">Form Creation Date</Option>
                                <Option value="expiry_date">Expiry Date</Option>
                                </Select>
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                            {...field}
                            name={[field.name, 'value']}
                            fieldKey={[field.fieldKey, 'value']}
                            rules={[{ required: true, message: 'Required'}]}
                            noStyle
                        >
                          {['signup_date', 'form_creation_date', 'expiry_date'].includes(too) ?
                          <RangePicker /> : <Input  />}
                      </Form.Item> 
                      </Col>  
                    <Col style={{display:"flex",alignItems:"center"}}>
                   { index > 0 ? <MinusCircleOutlined
                        onClick={() => {
                          setaddIconCount(addIconCount -1)
                        remove(field.name);
                        }}
                    /> : null}
                  {index >= addIconCount ? <PlusCircleOutlined onClick={() => {
                    setaddIconCount(addIconCount + 1)
                    add();
                  }}
                  style={{marginLeft:5}}
                   />: null}
                   </Col>
                </Row>
              </Form.Item >
                );
              })}
            </>
          );
        }}
      </Form.List>
      <Form.Item style={{fontSize:12,marginBottom:0}}>
              <Button htmlType="submit" size="small"  type="primary" style={{fontSize:12,marginTop:"30px",marginRight:10}}>Submit</Button>
             <span  style={{marginTop:"10px",color:"#1890ff",cursor:"pointer"}} onClick={handleSuffix}>Cancel</span>
      </Form.Item>
    </Form>
  );
};

export default Custom;