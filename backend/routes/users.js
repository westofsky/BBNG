var express = require('express');
var router = express.Router();
var User = require('../Schemas/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (request, response) => {
  console.log('success');
  console.log(request.body);
  var flag = true;
  if (request.body.type == 1){
    User.find((err, users) => {
      users.forEach((item) => {
        if(item.user_id == request.body.user_id){
          response.json({status : "500"});
          flag = false;
        }
      })
    if(flag==true){
      response.json({status : "200"});
    }
});
  }
  else if(request.body.type == 2){
    User.find((err, users) => {
      users.forEach((item) => {
        if(item.user_token == request.body.user_token){
          response.json({status : "500"});
          flag = false;
        }
      })
    if(flag==true){
      response.json({status : "200"});
    }
});
  }
  else if(request.body.type == 3){
    User.find((err, users) => {
      users.forEach((item) => {
        if(item.user_nickname == request.body.user_nickname){
          response.json({status : "500"});
          flag = false;
        }
      })
    if(flag==true){
      response.json({status : "200"});
    }
});
  }
  else if(request.body.type == 4){
    User.create ({
      user_id:request.body.user_id,
      user_pw:request.body.user_pw,
      user_nickname:request.body.user_nickname,
    });
  }
  else if(request.body.type == 5){
    User.create ({
      user_token:request.body.user_token,
      user_nickname:request.body.user_nickname,
    });
  }
});


module.exports = router;