import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Profile from "./components/Profile/Profile";
import {Route} from 'react-router-dom';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = (props) => {
    return (
        <div className='container'>
            <Header/>
            <Aside state={props.state.aside}/>
            <main className='main'>
                <Route path='/dialogs'
                       render={() => <DialogsContainer store={props.store} />}
                />
                <Route path='/profile'
                       render={() => <Profile  store={props.store} />}
                />
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </main>
        </div>
    );
}

export default App;
