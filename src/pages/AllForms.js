import React, {useEffect, useState} from 'react';
import TableRecords from '../components/TableRecords';
import {
    message,
    Popover,
    Button,
    Input
} from 'antd';
import {DownOutlined,UpOutlined,SyncOutlined} from '@ant-design/icons';
import Advance from '../components/Advance';
import Filter from '../components/Filter';


const cols = [
    {
        title:"Organization Name",
        type:"text",
        value:"organization_name"
    },
    {
        title:"Full Name",
        type:"text",
        value:"u_name"

    },
    {
        title:"Form Title",
        type:"text",
        value:"form_title"

    },
    {
        title:"SignUp Country",
        type:"text",
        value:"signup_country"

    },
    {
        title:"SignUp Date",
        type:"date",
        value:"signup_date"

    },
    {
        title:"Form Creation Date",
        type:"date",
        value:"form_creation_date"
    },
    {
        title:"Expiry Date",
        type:"date",
        value:"expiry date"
    }
]


const {Search} = Input;


const AllForms = () => {
  
    const [tableData, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [suffixUp,setSuffixUp] =  useState(false);
    const [page,setPage]  = useState(1);
    const [search,setSearch] = useState('');
    const [searchValue,setAllSearch] = useState('');
    
    const [isModalVisible, setIsModalVisible] = useState(false);
   


    const onFinish = (values) => { 
        handleSuffix();
        let query = '';
        
        values.custom_field.forEach((field) => {
            query+= `${field.what_to}=${field.value}&`

        });
        setSearch(query);
        setPage(1);
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
        setSuffixUp(!suffixUp)
        setIsModalVisible(!isModalVisible);

    }

    const getPage = (value) => {
        
        setLoading(true)
        setPage(value)
    }

    const getFilter = (value) => {

        let query = '';
        if(value === 'all'){
           setSearch(query);
           setAllSearch('');
        }else{
            query =  `keyword=${value}&`;
            setSearch(query);
            setPage(1);

        } 
    }

    
      const handleCancel = () => {
        setIsModalVisible(false);
        handleSuffix();
      };

     const handleSearch = (value) => {
        if(value){
            setSearch(`search=${value}&`)
            
        }else {
            setSearch('');
            
        }
        setPage(1)
      }

      const content = ()  => {

           return (
               <>
                 <div>
                    {/* <h4 style={{marginBottom:5}}  >Search</h4> */}
                    <p style={{color:'#000',fontSize:10,margin:0}}>Select the fields you want the search to be refined according</p>
                </div>
                <Advance  onFinish = {onFinish} handleSuffix={handleSuffix} handleCancel={handleCancel}  cols={cols} />
              </>
           )
      }


     

    return (
   
        <div className="record-table">
            <div style={{width:"100%",display:"flex",justifyContent:"space-between",marginBottom:'5px'}}>
                <div></div>
                <div style={{display:"flex"}}>
               
                    <Button onClick={() => getFilter('all')} icon={<SyncOutlined  />} size="middle" style={{fontSize:'small'}}>Refresh</Button>
                    <Popover
                            content={content}
                            title="Advance Search"
                            trigger="click"
                            visible={isModalVisible}
                            onVisibleChange={() => handleSuffix()}
                            placement="bottom"
                           
                           
                        >
                            <div style={{padding:"10px",visibility:"hidden"}}></div>
                    </Popover>
                    <Search suffix= {suffixUp ?<UpOutlined    onClick ={handleSuffix} size="small"/> : <DownOutlined   onClick ={handleSuffix}size="small" /> } 
                         style={{marginRight:'1em'}}
                         onSearch = {handleSearch} size="small" value={searchValue}  onChange= {(event) =>{ searchValue !== event.target.value && setAllSearch(event.target.value)}} />
              
                <Filter getFilter={getFilter}  />
            </div>
    
            </div>
              
             <TableRecords 
                   tableData={tableData}
                   getPage = {getPage}
                   loading = {isLoading}
                />
        </div>
    );
}


export default AllForms;
