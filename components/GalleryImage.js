import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import AdvancedImage from './AdvancedImage';
import { ShareButton, LikeButton } from './Buttons';
import { baseurl } from '../site.config';
import Modal from './Modal';
import { likeImage } from './functions/requests';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20,
    [theme.breakpoints.down('xs')]: {
      padding: 10
    },
  },
  imgcont: {

  },
  hoverable: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  imagestyle: {
    borderRadius: 10,
  },
  ActionButtons: {
    padding: 10,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 3
  },
}));

const ActionButtons = (props) => {
  const classes = useStyles();
  const handleLikeClick = () => {
    props.onClick();
  }

  return (
    <Grid item container justify='center' className={classes.ActionButtons}>
      <Grid item >
        <LikeButton likes={props.likes} liked={props.liked} onClick={handleLikeClick} />
      </Grid>
      {/* <Grid item >
      <ShareButton />
    </Grid> */}
    </Grid>
  )
}

const GalleryImage = (props) => {
  const classes = useStyles();
  const smallext = '_small' + '.';
  const splitsrc = props.src.split('.');
  const smallsrc = baseurl + splitsrc[0] + smallext + splitsrc[1];
  const regularsrc = baseurl + props.src;
  const [modalopen, setModalOpen] = useState(props.open);
  const [likestate, setLikeState] = useState({ likes: props.likes, liked: props.liked });

  useEffect(() => {
    setModalOpen(props.open);
  }, [props.open])

  const handleLikeClick = () => {
    setLikeState((likestate) => {
      if (likestate.liked) {
        //If already liked dont update
        return likestate;
      }
      else {
        //Not already liked update
        // Perform api request here for like button
        likeImage(props.imageid);
        const newstate = {
          likes: likestate.likes += 1,
          liked: true
        }
        return newstate;
      }
    });
  }

  const handleModalScroll = (direction) => {
    const newindex = direction === 'next' ? props.index + 1 : props.index - 1;
    props.onModalChange(newindex);
  }

  const handleModalClose = () => {
    setModalOpen(false);
    //Close the backdrop
    props.onModalChange('close');
  }

  const handleImageClick = () => {
    setModalOpen(true);
    props.onModalChange(props.index);
  }

  return (
    <Grid item className={classes.root}>
      <Grid item
        className={props.expandable === false ? classes.imgcont : `${classes.imgcont} ${classes.hoverable}`}
        onClick={props.expandable === false ? undefined : handleImageClick}>
        <AdvancedImage
          className={classes.imagestyle}
          size={props.imagesize}
          src={props.expandable === false ? regularsrc : smallsrc}
          lowres={props.expandable === false ? smallsrc : false}
          info={props.expandable === false ? props.info : undefined}
          posted={props.posted}
        />
      </Grid>
      <ActionButtons liked={likestate.liked} likes={likestate.likes} onClick={handleLikeClick} />
      {
        modalopen && props.expandable !== false &&
        <div>
          <div className={classes.backdrop} onClick={handleModalClose} />
          <Modal src={regularsrc} onScroll={handleModalScroll} onKeyLike={handleLikeClick} info={props.info}>
            <ActionButtons liked={likestate.liked} likes={likestate.likes} onClick={handleLikeClick} />
          </Modal>
        </div>
      }
    </Grid>
  );
}

export default GalleryImage;
