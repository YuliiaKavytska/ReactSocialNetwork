import React from 'react';
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState();

    let addNewMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }

    let changeMessageText = (text) => {
        props.store.dispatch(updateMessageActionCreator(text))
    }

    return (
        <Dialogs  addMessage={addNewMessage}
                  changeMessageText={changeMessageText}
                  dialogs={state.dialogsPage.dialogs}
                  messages={state.dialogsPage.messages}
                  newMessageText={state.dialogsPage.newMessageText}
        />
    );
};

export default DialogsContainer;