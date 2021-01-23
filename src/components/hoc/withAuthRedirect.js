import React from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";

const mapStateToPropsRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});


export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.PureComponent {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />;
            return <Component {...this.props} />
        };
    }

    let AuthRedirectContainer = connect(mapStateToPropsRedirect)(RedirectComponent);

    return AuthRedirectContainer;
}