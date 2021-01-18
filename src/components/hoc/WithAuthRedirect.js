import React from 'react';
import {Redirect} from "react-router";

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.PureComponent {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />;
            return <Component {...this.props} />
        };
    }

    return RedirectComponent;
}