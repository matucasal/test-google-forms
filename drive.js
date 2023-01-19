'use strict';

const path = require('path');
//const google = require('@googleapis/drive');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const formID = '1cTFMvSlB2z1my4Ovko2eS6l1MGBagVVDAyPzza7q7Uc';

async function runSample(query) {

  const auth = new google.auth.GoogleAuth({
    keyFile:  path.join(__dirname, 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/drive', 
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.apps.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly'
   ],});
  const forms = google.drive({
    version: 'v3',
    auth: auth,
  });

  var copyRequest = {  // Modified
    name: "im a copy",
    parents: ["1ixujHcqTIj1zxW_j1NGQXizZYTYL8olK"]
    //1ixujHcqTIj1zxW_j1NGQXizZYTYL8olK
  };


  forms.files.copy(
    {  // Modified
      fileId: "1SkT-Dvoi6tRpSn6uB8cmnlcm3MLyj_OGDhfgNmuXnJI",
      requestBody: copyRequest  // or resource: copyRequest
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log(response.data);
    }
  );
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;