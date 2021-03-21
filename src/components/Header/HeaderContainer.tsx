import React from "react"
import Header from "./Header"
import {logoutThunkCreator} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import {StateType} from "../../redux/redux-store";

class HeaderContainer extends React.PureComponent<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: StateType): StateToPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    photo: state.profilePage.profile?.photos.small
})

const mapDispatchToProps = {logoutThunkCreator}

type StateToPropsType = {
    login: string | null
    isAuth: boolean
    photo: string | null | undefined
}
type DispatchToPropsType = { logoutThunkCreator: () => void }

// type StateToPropsType = ReturnType<typeof mapStateToProps>
// type DispatchToPropsType = typeof mapDispatchToProps
type OwnPropsType = {
    // здесь будут пропсы которые придут из вне. тоесть из апп компоненты
}
type PropsType = StateToPropsType & DispatchToPropsType & OwnPropsType

export default connect<StateToPropsType, DispatchToPropsType, OwnPropsType, StateType>(
    mapStateToProps, mapDispatchToProps
)(HeaderContainer)