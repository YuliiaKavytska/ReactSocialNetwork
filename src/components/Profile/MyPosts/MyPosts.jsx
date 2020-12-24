import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";

const MyPosts = (props) => {

    let newPostText = React.createRef();

    let addNewPost = (e) => {
        // let text = newPostText.current.value;
        props.dispatch(addPostActionCreator())
    }
    
    let onChangePost = (e) => {
        let text = newPostText.current.value;
        props.dispatch(updatePostActionCreator(text));
    }

    return (
        <div className={s.posts_wrapper}>
            <p className={s.my_posts}>My Posts</p>
            <div className={s.new_post}>
                <textarea ref={newPostText} placeholder='New post'value={props.newPostText} onChange={onChangePost} />
                <button onClick={ addNewPost }>Add New</button>
            </div>
            <div className={s.posts}>
                <Post posts={props.state}/>
            </div>
        </div>
    );
}

export default MyPosts;