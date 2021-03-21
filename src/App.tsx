import React, {ComponentType} from 'react'
import './App.css'
import AsideContainer from "./components/Aside/AsideContainer"
import {BrowserRouter, Route} from 'react-router-dom'
import News from "./components/News/News"
import Settings from "./components/Settings/Settings"
// import Music from "./components/Music/Music"
import SearchContainer from "./components/Search/SearchContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginContainer from "./components/Login/LoginContainer"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store, {StateType} from "./redux/redux-store"
import {Redirect, Switch} from "react-router"
import NotFound from "./components/Errors/NotFound"
import LazyLoading from "./components/hoc/withLazyLoading"

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
// эту помпоненту оборачиваем суспенсом. Это мы присваиваем сюда т.к. ХОК возвращает компонету и мы ее должны потом
// отрисовать. Для этого помещаем ее в пременную. Если просто это поместить в рендер, то ничего не получится
const SuspendedDialogs = LazyLoading(DialogsContainer)
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const SuspendedProfile = LazyLoading(ProfileContainer)
const Music = React.lazy(() => import("./components/Music/Music"))
const SuspendedMusic = LazyLoading(Music)

class App extends React.Component<IProps> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Извините, ошибка в промисе (сервер)")
    }

    // перехватываем все ошибки, реджекты промисов
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                        <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                        <Route path='/profile/:user_id?' render={() => <SuspendedProfile />}/>
                        <Route path='/news' exact render={() => <News/>}/>
                        <Route path='/music' exact render={() => <SuspendedMusic />}/>
                        <Route path='/settings' exact render={() => <Settings/>}/>
                        <Route path='/search' exact render={() => <SearchContainer/>}/>
                        <Route path='/login' exact render={() => <LoginContainer/>}/>
                        <Route path='/*' render={() => <NotFound/>}/>
                    </Switch>
                    }
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state: StateType): IMapState => ({
        initialized: state.app.initialized
})
interface IMapState { initialized: boolean }

const dispatchToProps = {initializeApp}
interface IDispatchProps {initializeApp: () => void}

type IProps = IMapState & IDispatchProps


let AppContainer = connect(mapStateToProps, dispatchToProps)(App)

let MainApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
