import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import './index.css';
import {Provider} from "react-redux";

// let createEntirePage = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <App store={store}/>
                </Provider>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
// }

//createEntirePage();

// store.subscribe(() => {
//     createEntirePage();
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
