const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const uuid = require('uuid-v4');

const id = uuid();
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
 cors(request, response, () => {
   const body = JSON.parse(request.body);
   fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
     return response.status(500).json({error: err});
   });
   const bucket = gcs.bucket('awesome-places-1564486653305.appspot.com');
    bucket.upload('/tmp/uploaded-image.jpg', {
     uploadType: 'media',
     destination: '/places/' + id + '.jpeg',
        metadata: {
          contentType: 'image/jpeg',
          firebaseStorageDownloadTokens: id
        }
    }, (err, file) => {
      if(!err) {
        response.status(201).json({
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
            bucket.name +
            '/o/' +
            encodeURIComponent(file.name) +
            '?alt=media&token=' + id

        });
      } else {
        response.status(500).json({error: err});
      }
    });
 });
});
