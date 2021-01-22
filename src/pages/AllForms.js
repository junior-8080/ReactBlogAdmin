import React, {useEffect, useState} from 'react';
import TableRecords from '../components/TableRecords';
import {
    message,
    Button,
    Modal
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Advance from '../components/Advance';
import Filter from '../components/Filter';



const AllForms = () => {
  
    const [tableData, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [suffix,setSuffix] =  useState(false);
    const [page,setPage]  = useState(1);
    const [search,setSearch] = useState('');
    // const {Search} = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);


    const card_css = {
     display: "block",
     position:"absolute", 
     right: "1.3rem",
     padding:0,
     top:15

    //  transition:"0.3s all ease"
     };
    

    const onFinish = (values) => { 
        // console.log(values);
        handleSuffix();
        let query = '';
        
        values.custom_field.forEach((field) => {
            // console.log(field)
            query+= `${field.what_to}=${field.value}&`

        });

        // console.log(query)
        setSearch(query);
        setPage(1);
        // setShowForm(false);
        setIsModalVisible(!isModalVisible)
    }

    useEffect(() => {
        setLoading(true);
        const url = `/forms?` + search + `offset=${page === 1? 0:page -1}`;
        fetch(url).then((res) => res.json()).then((response) => {
            if(response.status === 200){
                setLoading(false);
            setData({
                 data:response.data,
                 total: response.meta.data_length,
                 chunck:response.meta.pageSize,
                 currentPage: page
            })
        }else {
            setLoading(false)
            message.error(response.message);

        }
            
           
        }).catch(function (error) {
            console.log(error);
            
        });

    }, [page,search]);

    const handleSuffix = () => {
        
        setSuffix(!suffix)
        setShowForm(!showForm)
        
    }

    const getPage = (value) => {
        
        setLoading(true)
        setPage(value)
    }

    const getFilter = (value) => {
        
         const query = value === 'all'?'' : `keyword=${value}&`;
         setSearch(query);
         setPage(1)
    }

    
      const handleCancel = () => {
        setIsModalVisible(false);
      };




//   const style2 = {display:'none',opacity:0}
    return (
   
        <div className="record-table">
            <div style={{width:"100%",display:"flex",justifyContent:"space-between",marginBottom:'5px'}}>
                <div></div>
                <div>
                    {/* <span>Filtered:{Filter}</span> */}
                    <Filter getFilter={getFilter} />
                    {/* <Search  disabled={true} suffix={suffix ?  <UpOutlined onClick={handleSuffix}  />: <DownOutlined onClick={handleSuffix} />} enterButton/> */}
                    <Button size="sm" onClick={() => {setIsModalVisible(!isModalVisible)}} icon={<SearchOutlined />}>Search</Button>
                </div>
                
            </div>
            
            <Modal  style ={card_css} visible={isModalVisible} footer={[]} closable={false} onCancel={handleCancel}> 
             <div>
                 <h4 style={{marginBottom:5}}>Search</h4>
                 <p style={{color:'#000',fontSize:10,margin:0}}>Select the fields you want the search to be refined according</p>
             </div>
                
                    <Advance  onFinish = {onFinish}handleSuffix={handleSuffix} handleCancel={handleCancel}   />

            </Modal> 

            <TableRecords 
                   tableData={tableData}
                   getPage = {getPage}
                   loading = {isLoading}
                />
        </div>
    );
}


export default AllForms;
