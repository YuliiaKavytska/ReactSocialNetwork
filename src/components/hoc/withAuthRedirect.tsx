import React from 'react'
import {Redirect} from "react-router"
import {connect} from "react-redux"
import {StateType} from "../../redux/redux-store";

interface IStateProps { isAuth: boolean }

const mapStateToPropsRedirect = (state: StateType): IStateProps => ({
    isAuth: state.auth.isAuth,
})

// когда мы вызываем ХОК то WCP (типы) определяется автоматически от компоненты которую мы оборачиваем.
// В ней в типах должны быть описаны все типы которые дополнительно появятся
// WCP - это тип пропсов, которые приходит из вне.
// ХОК будет возвращать компоненту с пропасами типы которых равны WCP, тоесть типам которые ожидает компонент который мы оборачиваем
export function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>){
    // обязательно указываем пропсы которые приходят с коннекта
    const RedirectComponent: React.FC<IStateProps> = (props) => {
        // достаем из пропсов все, что ненужно. (а в пропасх у нас данные из коннекта и пропы которые пришли из компоненты
        // которую мы оборачиваем. Нам нужно оставить только нужное
        const {isAuth, ...rest} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        // воспринимай тип нужных оставшихся пропсов как тип который определился автоматически у оборачиваемой компоненты
        return <Component {...rest as WCP} />
    }
    // здесь типизация необязательная
    let AuthRedirectContainer = connect<IStateProps, {}, WCP, StateType>(mapStateToPropsRedirect)(RedirectComponent)

    return AuthRedirectContainer
}