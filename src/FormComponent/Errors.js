import React from 'react';

const Errors = ({errors}) => {
    
    return (
      <>
        <h3 style={{color:"red",textAlign:"center"}}>ValidationErrors</h3>
       <table style={{color:"red",borderCollapse: "separate",borderSpacing:20}}>
         <thead>
          <tr>
              <td>Error Message</td>
              <td>Affected Object</td>
          </tr>
         </thead>
         <tbody>
            {
              errors.map(error => (
               <tr>
                <td>{error.message}</td>
                <td>{JSON.stringify(error.value)}</td>
             </tr>
              ))
            }
         </tbody>
       </table>
       </>
     )
}

export default Errors;
