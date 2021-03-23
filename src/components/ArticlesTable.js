import React,{useEffect,useState} from 'react'
import {Col, Table,Collapse, message} from 'antd'
import {Link }from 'react-router-dom'
import AdminLayout from './AdminLayout'

const ArticlesTable= () => {

    const [profile, setprofile] = useState(null);
    const [articles,setArticles] = useState(null)
    const [loading,isLoading]  = useState(false)


    useEffect(() => {
        
        fetch('/posts')
        .then(res => res.json())
        .then(data => {
            
            if(data.statusCode === 200 && data.message === 'SUCCESS'){
                setArticles(data.data)
                isLoading(false)
                setprofile(JSON.parse(localStorage.getItem('profile')))
            }else{
                message.info(data.data.message)
                isLoading(false)
            }
        })
       
    },[]);

    const genExtra = (id) => (
          <Link  to={`/articles/${id}`} className="view">View</Link>
        
      );

    const columns = [
            {
             title:"",
             dataIndex:'title', 
             key:'title',
             render:(value,row) => {
                if(row.title){
                   return (
                       <Collapse>
                         <Collapse.Panel header={row.title} key={row._id}  extra = {genExtra(row._id)} >
                             <p>{row.description}</p>
                         </Collapse.Panel>
                       </Collapse>
                   )
                }

                return null
            }
           

            }
    ]
    
    
    return (
        <AdminLayout>
            <Col span ={16}>
               <h1>Articles</h1>
               <Table 
               dataSource={articles}
               columns = {columns}
               pagination = {{
                // total:articles.length,
                defaultPageSize:4
               }}
               loading = {loading}
               />
            </Col>
            <Col span={4} className="adminRigth">
            {profile ? <div className ="accountDetails">
                 <h3>Account</h3>
                 <div className="accountDetails">
                    <div>
                        <p>Name: </p>
                        <p>{profile.name}</p>
                    </div>
                    <div>
                        <p>Email: </p>
                        <p>{profile.email}</p>
                    </div>
                </div>
                </div> : <p>Loading....</p>}
            </Col>
        </AdminLayout>
    );
}
  

export default ArticlesTable;
