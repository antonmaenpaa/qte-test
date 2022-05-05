import Api from './api';
import { PostModel } from '../models/reduxModels';
export default{
    async getAllPosts(){
        let response = await Api().get('posts');
        console.log(response.data);
        return response.data;

    },
    // async getParticularPost(post_id: number){
    //     let response = await Api().get('posts');
    //     return response.data.filter((post: PostModel) => post._id === post_id)[0];
    // },

    async createPost(post: PostModel){
        let response = await Api().post('posts', post);
        return response.data;
    },

    async deletePost(post_id: number){
        let response = await Api().delete(`posts/${post_id}`);
        return response.data;

    }
}