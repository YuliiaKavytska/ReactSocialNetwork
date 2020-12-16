import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div
            className={`${s.message} ${props.message.sender === 1 ? s.sender : s.recipient}`}>
            <p className={s.message_user_name}>{props.message.name}</p>
            <p>{props.message.message}</p>
        </div>
    );
}

export default Message;