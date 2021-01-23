import React from 'react';
import './App.css';
import Aside from "./components/Aside/Aside";
import {Route} from 'react-router-dom';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import SearchContainer from "./components/Search/SearchContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import LoginContainer from "./components/Login/LoginContainer";

const App = (props) => {
    return (
        <div className='container'>
            <HeaderContainer />
            <Aside store={props.store}/>
            <main className='main'>
                <Route path='/dialogs' render={() => <DialogsContainer />} />
                <Route path='/profile/:user_id?' render={() => <ProfileContainer />} />
                <Route path='/news' render={() => <News />} />
                <Route path='/music' render={() => <Music />} />
                <Route path='/settings' render={() => <Settings />} />
                <Route path='/search' render={() => <SearchContainer />} />
                <Route path='/login' render={() => <LoginContainer />} />
            </main>
        </div>
    );
}

// const ibg = () => {
//     document.querySelectorAll('.ibg').forEach(function (elem){
//         if (elem.querySelector('img')) {
//             elem.style.backgroundImage =
//                 'url(' + elem.querySelector('img').getAttribute('src') + ')';
//         }
//     });
// }
//
// ibg();


export default App;
