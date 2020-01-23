const app = require('../src/app')
var File = require("file-class");
describe('uploader endpoint', function() {
    it(`receives object with signed request from endpoint`, () => {

        let file = new File();
        file.name = `IMG_7548.jpeg`;
        file.type = 'image/jpeg';
        let filePath = `${__dirname}/IMG_7548.jpeg`;

        return supertest(app)
          .get(`/api/uploader/sign-s3?file-name=${file.name}&file-type=${file.type}`)
          .expect(res => {
            expect(res.text).to.be.a("string")
            let responseJSON = JSON.parse(res.text);
            expect(responseJSON).to.have.keys("signedRequest", "url")

            // let { signedRequest } = responseJSON;
            //  return supertest(app)
            //     .put(signedRequest)
            //     .attach('file', filePath)
            //     .then(result => console.log(result))
            //     .catch(error => console.error(error))
          })
       
      
    })
});
