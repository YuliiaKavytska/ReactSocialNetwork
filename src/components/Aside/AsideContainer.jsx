import React from "react";
import Aside from "./Aside";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        favUsers: state.aside.favUsers
    }
}

export default connect(mapStateToProps, null)(Aside);
