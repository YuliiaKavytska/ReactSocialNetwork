import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from 'react-router-dom';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";

const App = (props) => {
    return (
        <div className='container'>
            <Header/>
            <Aside state={props.state.aside}/>
            <main className='main'>
                <Route path='/dialogs'
                       render={() => <Dialogs
                           state={props.state.dialogsPage}
                           updateMessageText={props.updateMessageText}
                           sendMessage={props.sendMessage}
                       />}

                />
                <Route path='/profile'
                       render={() => <Profile
                           state={props.state.profilePage}
                           addNewPost={props.addNewPost}
                           updateNewPostText={props.updateNewPostText}/>}
                />
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </main>
        </div>
    );
}

export default App;