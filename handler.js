'use strict';

const serverlessHttp = require('serverless-http');
const Koa = require('koa');
const mongoose = require('mongoose');
const router = require('./app/routes/user-route');
const bodyparser = require('koa-bodyparser');

const app = new Koa();


// mongoose.connect('mongodb+srv://fajing:wangfajing@zhihu.57z0a.azure.mongodb.net/zhihu?retryWrites=true&w=majority');

app.use(bodyparser());
app.use(router.routes());
// const apphandler = serverlessHttp(app);
// const api = async (event, context) => {
//   // you can do other things here
//   const result = await apphandler(event, context);
//   // and here
//   return result;
// };

// dependencies
const AWS = require('aws-sdk');
const util = require('util');
// const sharp = require('sharp');

// get reference to S3 client
const s3 = new AWS.S3();

const uploadFile = async (event, context, callback) => {

    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    // const srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    // const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    // const dstBucket = srcBucket + "-resized";
    // const dstKey    = "resized-" + srcKey;

    // Infer the image type from the file suffix.
    // const typeMatch = srcKey.match(/\.([^.]*)$/);
    // if (!typeMatch) {
    //     console.log("Could not determine the image type.");
    //     return;
    // }

    // Check that the image type is supported  
    // const imageType = typeMatch[1].toLowerCase();
    // if (imageType != "jpg" && imageType != "png") {
    //     console.log(`Unsupported image type: ${imageType}`);
    //     return;
    // }

    // Download the image from the S3 source bucket. 
    // try {
    //     const params = {
    //         Bucket: srcBucket,
    //         Key: srcKey
    //     };
    //     var origimage = await s3.getObject(params).promise();

    // } catch (error) {
    //     console.log(error);
    //     return;
    // }  

    // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
    // const width  = 200;

    // Use the Sharp module to resize the image and save in a buffer.
    // try { 
    //     var buffer = await sharp(origimage.Body).resize(width).toBuffer();
            
    // } catch (error) {
    //     console.log(error);
    //     return;
    // } 

    // Upload the thumbnail image to the destination bucket
    try {
        const destparams = {
            // Bucket: dstBucket,
            // Key: dstKey,
            // Body: buffer,
            // ContentType: "image"

            Bucket: srcBucket,
            Key: srcKey,
            Body: buffer,
            ContentType: "image"
        };

        const putResult = await s3.putObject(destparams).promise(); 
        
    } catch (error) {
        console.log(error);
        return;
    } 
        
    // console.log('Successfully resized ' + srcBucket + '/' + srcKey +
    //     ' and uploaded to ' + dstBucket + '/' + dstKey); 
};

const test = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports= {
  app,
  test: test,
  // api : api,
  uploadFile : uploadFile
};
