import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {isRequired, maxLength} from "../utils/validation";
import {Textarea} from "../common/FormsControls/FormsControls";
import {DialogType, MessageType} from '../../types/types';

interface IDialogs {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (message: string) => void
}

interface IData {
    message: string
}

const Dialogs: React.FC<IDialogs> = ({dialogs, messages, addMessage}) => {

    const addNewMessage = (data: IData) => {
        addMessage(data.message);
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

interface IPropsMessageForm {}
// нельзя замыкать эту функцию внутри нашей формы. иначе будет зацикливание. поэтому обязательно замыкаем ее здесь в переменную
const maxLengthCreator = maxLength(50);
const MessageForm: React.FC<InjectedFormProps<IData, IPropsMessageForm> & IPropsMessageForm> = (props) => {
    return <form className={s.new_message} onSubmit={props.handleSubmit}>
        <Field component={Textarea}
               placeholder='Message...'
               name='message'
               validate={[isRequired, maxLengthCreator]}
        />
        <button>Send</button>
    </form>
}

const MessageFormContainer = reduxForm<IData, IPropsMessageForm>({form: 'dialogs'})(MessageForm);

export default Dialogs;