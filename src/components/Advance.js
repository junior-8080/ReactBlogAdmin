import React,{useState} from 'react';
import { Form, Input,Select,DatePicker, Col,Row,Button,InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import '../App.css';






const AdvanceItems = ({to,cols}) => {

  
  const result = cols.find(obj => {
    return obj.value ===  to
  });

  if(to === "" || to === {}){
    return <Input />
  }

 if(result.type === "text" ){
   return <Input />
 }

 if(result.type === "number"){
   return <InputNumber />
 }
 if(result.type === "date"){
   return <DatePicker.RangePicker />
 }

  return <Input />

}





const Custom = ({onFinish,handleSuffix,handleCancel,cols}) => {

  const [addIconCount, setaddIconCount] = useState(0);
  const{Option} = Select;
  const [to, setTo] = useState({});
  const [form] = Form.useForm();
  

  const handleTo = (value,allvalues) => {
        const see = value.custom_field.filter(field => typeof field === 'object');
        const i = see.length - 1;
        if(value.length > 0){
          const index = allvalues.custom_field.findIndex(x => x.what_to === see[i].what_to);
          allvalues.custom_field[index] = see[i];
        }

        console.log(allvalues)
        console.log(value)
        setTo(allvalues);

    }

    const onRest = () => {
        form.resetFields()
        setaddIconCount(0)
    }
 
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
                             <Select placeholder="Field">
                                  {
                                    cols.map(item => {
                                      return <Option value={item.value} key={item.value}>{item.title}</Option>
                                    })
                                  }
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
                            shouldUpdate ={true}
                        >
                           <Input />
                           <AdvanceItems to ={too} cols={cols}  />

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