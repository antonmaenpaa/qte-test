import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles, createStyles } from '@mui/styles';

interface Props {
    title: string;
    text: string;
    showHideComments: (arg: any) => void;
    length: number;
    toggleModal: (arg: any) => void;

}


function Post(props: Props) {
    const classes = useStyles();
    const { title, text, showHideComments, length, toggleModal } = props;
    // const { comment, name } = state;
    const [ comment, setComment] = useState('');
    const [name, setName] = useState('');

    return(
        <>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src="https://via.placeholder.com/150" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{title}</h4>
                    <p style={{ textAlign: "left" }}>{text}</p>

                    <span className={classes.comment} onClick={() => showHideComments('')} >Show comments({length})</span>
                    <span className={classes.comment} style={{ marginLeft: '0.5rem'}} onClick={() => toggleModal('')}>Comment</span>
 
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
    },
    comment: {
        cursor: 'pointer',
        color: 'gray',
        
    },

  }));

export default Post;


