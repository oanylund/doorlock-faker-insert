require('dotenv').config();
var faker = require('faker/locale/nb_NO');
var axios = require('axios');

var token = process.env.TOKEN;
var apibase = process.env.API_BASE_URL;
var apiport = process.env.API_PORT;
var apiurl = apibase + ':' + apiport;

var inserts = 10;

var members = [];

for (var i = 0; i < inserts; i++) {

  var data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.name.firstName().toLowerCase(),
	  graduationYear: Math.floor(Math.random() * 5) + 2016,
    privateEmail: faker.internet.email(),
    mobile: faker.phone.phoneNumberFormat(),
    studentCardId: faker.random.number(),
  }

  console.log(data);

  members[i] = axios.post(apiurl+'/user/add', data,
  {
    headers: {
      'x-access-token': token
    }
  });
}

axios.all(members)
  .then(axios.spread( () => {
    console.log('Inserts done');
  }))
  .catch( (error) => {
    console.log(error.data);
    console.log(error.status);
  });
