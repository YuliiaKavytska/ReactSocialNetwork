import React, {ComponentType} from 'react'
import Profile from "./Profile"
import {connect} from "react-redux"
import {
    actions,
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    savePhoto,
    setNewStatusThunkCreator,
    setProfileTC
} from "../../redux/profile-reducer"
import {RouteComponentProps, withRouter} from 'react-router'
import {compose} from "redux"
import {StateType} from "../../redux/redux-store";
import {ProfileType, ReqDataType} from "../../types/types";
import {actions as searchActions} from '../../redux/search-reducer';

interface IPathParams {
    user_id: string
}

export type PropsTypeProfileCont = RouteComponentProps<IPathParams> & ProfileContainerPropsType;

class ProfileContainer extends React.PureComponent<PropsTypeProfileCont> {
    // раньше у нас авторизация (аус ми) был в хедере. поэтому запрос делался долго и профиль мог отрисовваться
    // и при этом он отображался пустым. потом прилетели данные. у нас все обновилось, перерисовалось. но для
    // того чтобы заново проверить есть ли у нас урла или айди, мы делаем компонент дид апдейт и это вынесли сюда
    refreshProfile = () => {
        // если у нас нет загрузки тогда устанавливаем предоудер
        if (!this.props.isFetching) {
            this.props.setFetching()
        }
        // вот для чео нам нужен виз роутер. чтобы получить айди с ссылки и сделать запрос
        let userId: number | null = +this.props.match.params.user_id
        if (!userId) {
            // если айди нет у ури параметре, ищем его в пропсах
            userId = this.props.userId
            // если в пропсах не нашли, тогда перенаправляем нас на логин. это делается с помощью виз роутер.
            // запихиваем путь в урлу
            if (!userId) this.props.history.push('/login')
        }
        if (!userId) {
            throw new Error('User id is not defined in uri parameters or in autorized reduser')
        } else {
            // 13886
            // получаем профиль пользователя
            this.props.getUserProfileThunkCreator(userId)
            // получаем статус
            this.props.getStatusThunkCreator(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsTypeProfileCont, prevState: PropsTypeProfileCont) {
        if (prevProps.match.params.user_id !== this.props.match.params.user_id) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile profile={this.props.profile}
                        status={this.props.status}
                        setNewStatusThunkCreator={this.props.setNewStatusThunkCreator}
                        savePhoto={this.props.savePhoto}
                        setProfileTC={this.props.setProfileTC}
                        isOwner={!this.props.match.params.user_id}/>
    }
}

interface IStateProps {
    profile: ProfileType | null
    status: string | null
    isFetching: boolean
    userId: number | null
    isAuth: boolean
}

// type IStateProps = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: StateType): IStateProps => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.searchPage.isFetching,
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
})

interface IDispatch {
    addPost: (text: string) => void
    setUserProfile: (profile: ProfileType) => void
    setFetching: () => void
    getUserProfileThunkCreator: (userId: number) => void
    getStatusThunkCreator: (userId: number) => void
    setNewStatusThunkCreator: (status: string) => void
    savePhoto: (photo: File) => void
    setProfileTC: (profileData: ProfileType) => any
}

let dispatchToProps = {
    addPost: actions.addPost,
    setUserProfile: actions.setUserProfile,
    setFetching: searchActions.setFetching,
    getUserProfileThunkCreator, getStatusThunkCreator, setNewStatusThunkCreator,
    savePhoto, setProfileTC
}

export type ProfileContainerPropsType = IStateProps & IDispatch

export default compose<ComponentType>(
    connect<IStateProps, IDispatch, {}, StateType>(mapStateToProps, dispatchToProps),
    withRouter
)(ProfileContainer)