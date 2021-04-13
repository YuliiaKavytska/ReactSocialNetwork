import React from "react";
import s from './Post.module.css';
import img from '../../../../assets/images/photo.png';
import {PostType} from "../../../../types/types";

interface IProps {
    posts: Array<PostType>
    photo: string | null
}

const Post: React.FC<IProps> = ({posts, photo}) => {
    return (
        <div>
            {posts.slice(0).reverse().map((item) => (
                <div key={item.id} className={s.post}>
                    <img src={photo || img} alt=""/>
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