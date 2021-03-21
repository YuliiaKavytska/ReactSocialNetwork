import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {StateType} from "../../../redux/redux-store";
import {PostType, ProfileType} from "../../../types/types";

const mapStateToProps = (state: StateType): IStateProps => ({
    posts: state.profilePage.posts,
    profile: state.profilePage.profile
})

interface IStateProps {
    posts: Array<PostType>
    profile: ProfileType | null
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addNewPost: () => {
//             dispatch(addPostActionCreator())
//         },
//         updateNewPostText: (text) => {
//             dispatch(updatePostActionCreator(text));
//         }
//     }
// }

let DispatchToProps = {addPost: actions.addPost};

interface IDispatch {addPost: (text: string) => void}

export type MyPostsType = IStateProps & IDispatch

const MyPostsContainer = connect(mapStateToProps, DispatchToProps)(MyPosts);

export default MyPostsContainer;