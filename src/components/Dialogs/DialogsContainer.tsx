import {actions} from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import {withAuthRedirect} from "../hoc/withAuthRedirect"
import {compose} from "redux"
import {StateType} from "../../redux/redux-store"
import {DialogType, MessageType} from "../../types/types"
import {ComponentType} from "react";

// Оно сразу вызывает store.getState() и в результате у нас здесь просто стейт
const mapStateToProps = (state: StateType): StatePropsType => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    isAuth: state.auth.isAuth,
})

type StatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    isAuth: boolean
}

let DispatchToProps = {addMessage: actions.addMessage}
type DispatchPropsType = { addMessage: (message: string) => void }

export default compose<ComponentType>(
    connect<StatePropsType, DispatchPropsType, null, StateType>(mapStateToProps, DispatchToProps),
    withAuthRedirect
)(Dialogs)






// const mapDispatchToProps = (dispatch) => ({
//         addMessage: () => {
//             dispatch(addMessageActionCreator())
//         },
//         changeMessageText: (text) => {
//             dispatch(updateMessageActionCreator(text))
//         }
// })

// это функция которую мы вызываем. она создаст редирект.
// let redirectContainer = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, DispatchToProps)(redirectContainer)
// export default DialogsContainer
