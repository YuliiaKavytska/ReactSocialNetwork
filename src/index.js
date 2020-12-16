import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {addNewPost, sendMessage, subscribe, updateMessageText, updateNewPostText} from './redux/state';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import './index.css';
// import {createEntirePage} from "./render";

let createEntirePage = (state) => {
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

createEntirePage(state);

subscribe(createEntirePage);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
