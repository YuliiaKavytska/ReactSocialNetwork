import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addNewPost, sendMessage, updateMessageText, updateNewPostText} from './redux/state';
import {BrowserRouter} from "react-router-dom";

export let createEntirePage = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App
                    state={state}
                    addNewPost={addNewPost}
                    updateNewPostText={updateNewPostText}
                    updateMessageText={updateMessageText}
                    sendMessage={sendMessage}
                />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
