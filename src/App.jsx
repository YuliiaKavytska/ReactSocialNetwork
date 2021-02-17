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
import {Redirect, Switch} from "react-router";
import NotFound from "./components/Errors/NotFound";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert("promiseRejectionEvent")
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        return (
            <div className='container'>
                <HeaderContainer/>
                <AsideContainer/>
                <main className='main'>
                    {!this.props.initialized ? <Preloader/> : <Switch>
                        <Route path={'/'} exact >
                            {<Redirect to={'/profile'} />}
                        </Route>
                        <Route path='/dialogs' exact render={LazyLoading(DialogsContainer)}/>
                        <Route path='/profile/:user_id?' render={LazyLoading(ProfileContainer)}/>
                        <Route path='/news' exact render={() => <News/>}/>
                        <Route path='/music' exact render={() => <Music/>}/>
                        <Route path='/settings' exact render={() => <Settings/>}/>
                        <Route path='/search' exact render={() => <SearchContainer/>}/>
                        <Route path='/login' exact render={() => <LoginContainer/>}/>
                        <Route path='/*' render={() => <NotFound/>}/>
                    </Switch>
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

let MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
