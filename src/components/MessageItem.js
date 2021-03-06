import React from 'react';
import './MessageItem.css';



export default ({data, user}) => { //Componente recebe o data do MessageItem do ChatWindow
                             //Recebe o item os dados da página ChatWindow.js na div messageText
    return (
        <div className="messageLine"
            style={{
                justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'
            }}
        >
            <div
             className="messageItem"
               style={{backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFF'}} 
            > 
                <div className="messageText">{data.body}</div> 
                <div className="messageDate">22:00</div>
            </div>
        </div>
    );
}