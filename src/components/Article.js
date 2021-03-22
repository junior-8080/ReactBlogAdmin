import React,{ useEffect } from 'react'
import {Row,Col,message} from 'antd';
import AdminLayout from './AdminLayout'
import PostForm from './PostForm';
import { useState } from 'react';





const Article = ({id}) => {

    const [article,setArticle] = useState('')
    const [loading,isLoading] = useState(false)


    useEffect(() => {
        isLoading(true)
        fetch(`/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.statusCode === 200 && data.message === 'SUCCESS'){
                // console.log(data.data)
                setArticle(data.data)
                isLoading(false)
            }else{
                message.info(data.data.message)
                isLoading(false)
            }
            // console.log(data)
        })
     },[id])

    return (
        <AdminLayout>
           {loading ? <Col span={16} className="loading"><p>Loading...</p></Col> : <Col span ={16}>
              <PostForm  article = {article} postId = {article._id} />
            </Col>}
            <Col span={4} className="adminRigth">
                <div className="accountDetails">
                    <div>
                    <h3>Article Details</h3>
                    {/* <hr /> */}
                    <div>
                        <p>Title :</p>
                        <p>{article.title}</p>
                    </div>
                    <div>
                        <p>Date Created :</p>
                        <p>{article.dateCreated}</p>
                    </div>
                    <div>
                        <p>Status :</p>
                        <p>{article.status}</p>
                    </div>
                </div>
                </div>
            </Col>
        </AdminLayout>
    );
}



export default Article;
