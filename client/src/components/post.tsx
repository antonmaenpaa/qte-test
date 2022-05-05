import React from 'react';
import Divider from '@mui/material/Divider';
// import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles, createStyles } from '@mui/styles';
import { CommentModel } from '../models/reduxModels';

interface Props {
    title: string;
    text: string;
    // deletePost: () => void;
    // comments: Array<CommentModel>;
}

function Post(props: Props) {
    const classes = useStyles();
    const { title, text } = props;
    
    return(
        <>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    {/* <Avatar alt="Remy Sharp" src={imgLink} /> */}
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{title}</h4>
                    <p style={{ textAlign: "left" }}>
                    {text}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    posted 1 minute ago
                    </p>

                    {/* <span onClick={deletePost}>delete</span> */}
                </Grid>
                </Grid>
            </Paper>
        </>

    );
}

const useStyles = makeStyles((theme: any) => ({
    paper: {
        padding: "40px 20px",
        margin: "10px 0",
    }
  }));

export default Post;

