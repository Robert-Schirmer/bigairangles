import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import GalleryImage from './GalleryImage';
import DropDown from './DropDown';
import LoadingIcon from './LoadingIcon';
import { getImageConfig } from './functions/requests';

const useStyles = makeStyles(theme => ({
  root: {

  },
  loadingcont: {
    minHeight: '70vh'
  },
  loading: {

  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '100vh',
    width: '100vw',
    zIndex: 3
  },
}));

export default function Gallery() {
  const classes = useStyles();
  const [image_config, setImgConf] = useState();
  const [error, setError] = useState(false);
  const [gallerysort, setGallerySort] = useState("likes");
  const sortoptions = ["likes", "recent"];

  useEffect(() => {
    //Get image_config
    getImageConfig(parseAndSetConfig);

    function parseAndSetConfig(config) {
      if (config === 'error') {
        setError(true);
      }
      else {
        const firststate = {};
        firststate.mainimage = config[0];

        firststate.galleryimages = config.slice(1);

        setImgConf({ ...firststate });
      }
    }
  }, []);

  function sortByDate(array, id) {
    array.sort(function (a, b) {
      return new Date(b[id]) - new Date(a[id]);
    });
    return array;
  }

  function sortByNumber(array, id) {
    array.sort(function (a, b) {
      return b[id] - a[id];
    });
    return array;
  };

  const mainimagesize = {
    max: 1000,
    size: '90vw',
    maxvertical: '80vh'
  }

  function handleDropChange(method) {
    setImgConf(image_config => {
      switch (method) {
        case "likes":
          const newconf = {
            ...image_config,
            galleryimages: sortByNumber(image_config.galleryimages, 'likes')
          }
          return { ...newconf };
        case "recent":
          const recentconf = {
            ...image_config,
            galleryimages: sortByDate(image_config.galleryimages, 'posted')
          }
          return { ...recentconf };
        default:
          break;
      }
    })
    setGallerySort(method);
  }

  return (
    <div>
      {
        image_config ?
          <div>
            <Grid container justify='center' direction='row' >
              <GalleryImage
                src={'/imgs/' + image_config.mainimage.src}
                imageid={image_config.mainimage.id}
                likes={image_config.mainimage.likes}
                liked={image_config.mainimage.liked}
                imagesize={mainimagesize}
                expandable={false}
                info={[...image_config.mainimage.info, {label: "Posted", value: image_config.mainimage.posted}]} //Add posted info
              />
            </Grid >
            <Grid container justify='center' alignItems='center' direction='row' >
              <Grid item >
                <Typography variant="body1">Sort by</Typography>
              </Grid>
              <Grid item >
                <DropDown options={sortoptions} value={gallerysort} onChange={handleDropChange} style={{ padding: '0px 6px' }} />
              </Grid>
            </Grid>
            <Grid container justify='center' alignItems='center' direction='row'>
              <GalleryImages image_config={image_config} />
            </Grid>
          </div>
          :
          <Grid container justify='center' alignItems='center' className={classes.loadingcont}>
            {
              error ?
                <Typography variant='h6'>An error occured, it will be fixed soon</Typography>
              :
                <LoadingIcon />
            }
          </Grid>
      }
    </div>
  );
}

const GalleryImages = (props) => {
  const [modalindex, setModalIndex] = useState(-1);
  const classes = useStyles();
  const galleryimagesize = {
    min: 100,
    max: 400,
    size: '20vw'
  }

  useEffect(() => {
    setModalIndex(-1);
  }, [props.image_config])

  const handleModalIndex = (index) => {
    const galleryimages = props.image_config.galleryimages;
    if (index === 'close') {
      setModalIndex(-1);
    }
    else if (index >= galleryimages.length) {
      //Scroll over go back to start
      setModalIndex(0);
    }
    else if (index <= -1) {
      //Scroll under go to last image
      setModalIndex(galleryimages.length - 1);
    }
    else {
      setModalIndex(index);
    }
  }

  return (
    <>
      {
        modalindex !== -1 ?
          <div className={classes.backdrop} />
          :
          null
      }
      {props.image_config.galleryimages.map((image, index) => {
        return (
          <GalleryImage
            key={image.src}
            src={'/imgs/' + image.src}
            imageid={image.id}
            likes={image.likes}
            liked={image.liked}
            posted={image.posted}
            index={index}
            imagesize={galleryimagesize}
            open={index === modalindex}
            info={[...image.info, {label: "Posted", value: image.posted}]} //Add posted info
            onModalChange={handleModalIndex}
          />
        )
      })}
    </>
  )
}