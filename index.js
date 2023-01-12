'use strict';

const path = require('path');
const google = require('@googleapis/forms');
const {authenticate} = require('@google-cloud/local-auth');

const formID = '1cTFMvSlB2z1my4Ovko2eS6l1MGBagVVDAyPzza7q7Uc';

async function runSample(query) {
  /*const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials.json'),
    scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
  });*/
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/forms.body.readonly', 'https://www.googleapis.com/auth/forms.responses.readonly'],
  });
  const forms = google.forms({
    version: 'v1',
    auth: auth,
  });
  const res = await forms.forms.get({formId: formID});
  //console.log('form data', res.data.items);

  //res.data.items
  res.data.items.forEach(question => {
    console.log('question', question.questionItem)
  });

  const responses = await forms.forms.responses.list({
    formId: formID,
  });
  forms.forms.get({formId: formID})
  //console.log('responses', responses.data)

  //getting responses anwswers
  responses.data.responses.forEach(response => {
    console.log('response.answers)', response.answers);
    Object.entries(response.answers).forEach(([key, value]) => {
      if (value.hasOwnProperty('textAnswers')) {
        console.log(value.textAnswers.answers);
      }
    });
    
  });
  
  
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;