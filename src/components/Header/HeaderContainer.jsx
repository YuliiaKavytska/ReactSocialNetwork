import React from "react";
import Header from "./Header";
import axios from "axios";
import {setUser} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.PureComponent {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setUser(id, email, login);
                }
            })
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

let dispatchToProps = {
    setUser
};

export default connect(mapStateToProps, dispatchToProps)(HeaderContainer);