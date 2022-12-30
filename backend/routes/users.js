var express = require('express');
var router = express.Router();
var User = require('../Schemas/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (request, response) => {
  console.log('success');
  console.log(request.body);
  var flag = true;
  User.find((err, users) => {
      users.forEach((item) => {
        if(item.id == request.body.user_token){
          console.log('사용할 수 없는 토큰입니다.');
          flag = false;
        }
      })
    if(flag==true){
      User.create ({
        user_token:request.body.user_token,
        user_email:request.body.user_email,
        user_nickname:request.body.user_nickname,
      });
    }
});
});

module.exports = router;