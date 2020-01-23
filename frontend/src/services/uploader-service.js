import Config from '../config';

const UploaderService = {
  onComplete: undefined,
  fileType: undefined,
  initUpload(id, onComplete) {
    this.newFile = undefined;
    this.onComplete = onComplete;
    const { files } = document.getElementById(id);
    const file = files[0];
    if (file === null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file);

  },
  async getSignedRequest(file) {
    this.fileType = file.type;
    let result = await fetch(`${Config.API_ENDPOINT}/uploader/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    let resultJSON = await result.json();
    let { signedRequest, url } = resultJSON;
    this.uploadFile(file, signedRequest, url);

  },
  async uploadFile(file, signedRequest, url) {

    let result = await fetch(signedRequest, {
      method: "PUT",
      headers:  {
        'content-type': this.fileType,
      },
      body: file
    })

    if (result.ok) {
      document.getElementById('preview').src = url;
      this.onComplete();
    }
  }
};

export default UploaderService;
