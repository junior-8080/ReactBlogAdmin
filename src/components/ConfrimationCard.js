import React from 'react';

const ConfrimationCard = ({icon,color,status,reason}) => {
    return (
        <div style= {{color:color,fontSize:14}}>
            <h2 style={{color:color}}>{status}</h2>
            {icon}
        <p>{reason}</p>
    </div>
    );
}

export default ConfrimationCard;
