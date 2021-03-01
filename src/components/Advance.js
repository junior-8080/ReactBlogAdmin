import React,{useState} from 'react';
import { Form, Input,Select,DatePicker, Col,Row,Button, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import '../App.css';
import { Tooltip } from 'recharts';
// import { options } from '../../../api/src/routes/forms';


const cols = [
  {
    title:"Name",
    type:"text",
    value:"name",
  },
  {
    title:"DOB",
    type:"date",
    value:"date_of",
  },
  {
    title:"Age",
    type:"number",
    value:"age",
  },
]


const AdvanceItems = ({to}) => {

    if(to === "" || to === {}){
      return <Input />
    }

    const result = cols.find(obj => {
      return obj.value ===  to
    });
  

   if(result.type === "text" ){
     return <Input />
   }

   if(result.type === "number"){
     return <InputNumber />
   }
   if(result.type === "date"){
     return <DatePicker.RangePicker />
   }


}

const Custom = ({onFinish,handleSuffix,handleCancel}) => {

  const [addIconCount, setaddIconCount] = useState(0);
  const{Option} = Select;
  const {RangePicker} = DatePicker;
  const [to, setTo] = useState({});
  const [form] = Form.useForm();


  const handleTo = (value,allvalues) => {

        // console.log(value)
        const see = value.custom_field.filter(field => typeof field === 'object');
        // seType(see[0].what_to)
        const i = see.length - 1;
        if(value.length > 0){
          const index = allvalues.custom_field.findIndex(x => x.what_to === see[i].what_to);
          allvalues.custom_field[index] = see[i];
        }
       
        setTo(allvalues);

    }

   

    const onRest = () => {
        form.resetFields()
        setaddIconCount(0)
    }

    const options =   cols.map((item) => {
      return <Option value={item.value}>{item.title}</Option>
  })
 
 return ( 
  <Form initialValues={{ custom_field: [""]}} onValuesChange={handleTo}  onFinish={onFinish} form={form}  name="advance-form" style={{width:'25rem'}}> 
  
      <Form.List name="custom_field" style={{fontSize:12}} >
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field,index) => {
              
                let too = ((to.custom_field || [])[index] || {}).what_to || '';
  
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
                             {/* <Select placeholder="Field">
                                <Option value="organization_name">Organization name</Option>
                                <Option value="u_name">Full Name</Option>
                                <Option value="form_title">
                                    Form Title
                                </Option>
                                <Option value="signup_country">
                                    Country
                                </Option>
                                <Option value="signup_date">Sign Up Date</Option>
                                <Option value="form_creation_date">Form Creation Date</Option>
                                <Option value="expiry_date">Expiry Date</Option>
                                </Select> */}
                                <Select placeholder="Fields">
                                    {
                                      options
                                    }
                                </Select>
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                            {...field}
                            name={[field.value, 'value']}
                            fieldKey={[field.fieldKey, 'value']}
                            rules={[{ required: true, message: 'Required'}]}
                            noStyle
                        >
                          {/* {['signup_date', 'form_creation_date', 'expiry_date'].includes(too) ?
                          <RangePicker /> : <Input  />} */}

                          <AdvanceItems  to = {too} />
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
             <span  style={{marginTop:"10px",color:"#1890ff",cursor:"pointer"}} onClick={() => handleCancel()}>Cancel</span>
             <span  style={{marginTop:"10px",color:"#1890ff",cursor:"pointer",marginLeft:"5px"}} onClick={onRest}>Reset</span>
      </Form.Item>
    </Form>
  );
};

export default Custom;