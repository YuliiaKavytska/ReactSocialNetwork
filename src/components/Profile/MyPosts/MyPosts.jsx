import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {isRequired, maxLength} from "../../utils/validation";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = (props) => {

    let addNewPost = (data) => {
        props.addPost(data.text);
    }

    return (
        <div className={s.posts_wrapper}>
            <p className={s.my_posts}>My Posts</p>
            <NewPostFormContainer posts={props.posts} onSubmit={addNewPost}/>
            <div className={s.posts}>
                <Post posts={props.posts}/>
            </div>
        </div>
    );
}

const maxLengthCreator = maxLength(50);

const NewPostForm = (props) => {
    return <form className={s.new_post} onSubmit={props.handleSubmit}>
        <Field
            component={Textarea}
            placeholder={'Post text...'}
            name='text'
            validate={[isRequired, maxLengthCreator]}
        />
        <button>Post</button>
    </form>
}

const NewPostFormContainer = reduxForm({form: 'newPost'})(NewPostForm)

export default MyPosts;
