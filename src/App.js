import React from 'react';
import Main from './pages/Main';
import { Switch,Route} from 'react-router-dom';
import AllForms from './pages/AllForms';
import NewUser from './components/NewUser';
import Payment from './pages/Payment';
import InvoiceForm from './components/InvoiceForm';
import Invoice from './pages/Invoice';
import Signin from './pages/Siginin'
import { ProtectedRouter } from './ProtectedRouter';
import PreventLogout  from './PreventLogout';
import 'antd/dist/antd.css';
import './App.css'
import ConfirmPayment from './pages/ConfirmPayment';




const App = () => {

     return (
             <Switch>
                 <PreventLogout path="/" exact component={Signin} />
                <ProtectedRouter path="/overview" 
                  component={Main}/>
                <ProtectedRouter path="/forms" exact
                  component={AllForms}/>
                <ProtectedRouter path="/new_user" component={NewUser} />
                <ProtectedRouter path="/payment" exact
                 component={Payment} />
                <ProtectedRouter path="/payment/invoice" 
                 component={InvoiceForm} />
                <ProtectedRouter path="/payment/invoices" 
                 component={Invoice} />
                  <Route path="/payment/verification" component={ConfirmPayment} />
                 <Route path="*" render ={() => {
                     return(
                         <h1 style={{textAlign:"center"}}>404 Page Not Found</h1>
                     )
                 }}  />
                
            </Switch>
        );
}


    
   


export default App;
