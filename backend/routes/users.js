var express = require('express');
var router = express.Router();
var User = require('../Schemas/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (request, response) => {
  console.log('회원가입 중');
  console.log(request.body);
  var flag = true;
  if (request.body.type == 1) {
    User.find((err, users) => {
      users.forEach((item) => {
        if (item.user_id == request.body.user_id) {
          response.json({ status: "500", msg :"아이디 중복"});
          flag = false;
        }
      })
      if (flag == true) {
        response.json({ status: "200", msg :"사용 가능한 아이디"});
      }
    });
  }
  else if (request.body.type == 2) {
    User.find((err, users) => {
      users.forEach((item) => {
        if (item.user_token == request.body.user_token) {
          response.json({ status: "500", msg :"아이디(토큰) 중복"});
          flag = false;
        }
      })
      if (flag == true) {
        response.json({ status: "200", msg :"사용 가능한 아이디(토큰)"});
      }
    });
  }
  else if (request.body.type == 3) {
    User.find((err, users) => {
      users.forEach((item) => {
        if (item.user_nickname == request.body.user_nickname) {
          response.json({ status: "500", msg :"닉네임 중복"});
          flag = false;
        }
      })
      if (flag == true) {
        response.json({ status: "200", msg :"사용 가능한 닉네임"});
      }
    });
  }
  else if (request.body.type == 4) {
    User.create({
      user_id: request.body.user_id,
      user_pw: request.body.user_pw,
      user_nickname: request.body.user_nickname,
    });
  }
  else if (request.body.type == 5) {
    User.create({
      user_token: request.body.user_token,
      user_nickname: request.body.user_nickname,
    });
  }
});

router.post('/login', (request, response) => {
  console.log('로그인 중');
  console.log(request.body);
  var flag = true;
  if (request.body.type == 1) {
    User.find((err, users) => {
      users.forEach((item) => {
        if(item.user_id == request.body.user_id){
          flag = false;
          if(item.user_pw == request.body.user_pw){
            response.json({ status: "200", msg :"로그인 성공"});
          }
          else{
            response.json({ status: "500", msg :"비밀번호 잘못 입력"});
          }
        }
      })
      if(flag == true){
        response.json({ status: "500", msg :"존재하지 않는 아이디"});
      }
    })
  }
  else if(request.body.type == 2){
    User.find((err,users) => {
      users.forEach((item) => {
        if(item.user_token == request.body.user_token){
          flag = false;
          response.json({ status: "200", msg :"로그인 성공(토큰)"});
        }
      })
      if(flag == true){
        response.json({ status: "500", msg :"존재하지 않는 아이디(토큰)"});
      }
    })
  }
});

module.exports = router;