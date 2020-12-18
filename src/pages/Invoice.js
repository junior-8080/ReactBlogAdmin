import React,{useState,useEffect} from 'react';
import InvoiceTable from '../components/InvoiceTable';


const Invoice = (props) => {
    
    const [result, setResult] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [page,setPage]= useState(1); 
    const [total,setTotal] = useState(0);
    const [chunck,setChunck] = useState(0);
    // console.log(props.location)
    if(props.location.pathname !== '/'){
        localStorage.setItem('prevPath',props.location.pathname);
    }

    useEffect(() => {

        const url = `/invoice?offset=${page -1}`;
        setLoading(true)
        fetch(url)
        .then(res =>  res.json())
        .then(response => {
            setResult(response.data);
            setTotal(response.meta.data_length);
            setChunck(response.meta.pageSize)
            setLoading(false)
        })
    },[page])

    const onChange = (values) => {
        setLoading(true)
        setPage(values)
    }

    const handlePaid = (value) => {
        console.log(value)
    }
    
    const handleDelete = (key) => {

        const data = [...result];
        setResult(data.filter((record) => record.reference !== key))
    }


    return (
        <div  className="invoice-table">
           <InvoiceTable
             dataSource={result}
             isLoading={isLoading}
             currentPage={page}
             total={total}
             getValues={onChange}
             chunck={chunck}
             handlePaid={handlePaid}
             handleDelete={handleDelete}
              />:
        </div>
    );
}

export default Invoice;
