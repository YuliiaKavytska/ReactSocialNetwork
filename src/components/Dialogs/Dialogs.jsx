import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let {dialogs, messages} = props.state;
    let inputMessage = React.createRef();

    let addNewMessage = (e) => {
        props.sendMessage();
    }

    let changeMessageText = (e) => {
        let messageText = inputMessage.current.value;
        props.updateMessageText(messageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogs.map((item) => (
                    <DialogItem key={item.name + item.id} name={item.name} id={item.id} />
                ))}
            </div>
            <div className={s.messages_block}>
                <div className={s.messages}>
                    {messages.map((item) => (
                        <Message key={item.id + item.message} message={item} />
                    ))}
                </div>
                <div className={s.new_message}>
                    <textarea
                        ref={inputMessage}
                        placeholder='Type some text'
                        value={props.state.newMessageText}
                        onChange={changeMessageText}
                    />
                    <button onClick={addNewMessage}>Add New</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;