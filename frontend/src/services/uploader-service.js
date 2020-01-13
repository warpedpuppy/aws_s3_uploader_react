import Config from '../config';

const UploaderService = {
  imageName: '',
  onComplete: undefined,
  xhr: new XMLHttpRequest(),
  stage: 1,
  newFile: undefined,
  url: undefined,
  initUpload(id, onComplete) {
    this.newFile = undefined;
    this.stage = 1;
    this.onComplete = onComplete;
    const { files } = document.getElementById(id);
    const file = files[0];
   
    if ( !this.xhr.onreadystatechange) {
      this.xhr.onreadystatechange = this.readyStateChangeHandler.bind(this);
    }

    if (file == null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file);
  },
  readyStateChangeHandler () {
    if (this.xhr.readyState === 4) {
      if (this.xhr.status === 200) {

        if (this.stage === 1) {
         
          const response = JSON.parse(this.xhr.responseText);
          this.uploadFile(this.newFile, response.signedRequest, response.url);
          this.stage ++;
        } else {
          document.getElementById('preview').src = this.url;
          this.onComplete();
        }

      } else {
        
        if (this.stage === 1) {
          console.log('Could not get signed URL.');
        } else {
          console.log("error uploading", this.url)
        }
      }
    }
  },
  getSignedRequest(file) {
    this.newFile = file;
    this.xhr.open('GET', `${Config.API_ENDPOINT}/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    this.xhr.send();
  },
  uploadFile(file, signedRequest, url) {
    this.url = url;
    this.xhr.open('PUT', signedRequest);
    this.xhr.send(file);
  }
};

export default UploaderService;
