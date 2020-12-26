import React from 'react';
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let
                    state = store.getState();

                let addNewMessage = () => {
                    store.dispatch(addMessageActionCreator());
                }

                let changeMessageText = (text) => {
                    store.dispatch(updateMessageActionCreator(text))
                }

                return (
                    <Dialogs addMessage={addNewMessage}
                             changeMessageText={changeMessageText}
                             dialogs={state.dialogsPage.dialogs}
                             messages={state.dialogsPage.messages}
                             newMessageText={state.dialogsPage.newMessageText}
                    />
                )
            }
            }
        </StoreContext.Consumer>

    );
};

export default DialogsContainer;