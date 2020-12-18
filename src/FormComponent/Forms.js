import React, { useState ,useEffect} from 'react';
import LookUp from './LookUp';
import {Form,Button} from 'antd';
import {validateFields} from './validations';
import Errors from './Errors';

import 'antd/dist/antd.css';



 
const Forms = (props) => {
 
  const [isValid, setIsValid] = useState([]);
  const [image,setImage] = useState("");

  const getInitialValues =  function() {
    return new Promise((resolve,reject) => {
      const initialValueObject = {};
      props.fields.forEach(field => {   
        if(field.type === 'button' ){
            return 
        }
        if(field.type === 'form-group'){
          return  field.fields.forEach((keyword) => {
            if(keyword.value){
              return initialValueObject[keyword.name] = keyword.value;
            }
            return initialValueObject[field.name] = "";
          })
        }
        if(field.type === 'custom'){
          return initialValueObject.custom_field = ['']
        } 
        if(field.type === "image"){
          if(field.value){
            setImage(field.value)
          }
          return
        }
         if(field.value){
            return initialValueObject[field.name] = field.value;
         }
        return initialValueObject[field.name] = "";
         
    })
     resolve(initialValueObject)
      
    })     
     
}
    

  
  const getImage = (image) => {
     setImage(image);
  }

    const [form] = Form.useForm();


    const onFinish = (values) => {
        if(image){
            console.log(image)
            values.file = image;
        }

        props.onSubmit(values)
    }

    const formLayout = {
         labelCol:{
           span:props.formLayout.labelSpan || 6
         }
         ,wrapperCol:{
           span:props.formLayout.inputSpan || 18
         }
    }

    const tailLayout = {
        wrapperCol: { offset:props.formLayout.labelSpan + props.formLayout.inputSpan || 6, span: props.formLayout.inputSpan || 24 },
    }
 
    const profileLayout = {
        wrapperCol: { offset:props.formLayout.labelSpan || 6, span: 8 },
    }

    // Retrives the names from the array-of-object to generate an inital state for all inputs.
    
    useEffect(()=> {
      validateFields(props.fields,props.formLayout).then(result => null).catch(err => setIsValid(err));
      getInitialValues().then(result => { form.setFieldsValue(result) })

    },[props.fields,props.formLayout]);//eslint-disable-line


return(
     <>
         {isValid.length > 0 ? <Errors  errors={isValid} /> : <Form  onFinish ={onFinish}  {...formLayout} name={props.name}  layout={props.layout || 'horizontal'}
         className={props.className} 
         form={form}>
              <> 
              { props.fields
                    .map((field,index) => (<LookUp field={field}  id={index} 
                      getImage={getImage} formLayout ={formLayout} 
                      key={index} tailLayout={tailLayout} 
                      profileLayout={profileLayout}/>)
                    )}
                        <Form.Item {...tailLayout} className="btn-align">
                         {props.showCancelBtn ? <Button onClick={props.handleChange}>{props.btnLabel || "Cancel"}</Button> : " "}
                          <Button htmlType='submit' type='primary' style={{margin:'0px 8px'}} size={props.btnSize || 'middle'}>{props.btnLabel || "Save"}</Button>
                        </Form.Item>
                    </>
          </Form>}
      </>
  
)} 


export default Forms;
