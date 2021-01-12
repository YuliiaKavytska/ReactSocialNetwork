import React from 'react';
import {
    addMessage,
    updateMessage,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

// Оно сразу вызывает store.getState() и в результате у нас здесь просто стейт
const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

//callbacks
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: () => {
//             dispatch(addMessageActionCreator());
//         },
//         changeMessageText: (text) => {
//             dispatch(updateMessageActionCreator(text))
//         }
//     }
// }

let DispatchToProps = {
    addMessage,
    updateMessage
};

const DialogsContainer = connect(mapStateToProps, DispatchToProps)(Dialogs);

export default DialogsContainer;