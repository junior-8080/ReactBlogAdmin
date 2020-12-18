import React from 'react';
import {Card, Spin} from 'antd';
import {numberWithCommas} from '../utils';
const {Meta} = Card;

const Total = ({total,backgroundColor,color,avatar,title}) => {

    const style = {
        textAlign: "center",
        fontWeight: 600,
        color: color,
    }

    const card_style = {
        width: "100%",
        height: 100,
        backgroundColor: backgroundColor
    }

    return (
        <Card style={
                card_style
            }
           >
                  <Meta
            avatar={
              avatar
            }
            title={title}
        
          />

            {
            total ? <h1 style= {style}>
                {
                numberWithCommas(total)
            }</h1> : <Spin size="sm" color="#ffffff"/>}
         </Card>
    );
}

export default Total;
