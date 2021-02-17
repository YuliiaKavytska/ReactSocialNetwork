import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getStatusThunkCreator,
    getUserProfileThunkCreator, savePhoto,
    setNewStatusThunkCreator, setProfileTC,
    setUserProfile
} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/search-reducer";
import {withRouter} from 'react-router';
import {compose} from "redux";

class ProfileContainer extends React.PureComponent {

    // раньше у нас авторизация (аус ми) был в хедере. поэтому запрос делался долго и профиль мог отрисовваться
    // и при этом он отображался пустым. потом прилетели данные. у нас все обновилось, перерисовалось. но для
    // того чтобы заново проверить есть ли у нас урла или айди, мы делаем компонент дид апдейт и это вынесли сюда
    refreshProfile = () => {
        // если у нас нет загрузки тогда устанавливаем предоудер
        if (!this.props.isFetching) {
            this.props.setFetching();
        }
        // вот для чео нам нужен виз роутер. чтобы получить айди с ссылки и сделать запрос
        this.userId = this.props.match.params.user_id;
        if (!this.userId) {
            // если айди нет у ури параметре, ищем его в пропсах
            this.userId = this.props.userId;
            // если в пропсах не нашли, тогда перенаправляем нас на логин. это делается с помощью виз роутер.
            // запихиваем путь в урлу
            if (!this.userId) this.props.history.push('/login')
        }
        // 13886
        // получаем профиль пользователя
        this.props.getUserProfileThunkCreator(this.userId);
        // получаем статус
        this.props.getStatusThunkCreator(this.userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.user_id !== this.props.match.params.user_id) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.user_id} />;
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.searchPage.isFetching,
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
});

let dispatchToProps = {
    addPost,
    setUserProfile,
    setFetching,
    getUserProfileThunkCreator,
    getStatusThunkCreator,
    setNewStatusThunkCreator,
    savePhoto,
    setProfileTC
};

export default compose(
    connect(mapStateToProps, dispatchToProps),
    withRouter
    )(ProfileContainer);