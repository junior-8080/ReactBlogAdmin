import React, {useEffect, useState} from 'react';
import TableRecords from '../components/TableRecords';
import {
    Input,
    Card
} from 'antd';
import {DownOutlined,UpOutlined} from '@ant-design/icons';
import Advance from '../components/Advance';
import Filter from '../components/Filter';



const AllForms = () => {
  
    const [tableData, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [suffix,setSuffix] =  useState(false);
    const [page,setPage]  = useState(1);
    const [search,setSearch] = useState('');
    const {Search} = Input;

    const card_css = {
     display: "block",
     marginBottom: "25px",
     position:"absolute", 
     zIndex: 1000, 
     width: "38.3% ",
    right: "1.3rem",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
    padding:0,
    transition:"0.3s all ease"
     };
    

    const onFinish = (values) => { 
        // console.log(values);
        handleSuffix();
        let query = '';
        values.custom_field.forEach((field) => {
            console.log(field)
           return query+= `${field.what_to}=${field.value}&`
        });

        console.log(query)
        setSearch(query);
        setPage(1);
        setShowForm(false);
    }

    useEffect(() => {
        setLoading(true);
        const url = `/forms?` + search + `offset=${page === 1? 0:page}`;
        fetch(url).then((res) => res.json()).then((response) => {
            setLoading(false);
            setData({
                 data:response.data,
                 total: response.meta.data_length,
                 chunck:response.meta.pageSize,
                 currentPage: page
            })
           
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




  const style2 = {display:'none',opacity:0}
    return (
   
        <div className="record-table">
            <div style={{width:"40%",marginLeft:"60%",display:"flex",justifyContent:'space-around',marginBottom:'5px'}}>

                <Filter getFilter={getFilter} />
                <Search  disabled={true} suffix={suffix ?  <UpOutlined onClick={handleSuffix}  />: <DownOutlined onClick={handleSuffix} />} enterButton/>
                
            </div>
            
            <Card style={showForm ? card_css : style2} className="slide_down"> 
             <div>
                 <h4 style={{marginBottom:5}}>More Search</h4>
                 <p style={{color:'#000',fontSize:10,margin:0}}>Select the fields you want the search to be refined according</p>
             </div>
                
                    <Advance  onFinish = {onFinish}handleSuffix={handleSuffix} />

            </Card> 

            <TableRecords 
                   tableData={tableData}
                   getPage = {getPage}
                   loading = {isLoading}
                />
        </div>
    );
}


export default AllForms;
