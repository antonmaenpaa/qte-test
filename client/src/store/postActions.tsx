import postSlice from './postSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { PostModel } from "../models/reduxModels";
import PostService from "../service/postService";

export const postActions = postSlice.actions

export const fetchPosts=():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
            if(getState().post.all_posts.length===0){    
                const response: PostModel[] = await PostService.getAllPosts();
                dispatch(postActions.setPosts(response))
            }
    }

}
// export const fetchParticularPost = (post_id: number): ThunkAction<void, RootState, unknown, AnyAction>=>{
//     return async(dispatch, getState) => {  
//         const response: PostModel = await PostService.getParticularPost(post_id);
//         dispatch(postActions.setParticularPost(response))  
//     }
// }

export const createPost = (post: PostModel): ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState) => {
        const response: PostModel = await PostService.createPost(post);
        dispatch(postActions.setParticularPost(response))
        dispatch(postActions.setPosts(getState().post.all_posts.concat(response)))
    }   

}

export const deletePost = (post_id: number): ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState) => {
        const response: PostModel = await PostService.deletePost(post_id);
        dispatch(postActions.setParticularPost(response))
        // dispatch(postActions.setPosts(getState().post.all_posts.filter((post: PostModel) => post._id !== post_id)))
    }   
}


