# REACT AWS S3 BUCKET LOADER

This is a react front end / express backend which will upload photos to an AWS S3 bucket. 

The application I created this for required the image to be 640x480, so this also checks to make sure the image has those dimensions.  This should be pretty easy to remove or customize.

instructions: 
1. first go to AWS and sign up for an S3 bucket, you need to get three pieces of information:
    1. the secret access key
    1. the not secret access key
    1. the url root of the bucket that you'll need for the front end img src attributes

1. backend: 
    1. open a terminal window and cd into your backend folder.

    1. Copy the ".exampleenv" file and call it ".env". Put these pieces of info in your new .env file in the appropriate places.  

    1. run an "npm i". 

    1. when that is done, run an "npm run dev".

1. frontend:
    1. open a new terminal window and cd into the frontend folder. 

    1. cd into the src folder and copy the "exampleconfig.js" file and make a "config.js" and fill it out appropriately. 

    1. cd back up into the frontend folder and run "yarn" (I know, why did I use yarn here and npm in the backend? because yarn comes with the create react package so I just went with it)

    1. then run a "yarn start"

1. it should then be ready to test.

Warning:  this is not meant for production.  In production, protect your backend with a JWT.

