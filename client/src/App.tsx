import { useEffect, useState } from 'react';
import { useAppDispatch,useAppSelector } from "./hooks/reduxHooks";
import { fetchPosts, createPost } from './store/postActions';
import Post from './components/post';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles, createStyles } from '@mui/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { PostModel } from './models/reduxModels';


function App() {
  const [post_id, setPost_id] = useState(1);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const allposts = useAppSelector(state => state.post.all_posts);
  const particularPost = useAppSelector(state => state.post.particular_post);


  useEffect(() => {
    dispatch(fetchPosts());
  }, [allposts])

  const sendPost = (e: any) => {
    e.preventDefault();
    const post: PostModel = {
      title: title,
      text: text,
      comments: []
    }
    dispatch(createPost(post))
    dispatch(fetchPosts());
    setTitle('');
    setText('');
  }

  const checkPost = () : boolean => {
      if(allposts.length == 0){
          return false
      }
      return true
  }
  // const checkparticularPost = () : boolean => {
  //     if(particularPost._id === 0){
  //         return false
  //     }
  //     return true
  // }


  return (
    <>
      <div className={classes.container}>
          {/* <button onClick={clickHandler}>All Todos</button> */}
          {/* <form onSubmit={sendPost}> */}
            <Box
              className={classes.box}
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
            <TextField
              required
              id="standard-basic"
              variant="standard"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
              required
              value={text}
              aria-label="minimum height"
              minRows={4}
              placeholder="Write your post here"
              style={{ width: 400 }}
              onChange={(e) => setText(e.target.value)}
            />
            <Button disabled={!title || !text} onClick={(e) => sendPost(e)} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
              </Box>
          {/* </form> */}
          <div className={classes.postDiv}>
              {checkPost() &&
                  allposts.map((post) => (
                    <>
                      <Post 
                        title={post.title}
                        text={post.text}
                        // deletePost={deletePost}
                      />
                      <div>
                      {post.comments?.map((comment) => (
                        <div>
                          <p>{comment.name}</p>
                          <p>{comment.comment}</p>
                          </div>
                      ))}

                      </div>
                    
                    </>


                  ))
              }
          </div>
      </div>
      
      
    </>
  );
}
const useStyles = makeStyles((theme: any) => ({
  container: {
    margin: '2rem',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  postDiv: {
    display: 'flex',
    flexDirection: 'column-reverse',
  }
}));

export default App;
