import Config from '../config';

const UploaderService = {
  async initUpload(id) {
    const { files } = document.getElementById(id);
    const file = files[0];
    if (file === null) return alert('No file selected.');
    let res = await this.getSignedRequest(file);
    return res;
  },
  async getSignedRequest(file) {
    let result = await fetch(`${Config.API_ENDPOINT}/uploader/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    let resultJSON = await result.json();
    let { signedRequest } = resultJSON;
    let uploadResult = await this.uploadFile(file, signedRequest);
    return uploadResult;
  },
  async uploadFile(file, signedRequest) {
    let result = await fetch(signedRequest, {
      method: "PUT",
      headers:  { 'content-type': file.type },
      body: file
    })
    return result.ok;
  }
};

export default UploaderService;
