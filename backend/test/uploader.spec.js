const app = require('../src/app')
var File = require("file-class");
describe('uploader endpoint', function() {
    it(`responds with 202 and return an object with string`, () => {

        let file = new File();
        file.name = `IMG_7548.jpeg`;
        file.type = 'image/jpeg';
        let filePath = `${__dirname}/IMG_7548.jpeg`;
        let signedRequest = '';

        return supertest(app)
          .get(`/api/uploader/sign-s3?file-name=${filePath}&file-type=${file.type}`)
          .attach('file', __dirname+'/IMG_7548.jpeg')
          .expect(202)
          .expect('Content-Type', /json/)
          .expect(res => {
              expect(res.body.success).to.be.equal(true)
              expect(res.body.data).to.be.a("string")
             // let signedRequest = JSON.parse(res.body.data)
          })
       
      
    })
});
