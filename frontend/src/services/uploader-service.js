import Config from '../config';

const UploaderService = {
  onComplete: undefined,
  fileType: undefined,
  async initUpload(id, onComplete) {
    this.newFile = undefined;
    this.onComplete = onComplete;
    const { files } = document.getElementById(id);
    const file = files[0];
    if (file === null) {
      return alert('No file selected.');
    }
    let res = await this.getSignedRequest(file);
    return res;
  },
  async getSignedRequest(file) {
    this.fileType = file.type;
    let result = await fetch(`${Config.API_ENDPOINT}/uploader/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    let resultJSON = await result.json();
    let { signedRequest, url } = resultJSON;
    let res = await this.uploadFile(file, signedRequest, url);
    return res;
  },
  async uploadFile(file, signedRequest, url) {

    let result = await fetch(signedRequest, {
      method: "PUT",
      headers:  {
        'content-type': this.fileType,
      },
      body: file
    })

    return result.ok;
  }
};

export default UploaderService;
