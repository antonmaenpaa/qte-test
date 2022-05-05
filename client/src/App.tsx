import React,{ useEffect, useState } from 'react';
import { useAppDispatch,useAppSelector } from "./hooks/reduxHooks";
import { fetchPosts, createPost, addComment } from './store/postActions';
import Post from './components/post';
import './App.css';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles, createStyles } from '@mui/styles';
import { CommentModel, PostModel } from './models/reduxModels';
import { Paper, TextareaAutosize, Button, TextField, Container, Typography, Modal } from '@material-ui/core';
import { handleBreakpoints } from '@mui/system';


function App() {
  const [post_id, setPost_id] = useState(1);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const allposts = useAppSelector(state => state.post.all_posts);
  const particularPost = useAppSelector(state => state.post.particular_post);
  const [showComments, setShowComments] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const toggleModal = React.useCallback((id: any) => () => {
    handleOpen();
    setPost_id(id);

}, [])

const sendComment = (e: any) => {
    e.preventDefault();
    dispatch(addComment(post_id, name, comment));
    setName('');
    setComment('');
    handleClose();
    dispatch(fetchPosts());
}

  // const checkparticularPost = () : boolean => {
  //     if(particularPost._id === 0){
  //         return false
  //     }
  //     return true
  // }
  const showHideComments = (id: any) => {
    setShowComments(id);
};


  return (
    <>
      <Container className={classes.container}  maxWidth="sm">
          <Box
            className={classes.box}
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
              <h1>BlogPosts</h1>
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
            <Button style={{backgroundColor: 'lightblue'}} disabled={!title || !text} onClick={(e) => sendPost(e)} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
          </Box>
          <div className={classes.postDiv}>
              {checkPost() &&
                  allposts.map((post: any, index) => (
                    <>
       
                      <div className={showComments === post._id ? classes.show : classes.hide}>
                        {post.comments?.map((comment: any) => (
                          <Paper elevation={2} className={classes.comment}>
                            <p className={classes.p}>{comment.name}</p>
                            <p className={classes.p}>{comment.comment}</p>
                          </Paper>
                        ))}
                      </div>
                      <Post 
                        key={post._id}
                        title={post.title}
                        text={post.text}
                        // deletePost={deletePost}
                        showHideComments={() => showHideComments(post._id)}
                        length={post.comments?.length}
                        toggleModal={toggleModal(post._id)}
                        
                      />
                      <Modal
                        open={open}
                        onClose={handleClose}
                      >
                        <Box className={classes.modal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <TextField
                                    required
                                    id="standard-basic"
                                    variant="standard"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Typography>
                            <Typography id="modal-modal-description">
                                <TextField
                                    required
                                    id="standard-basic"
                                    variant="standard"
                                    label="Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />

                            </Typography>
                            <Button 
                                style={{
                                        backgroundColor: 'lightblue', 
                                        marginTop: '1rem'}} 
                                    variant="contained"
                                    onClick={sendComment}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                    </>
                  ))
              }
          </div>
      </Container>    
    </>
  );
}
const useStyles = makeStyles((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  postDiv: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  comment: {
    borderTopLeftRadius: '0px !important',
    borderRadius: '20px !important',
    padding: '0.1rem 0.5rem',
    width: '50%',
    marginBottom: '.5rem',
  },
  p : {
    margin: '0.5rem 0 !important',

  },

  show: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    backgroundColor: 'lightgray',
    padding: '2rem',
    border: '0px !important',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
},
}));

export default App;
