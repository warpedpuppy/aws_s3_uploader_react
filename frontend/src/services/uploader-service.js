import Config from '../config';

const UploaderService = {
  async initUpload(id) {
    const { files } = document.getElementById(id);
    const file = files[0];
    if (file === null) return alert('No file selected.');
    const res = await this.getSignedRequest(file);
    return res;
  },
  async getSignedRequest(file) {
    const result = await fetch(`${Config.API_ENDPOINT}/uploader/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    const resultJSON = await result.json();
    const { signedRequest } = resultJSON;
    const uploadResult = await this.uploadFile(file, signedRequest);
    return uploadResult;
  },
  async uploadFile(file, signedRequest) {
    const result = await fetch(signedRequest, {
      method: "PUT",
      headers:  { 'content-type': file.type },
      body: file
    })
    return result.ok;
  }
};

export default UploaderService;
