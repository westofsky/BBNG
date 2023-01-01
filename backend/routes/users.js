var express = require('express');
var router = express.Router();
var User = require('../Schemas/User');
var User_t = require('../Schemas/User_t');

router.post('/register', (request, response) => {
  User.find((err,users)=>{
    users.forEach((item)=>{
        console.log(item);
    })
  });
  console.log('회원가입 중');
  console.log(request.body);
  var flag = true;
  if (request.body.type == 1) {
    User.find((err, users) => {
      users.forEach((item) => {
        if (item.user_id == request.body.user_id) {
          response.json({ status: "500", msg :"중복된 아이디입니다."});
          flag = false;
        }
      })
      if (flag == true) {
        response.json({ status: "200", msg :"사용 가능한 아이디입니다"});
      }
    });
  }
  else if (request.body.type == 2) {
    User_t.find((err, users) => {
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
    User_t.find((err, users) => {
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
    }).then((result) => {
        response.json({ status:"200", msg : "회원가입에 성공했습니다."});
    }).catch((err) => {
        console.log(err);
        if(err){
            if (err.name === 'MongoError' && err.code === 11000)
                res.json({ status : "500", msg : "오류가 발생했습니다."})
        }
        else
            next(err);
    });
  }
  else if (request.body.type == 5) {
    User_t.create({
      user_token: request.body.user_token,
      user_nickname: request.body.user_nickname,
    }).then((result) => {
      response.json({ status:"200", msg : "(구글)회원가입에 성공했습니다."});
  }).catch((err) => {
      console.log(err);
      if(err){
          if (err.name === 'MongoError' && err.code === 11000)
              res.json({ status : "500", msg : "오류가 발생했습니다."})
      }
      else
          next(err);
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