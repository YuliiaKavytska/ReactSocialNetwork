import React from "react";
import Header from "./Header";
import {logoutThunkCreator, setUser, setUserThunkCreator} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.PureComponent {
    render() {
        return (
            <Header {...this.props} />
        );
    }
};

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {logoutThunkCreator})(HeaderContainer);