import React from "react";
import Header from "./Header";
import {setUser, setUserThunkCreator} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.PureComponent {
    componentDidMount() {
        this.props.setUserThunkCreator();
    }

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

let dispatchToProps = {setUser, setUserThunkCreator};

export default connect(mapStateToProps, dispatchToProps)(HeaderContainer);