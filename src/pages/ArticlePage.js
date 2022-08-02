import React from 'react'
import Article from '../components/Article'


const ArticlePage = (props) => { 
    const id = props.match.params.id
    return (
      <Article  id = {id}/>
      
    );
}




export default ArticlePage;
