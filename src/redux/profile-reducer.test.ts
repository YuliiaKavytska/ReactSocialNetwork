import profileReducer, {actions,} from "./profile-reducer";
import {ProfileType} from "../types/types";

// 1. Initial data for test. Use action creator and initial state for starting test
let state = {
    posts: [
        {id: 1, message: 'Hi everyone', likes: 12},
        {id: 2, message: 'Im learning React', likes: 2},
        {id: 3, message: 'Im so cute', likes: 132},
        {id: 5, message: 'Im genius', likes: 16},
    ],
    profile: null as ProfileType | null,
    status: null as string | null,
}

it('new post should be added and length of posts should incremented', () => {
    let action = actions.addPost('test added new post');
    // 2. What we would have at the result of testing. Call some reducer and give inside it some state and action
    let newState = profileReducer(state, action);
    // 3. What we expect at the result.
    expect(newState.posts.length).toBe(5);
})

it('new post text should be "test added new post"', () => {
    let action = actions.addPost('test added new post');
    // 2. What would we have at the result of testing. Call some reducer and give inside it some state and action
    let newState = profileReducer(state, action);
    // 3. What we expect at the result.
    expect(newState.posts[newState.posts.length - 1].message).toBe('test added new post');
})

it('current post should be deleted. length should be decrement', () => {
    let action = actions.deletePost(2);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
})