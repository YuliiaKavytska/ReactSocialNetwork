import React from 'react'
import { MessageType } from '../../../types/types'
import s from './../Dialogs.module.css'

interface IProps {
    message: MessageType
}

const Message: React.FC<IProps> = ({message}) => {
    return (
        <div
            className={`${s.message} ${message.sender === 1 ? s.sender : s.recipient}`}>
            <p className={s.message_user_name}>{message.name}</p>
            <p>{message.message}</p>
        </div>
    )
}

export default Message