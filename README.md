# REACT AWS S3 BUCKET LOADER

This is a react front end / express backend which will upload photos to an AWS S3 bucket. 

The application I created this for required the image to be 640x480, so this also checks to make sure the image has those dimensions.  This should be pretty easy to remove or customize.

This code is based on the code from this page: https://devcenter.heroku.com/articles/s3-upload-node

to do: back end test to upload photo and download photo

instructions: 
1. first go to AWS and sign up for an S3 bucket, 
    1. you need to get four pieces of information:
        1. the secret access key
        1. the not secret access key
        1. the bucket name
        1. the url root of the bucket that you'll need for the frontend img src attributes
    1. while you are in the AWS S3 bucket admin section, makes sure you can upload photos to it.

1. backend: 
    1. open a terminal window and cd into your backend folder.

    1. Copy the ".exampleenv" file and call it ".env" (code: cp .exampleenv .env). Fill out this .env file with the data you got from aws.

    1. run  "yarn". 

    1. when that is done, run an "yarn run dev".

1. frontend:
    1. open a new terminal window 
    
    1. cd into the frontend folder. 

    1. cd into the src folder 
    
    1. copy the "exampleconfig.js" file and make a "config.js" (code: cp .exampleconfig.js .config.js) and fill out the url that the image tags will need as their src attribute. 

    1. cd back up into the frontend folder (code: cd ..)
    
    1. run "yarn" 

    1. then run a "yarn start"

1. it should then be ready to test.

**Warning:  this is not meant for production.  In production, protect your backend with a JWT.**

