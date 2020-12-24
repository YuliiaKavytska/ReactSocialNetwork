import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let state = props.store.getState();


    let addNewPost = (e) => {
        props.store.dispatch(addPostActionCreator())
    }
    
    let onChangePost = (text) => {
        props.store.dispatch(updatePostActionCreator(text));
    }

    return (
        <MyPosts updateNewPostText={ onChangePost }
                 addNewPost={ addNewPost }
                 posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}
        />
    );
}

export default MyPostsContainer;