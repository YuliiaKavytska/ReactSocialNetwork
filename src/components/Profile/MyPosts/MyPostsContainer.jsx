import React from "react";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();

                let addNewPost = (e) => {
                    store.dispatch(addPostActionCreator())
                }

                let onChangePost = (text) => {
                    store.dispatch(updatePostActionCreator(text));
                }

                return (
                    <MyPosts updateNewPostText={onChangePost}
                             addNewPost={addNewPost}
                             posts={state.profilePage.posts}
                             newPostText={state.profilePage.newPostText}
                    />);
            }}
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;