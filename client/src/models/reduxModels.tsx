export interface PostModel{
    "title": string,
    "text": string,
    "comments": Array<CommentModel>,
}
// export interface PostId extends PostModel{ 
//     "_id": string,
//  }
export interface PostArrayModel{
    all_posts: PostModel[],
    particular_post: PostModel
}
export interface CommentModel{
    "name": string,
    "comment": string,
}