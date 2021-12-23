import { makeStyles } from '@material-ui/core/styles';
import { useState, useRef, useEffect } from 'react';
import { Fade } from '@material-ui/core';
import InfoDropdown from './InfoPopUp';
import LoadingIcon from './LoadingIcon';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'relative'
    }
}));

const AdvancedImage = (props) => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const [imgstyle, setImgStyle] = useState();
    const [src, setSrc] = useState();
    const imgref = useRef();
    //If lowres prop then load the lowres image first then load the full res image and replace src
    const highresimgref = useRef(); //Remains hidden and loads high res image

    const imageLoaded = () => {
        if (props.noAdjust === undefined) adjustImageStyle();

        setLoaded(true);

        if (props.onload) props.onload();
        if (props.lowres) {
            highresimgref.current.onload = function () {
                setSrc(props.src);
            }
            highresimgref.current.src = props.src;
        }
    }

    const adjustImageStyle = () => {
        //Adjust image to fit in height / width area (Square) by finding if height or width is largest
        const imgheight = imgref.current.height;
        const imgwidth = imgref.current.width;
        const imagesize = props.size ? props.size : { size: '100%', min: '100%', max: '100%' };
        if (imgheight > imgwidth) {
            //Height is largest
            setImgStyle({
                height: imagesize.size,
                maxHeight: imagesize.maxvertical ? imagesize.maxvertical : imagesize.max,
                minHeight: imagesize.min
            })
        }
        else {
            //Width is largest
            setImgStyle({
                width: imagesize.size,
                maxWidth: imagesize.maxhorizontal ? imagesize.maxhorizontal : imagesize.max,
                minWidth: imagesize.min
            })
        }
    }

    useEffect(() => {
        //Must set onload function before src, incase in cache
        imgref.current.onload = imageLoaded;
        setSrc(props.lowres ? props.lowres : props.src);
    }, [])

    return (
        <div className={classes.root}>
            {
                loaded ?
                    <>
                        {
                            props.info ?
                                <InfoDropdown info={props.info}/>
                                :
                                undefined
                        }
                    </>
                    :
                    <LoadingIcon contsize={200}/>
            }
            <Fade in={loaded}>
                <img src={src}
                    style={loaded ? imgstyle : { display: 'none' }}
                    ref={imgref}
                    className={props.className}
                />
            </Fade>
            {
                props.lowres ?
                    <img ref={highresimgref} style={{ display: 'none' }} />
                    :
                    undefined
            }
        </div>
    )
}

export default AdvancedImage;