import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify/react';
import videoCamera from '@iconify-icons/fa/video-camera';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call,muteButton, stopCamera } = useContext(SocketContext);
  const classes = useStyles();

  

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
          <Grid>
          <Button variant="contained" color="primary" onClick={muteButton}>
            <FontAwesomeIcon icon={faMicrophone} />
          </Button>
          <Button variant="contained" color="primary" onClick={stopCamera}>
              <Icon icon={videoCamera} />
            </Button>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
