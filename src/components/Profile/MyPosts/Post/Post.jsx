import React from "react";
import s from './Post.module.css';

const Post = (props) => {
    let {posts} = props;

    return (
        <div>
            {posts.slice(0).reverse().map((item) => (
                <div key={item.id} className={s.post}>
                    <img src="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png" alt=""/>
                    <div className={s.post_info}>
                        <p>{item.message}</p>
                        <span>Likes: {item.likes}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Post;