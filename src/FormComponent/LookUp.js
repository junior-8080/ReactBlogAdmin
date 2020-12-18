import React ,{useState,useEffect} from 'react';
import {Form,Input,InputNumber,Select,DatePicker, Button, Modal,Checkbox,Row,Col,Upload,Radio,} from 'antd';
import {DeleteOutlined,PlusOutlined,EyeOutlined} from '@ant-design/icons'
import Custom from './Custom';
// import '../App.css';
import Avatar from 'antd/lib/avatar/avatar';

const {Option} = Select;

function getBase64(img, callback) {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


const LookUp = ({field,getImage,tailLayout}) => {
    
    const [file, setfile] = useState(undefined);
    const style1 = {color:"grey",fontSize:10,cursor:'pointer',marginLeft:5};
    

    const handleChange = (fileData) => {
        getBase64(fileData.file,(result) => {
             setfile(result);
             getImage(fileData.file);
        })
    }

    const beforeUpload = () => { 
        return false;
    }

    const [previewVisible, setpreviewVisible] = useState(false);
    const handleCancel = () => setpreviewVisible(false);

    const uploadButton = (

        <>
            <div>
                 <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
         
        </>
      
      )
      useEffect(()=> {
        if (field.type === 'image') {
            setfile(field.value);
        }
      },[field.type,field,field.value]);

    return (
        <>

        {
            field.type === "hidden" && <Form.Item>
                <Input hidden={true} name={field.name} />
            </Form.Item>
        }
        {   
            
            field.type === "text" && <Form.Item
            shouldUpdate={true}
            label={field.label} 
            // initialValue={field.value}
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            rules={[{required:field.required,message:field.requiredError},{min:field.min,message:field.minError}]}
            colon={field.colon || false}
            key={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 

            >
                <Input  placeholder={field.placeholder} disabled={false || field.disabled}/>
            </Form.Item>
        }
         {
            field.type === "email" && <Form.Item 
            label={field.label}
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')}
            rules={[{required:field.required,message:field.requiredError},{type:'email',message:field.isEmailError}]}
            colon={field.colon || false}
            key={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            shouldUpdate={true}
            >
                <Input type={field.type} placeholder={field.placeholder} />
            </Form.Item>
        }
        {
            field.type === "number" && <Form.Item 
            label={field.label} 
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            rules={[{required:field.required,message:field.requiredError}]}
            colon={field.colon || false}
            key={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            // initialValue={field.value}
            >
                <InputNumber placeholder={field.placeholder} />
            </Form.Item> 
        }
        {
            field.type === "option" && <Form.Item 
            label={field.label} 
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            rules={[{required:field.required,message:field.requiredError}]}
            colon={field.colon || false}
            key={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            >
                <Select placeholder="Select a option and change input text above" disabled={false || field.disabled} showSearch> 
                 {field.keywords.map((word) => 
                   (<Option key={typeof word === "string" ? word:word.keyword} value={typeof word === "string" ? word:word.keyword}>
                    {typeof word === "string"?word:word.label}
                  </Option>))}
                </Select>
            </Form.Item>
        }
        {
            
            field.type === 'date' && <Form.Item 
            label={field.label} 
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')}
            rules={[{required:field.required,message:field.requiredError}]}
            colon={field.colon || false}
            key={field.label|| field.name}
            
            >
                <DatePicker  placeholder={field.placeholder} />
            </Form.Item>
        }
        {
            field.type === 'password' &&<Form.Item 
             label={field.label}
             name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')}
             rules={[{ required: field.required, message: field.requiredError }]}
             colon={field.colon || false}
             key={field.label|| field.name}
            //  initialValue={field.value}
               >
                   <Input.Password placeholder={field.placeholder} />
                </Form.Item> 
        }
        {
            field.type === 'check-box' &&  <Form.Item
            label={field.label}
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')}
            style={field.style}
            colon={field.colon || false}
            key={field.label|| field.name}
            // initialValue={field.value}
         >
            <Checkbox.Group>
                <Row>
                    {
                       field.keywords.map((keyword,index) => {
                        return (<Col key={index
                        }><Checkbox value={keyword} >{keyword}</Checkbox></Col>)
                     })   
                    }
                </Row>
            </Checkbox.Group>
         </Form.Item>
        }
        {
            field.type === 'text-area' && <Form.Item
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')}
            style={field.style}
            rules={[{required:field.required,message:field.requiredError}]}
            label={field.label}
            colon ={field.colon || false}
            key={field.label|| field.name}

            >
                <Input.TextArea placeholder={field.placeholder}rows={6} ></Input.TextArea>
            </Form.Item>
        }
        { 
            field.type === 'image' &&
               <Form.Item
               {...tailLayout}
            
           >
              
            <Upload
               onChange={handleChange}
               showUploadList={false}
               listType={!file ?'picture-card' : null}
               beforeUpload={beforeUpload}
               className="avatar-uploader"
               colon={field.colon || false}
                
            > 
               {file ? <Avatar src={file}  size={80} style={{marginBottom:0}}/> : uploadButton}

           </Upload>
           {file ?<div><span style={style1} onClick={()=> {setpreviewVisible(true)}}><EyeOutlined />{' '}{'View'}</span><span style={style1} onClick={()=>{setfile(undefined)}}><DeleteOutlined />{' '}{'Remove'}</span></div>: null}
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={file} />
             </Modal>

         </Form.Item>
        }
        {
            field.type === 'form-group' && <Form.Item label={field.label} 
             colon={field.colon || false}
             key={field.label|| field.name}
             shouldUpdate={true}
             >
                <Row gutter={4}>
                  {field.fields.map(item => (
                    <Col span={24/field.fields.lenght} key={item.name}>
                     <Form.Item name={item.name ||item.label.toLowerCase().replace(/\s+/g,'_')}>
                        <Input placeholder={item.placeholder}  />
                     </Form.Item>
                  </Col>
                  ))
                    }
                </Row>
            </Form.Item>
        }
        {
            field.type === 'button' &&<Form.Item key={field.label|| field.name} {...tailLayout}  className="align-btn" initialValue={field.value}> 
            <Button htmlType={field.name || 'submit'} type={field.styleType || 'primary'} >{field.label} 
            </Button></Form.Item>
        }
        {
            !field.type  && field.label && <Form.Item
            label={field.label} 
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')} 
            rules={[{required:field.required,message:field.requiredError},{min:field.min,message:field.minError}]}
            colon={field.colon || false}
            key={field.label|| field.name}
            initialValue={field.value}
            >
                <Input  placeholder={field.placeholder} />
            </Form.Item>
        }{
            field.type === 'custom' && <Custom form/>
        }
        {
            field.type === 'radio' && <Form.Item 
            label={field.label}
            name={field.name || field.label.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,'_')}
            colon={field.colon || false}
            key={field.label|| field.name}
            // initialValue={field.value}
            >
                <Radio.Group>
                    {
                        field.keywords.map((keyword,index)=> {
                            return<Radio key={keyword} value={keyword.toLowerCase()}>{keyword}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        }
        {
          field.type === 'hidden' &&  <Form.Item name={field.name} style={{display:"none"}}>
                <Input   />
            </Form.Item>
        }
        </>
    )
}

export default LookUp;
