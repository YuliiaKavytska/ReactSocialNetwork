import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {isRequired, maxLength} from "../../utils/validation";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {MyPostsType} from "./MyPostsContainer";
import img from '../../../assets/images/photo.png';

interface IReqData {
    text: string
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let addNewPost = (data: IReqData) => {
        props.addPost(data.text);
    }

    return (
        <div className={s.posts_wrapper}>
            <p className={s.my_posts}>My Posts</p>
            <NewPostFormContainer onSubmit={addNewPost}/>
            <div className={s.posts}>
                <Post posts={props.posts} photo={props.profile ? props.profile.photos.small : img}/>
            </div>
        </div>
    );
}

const maxLengthCreator = maxLength(50);

interface IPropsForm {
}

const NewPostForm: React.FC<InjectedFormProps<IReqData, IPropsForm> & IPropsForm> = (props) => {
    return <form className={s.new_post} onSubmit={props.handleSubmit}>
        <Field component={Textarea}
               placeholder={'Post text...'}
               name='text'
               validate={[isRequired, maxLengthCreator]}
        />
        <button>Post</button>
    </form>
}

const NewPostFormContainer = reduxForm<IReqData, IPropsForm>({form: 'newPost'})(NewPostForm)

export default React.memo(MyPosts);
