(this["webpackJsonpreact-it-kam"]=this["webpackJsonpreact-it-kam"]||[]).push([[3],{292:function(t,s,e){t.exports={mainInformation:"ProfileInfo_mainInformation__1qGR1",mainInfoBlock:"ProfileInfo_mainInfoBlock__2iq04",information:"ProfileInfo_information__3zagN"}},293:function(t,s,e){t.exports={posts_wrapper:"MyPosts_posts_wrapper__P74T2",my_posts:"MyPosts_my_posts__9WkXg",new_post:"MyPosts_new_post__1sF5a"}},294:function(t,s,e){t.exports={post:"Post_post__2tFQt",post_info:"Post_post_info__77KT5"}},296:function(t,s,e){"use strict";e.r(s);var n=e(3),o=e(34),a=e(35),i=e(37),c=e(36),r=e(0),u=e(1),p=e.n(u),j=e(292),l=e.n(j),h=e(132),f=function(t){var s=Object(u.useState)(!1),e=Object(h.a)(s,2),n=e[0],o=e[1],a=Object(u.useState)(t.status),i=Object(h.a)(a,2),c=i[0],p=i[1];Object(u.useEffect)((function(s){p(t.status)}),[t.status]);return Object(r.jsx)(r.Fragment,{children:n?Object(r.jsx)("input",{autoFocus:!0,defaultValue:c,onBlur:function(){o(!1),t.updateStatus(c)},onInput:function(t){p(t.target.value)}}):Object(r.jsxs)("p",{onDoubleClick:function(){o(!0)},children:["Status: ",t.status||"---"]})})},b=function(t){var s=t.profile,e=t.status,n=t.setNewStatusThunkCreator;return Object(r.jsx)("div",{className:l.a.mainInformation,children:Object(r.jsxs)("div",{className:l.a.mainInfoBlock,children:[Object(r.jsx)("img",{src:s.photos.large?s.photos.large:"https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png",alt:"ava"}),Object(r.jsxs)("div",{className:l.a.information,children:[Object(r.jsxs)("p",{children:["Name: ",s.fullName]}),Object(r.jsx)(f,{status:e,updateStatus:n}),Object(r.jsxs)("p",{children:["facebook: ",s.contacts.facebook]}),Object(r.jsx)("p",{children:"Online"})]})]})})},d=e(98),m=e(293),O=e.n(m),x=e(294),_=e.n(x),g=function(t){var s=t.posts;return Object(r.jsx)("div",{children:s.slice(0).reverse().map((function(t){return Object(r.jsxs)("div",{className:_.a.post,children:[Object(r.jsx)("img",{src:"https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png",alt:""}),Object(r.jsxs)("div",{className:_.a.post_info,children:[Object(r.jsx)("p",{children:t.message}),Object(r.jsxs)("span",{children:["Likes: ",t.likes]})]})]},t.id)}))})},P=e(130),k=e(131),v=e(61),I=e(78),w=p.a.memo((function(t){return Object(r.jsxs)("div",{className:O.a.posts_wrapper,children:[Object(r.jsx)("p",{className:O.a.my_posts,children:"My Posts"}),Object(r.jsx)(y,{posts:t.posts,onSubmit:function(s){t.addPost(s.text)}}),Object(r.jsx)("div",{className:O.a.posts,children:Object(r.jsx)(g,{posts:t.posts})})]})})),N=Object(v.b)(50),y=Object(k.a)({form:"newPost"})((function(t){return Object(r.jsxs)("form",{className:O.a.new_post,onSubmit:t.handleSubmit,children:[Object(r.jsx)(P.a,{component:I.b,placeholder:"Post text...",name:"text",validate:[v.a,N]}),Object(r.jsx)("button",{children:"Post"})]})})),S=w,F=e(14),T={addPost:d.a},C=Object(F.b)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),T)(S),M=e(47),B=function(t){return 0===Object.keys(t.profile).length?Object(r.jsx)(M.a,{isFetching:t.isFetching}):Object(r.jsxs)("div",{children:[Object(r.jsx)(b,Object(n.a)({},t)),Object(r.jsx)(C,{})]})},U=e(23),q=e(9),A=e(11),D=function(t){Object(i.a)(e,t);var s=Object(c.a)(e);function e(){return Object(o.a)(this,e),s.apply(this,arguments)}return Object(a.a)(e,[{key:"componentDidMount",value:function(){this.props.isFetching||this.props.setFetching(),this.userId=this.props.match.params.user_id,this.userId||(this.userId=this.props.userId,this.userId||this.props.history.push("/login")),this.props.getUserProfileThunkCreator(this.userId),this.props.getStatusThunkCreator(this.userId)}},{key:"render",value:function(){return Object(r.jsx)(B,Object(n.a)({},this.props))}}]),e}(p.a.PureComponent),J={addPost:d.a,setUserProfile:d.f,setFetching:U.f,getUserProfileThunkCreator:d.d,getStatusThunkCreator:d.c,setNewStatusThunkCreator:d.e};s.default=Object(A.d)(Object(F.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,isFetching:t.searchPage.isFetching,userId:t.auth.id,isAuth:t.auth.isAuth}}),J),q.f)(D)}}]);
//# sourceMappingURL=3.fba20ae5.chunk.js.map