import {addMessage,} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

// Оно сразу вызывает store.getState() и в результате у нас здесь просто стейт
const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth,
    }
}

//callbacks
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: () => {
//             dispatch(addMessageActionCreator());
//         },
//         changeMessageText: (text) => {
//             dispatch(updateMessageActionCreator(text))
//         }
//     }
// }

// это функция которую мы вызываем. она создаст редирект.
// let redirectContainer = withAuthRedirect(Dialogs);
//
let DispatchToProps = {
    addMessage
};
//
// const DialogsContainer = connect(mapStateToProps, DispatchToProps)(redirectContainer);
//
// export default DialogsContainer;

export default compose(
    connect(mapStateToProps, DispatchToProps),
    withAuthRedirect
)(Dialogs);