import React from "react";
import Aside from "./Aside";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {UserType} from "../../types/types";

const mapStateToProps = (state: StateType): StatePropsType => ({
    favUsers: state.aside.favUsers
})
type StatePropsType = {favUsers: Array<UserType>}

export default connect<StatePropsType, {}, {}, StateType>(mapStateToProps)(Aside);
