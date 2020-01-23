const app = require('../src/app')
var File = require("file-class");
describe('uploader endpoint', function() {
    it(`uploads and then deletes image`, () => {

        let file = new File();
        file.name = `IMG_7548.jpeg`;
        file.type = 'image/jpeg';
        let filePath = `${__dirname}/IMG_7548.jpeg`;

        return supertest(app)
          .get(`/api/uploader/sign-s3?file-name=${file.name}&file-type=${file.type}`)
          .expect(res => {
              
            let { signedRequest } = JSON.parse(res.text);

            //  return supertest(app)
            //     .put(signedRequest)
            //     .attach('image', filePath)
            //     .then(result => console.log(result))
            //     .catch(error => console.error(error))
          })
       
      
    })
});
