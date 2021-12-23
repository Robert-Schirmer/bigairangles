
import axios from 'axios';
import { baseurl } from '../../site.config';
import Cookies from 'js-cookie';

function handleGenericRequestError(error) {
    //Generic request error handle, logs in console
    console.log("Request Error =>");
    if (error.response) {
        console.log("Request made and server responded");
        console.log(error.response);
    } else if (error.request) {
        console.log("The request was made but no response was received");
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up request");
        console.log(error);
    }
}

function handleReturnResponseError(error) {
    //Returns the error message
    console.log(error);
    if (error.response) {
        // Request made and server responded
        const responsetxt = error.response.data.error ? error.response.data.message + ' => ' + error.response.data.error : error.response.data.message;
        return responsetxt;
    } else if (error.request) {
        // The request was made but no response was received
        return "Request was made but server did not respond";
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return "Uncaught error, check log";
    }
}

const tokencookiename = 'token';

async function getUserToken() {
    //Return the token cookie or newuser if no token
    //Temp user
    const token = Cookies.get(tokencookiename);
    return token === undefined ? 'newuser' : token;
}

async function setUserToken(token) {
    Cookies.set(tokencookiename, token, { expires: 10000 }); //Set super long expire date
}

export async function getImageConfig(callback) {
    //Returns a parsed JSON object
    const token = await getUserToken();
    const url = baseurl + '/api/images/all/likes'; //Sort by likes

    let config;
    try {
        //Make request
        const response = await axios({
            method: 'post',
            url: url,
            data: {
                token: token.toString()
            }
        })
        //Validate config
        config = JSON.parse(JSON.stringify(response.data));
        if (config.length === 0) {
            throw "Config from server had a length of 0";
        }
    } catch (error) {
        handleGenericRequestError(error);
        return callback('error');
    }

    return callback(config);
}

export async function likeImage(imageid) {
    //No callback for this one
    const url = baseurl + '/api/images/' + imageid + '/like';
    const token = await getUserToken();
    try {
        //Make request
        let response = await axios({
            method: 'post',
            url: url,
            data: {
                token: token
            }
        })
        //Validate config
        response = JSON.parse(JSON.stringify(response.data));
        //Token will be first object in array if present
        if (response[0].token) {
            setUserToken(response[0].token);
        }
    } catch (error) {
        handleGenericRequestError(error);
    }
}

export async function addImage(pass, src, metarows, callback) {
    //Accepts the password for request
    //Returns 'success' if request succedded
    const url = baseurl + '/api/images/add';
    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: {
                pass: pass,
                src: src,
                meta: JSON.stringify(metarows)
            }
        })
    } catch (error) {
        return callback(handleReturnResponseError(error));
    }

    return callback('success');
}

export async function submitContactForm(form, callback) {
    //Accepts the form for request
    //Returns 'success' if request succedded
    const url = baseurl + '/api/forms/add';

    try {
        const resposne = await axios({
            method: 'post',
            url: url,
            data: {
                form: JSON.stringify(form)
            }
        })
    } catch (error) {
        handleRequestError(error);
        return callback('error');
    }

    return callback('success');
}

export async function getAllForms(pass, callback) {
    //Accepts the pass
    //Returns an error or the response data
    const url = baseurl + '/api/forms/all';

    let response;
    try {
        response = await axios({
            method: 'post',
            url: url,
            data: {
                pass: pass.toString()
            }
        })
        response = JSON.parse(JSON.stringify(response));
    } catch (error) {
        return callback({
            error: true,
            message: handleReturnResponseError(error)
        })
    }

    return callback(response.data);
}

export async function sendHideForm(pass, formid, callback) {
    //Accepts the pass
    //Returns an error or the response data
    const url = baseurl + '/api/forms/' + formid + '/hide';

    let response;
    try {
        response = await axios({
            method: 'post',
            url: url,
            data: {
                pass: pass.toString(),
                id: formid
            }
        })
        response = JSON.parse(JSON.stringify(response));
    } catch (error) {
        return callback({
            error: true,
            message: handleReturnResponseError(error)
        })
    }

    return callback(response.data);
}