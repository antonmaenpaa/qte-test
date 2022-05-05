import { PostModel, PostArrayModel} from "../models/reduxModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPostState: PostArrayModel = {
    all_posts: [],
    particular_post: {  
        "title": "",
        "text": "",
        "comments": []
    }
}

const postSlice = createSlice({
    name:'post',
    initialState: initialPostState,
    reducers: {
        setPosts(state,action:PayloadAction<PostModel[]>){
            state.all_posts=action.payload;
        },
        setParticularPost(state,action:PayloadAction<PostModel>){
            state.particular_post=action.payload;
        }
    }
})
export default postSlice;