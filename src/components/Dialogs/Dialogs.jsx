import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {isRequired, maxLength} from "../utils/validation";
import {Textarea} from "../common/FormsControls/FormsControls";

const Dialogs = (props) => {

    let {dialogs, messages} = props;

    const addNewMessage = (data) => {
        props.addMessage(data.message);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogs.map((item) => (
                    <DialogItem key={item.name + item.id} name={item.name} id={item.id}/>
                ))}
            </div>
            <div className={s.messages_block}>
                <div className={s.messages_container}>
                    <div className={s.messages}>
                        {messages.map((item) => (
                            <Message key={item.id + item.message} message={item}/>
                        ))}
                    </div>
                </div>
                <MessageFormContainer onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

const maxLengthCreator = maxLength(50);

const MessageForm = (props) => {
    return <form className={s.new_message} onSubmit={props.handleSubmit}>
        <Field component={Textarea}
               placeholder='Message...'
               name='message'
               validate={[isRequired, maxLengthCreator]}
        />
        <button>Send</button>
    </form>
}

const MessageFormContainer = reduxForm({form: 'dialogs'})(MessageForm);

export default Dialogs;