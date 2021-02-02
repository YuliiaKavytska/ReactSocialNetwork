import React from 'react';
import './App.css';
import AsideContainer from "./components/Aside/AsideContainer";
import {BrowserRouter, Route} from 'react-router-dom';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import SearchContainer from "./components/Search/SearchContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import LazyLoading from "./components/hoc/withLazyLoading";
import {Redirect} from "react-router";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        return (
            <div className='container'>
                <HeaderContainer/>
                <AsideContainer/>
                <main className='main'>
                    {!this.props.initialized ? <Preloader/> : <>
                        <Route path={'/'} exact >
                            {this.props.initialized
                                ? <Redirect to={'/profile'} />
                                : <Redirect to={'/login'} />}
                        </Route>
                        <Route path='/dialogs' render={LazyLoading(DialogsContainer)}/>
                        <Route path='/profile/:user_id?' render={LazyLoading(ProfileContainer)}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/search' render={() => <SearchContainer/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                    </>
                    }
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

let MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
