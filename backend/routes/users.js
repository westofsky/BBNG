var express = require('express');
var router = express.Router();
var User = require('../Schemas/User');
var User_t = require('../Schemas/User_t');
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client();
router.post('/register', async (request, response) => {
  User.find((err,users)=>{
    users.forEach((item)=>{
        console.log(item);
    })
  });
  console.log('회원가입 중');
  console.log(request.body);
  if (request.body.type == 1) {
    var flag = true;
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
    var flag = true;
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
    var flag = true;
    User.findOne( {user_nickname : request.body.user_nickname})
    .then((result) => {
      if(result) 
        flag = false;
      else{
          User_t.findOne( {user_nickname : request.body.user_nickname})
          .then((result) => {
            if(result) 
              flag = false;
          })
      }
      if(flag == true){
        response.json({ status : "200" , msg : "닉네임 사용 가능"});
      }
      else{
        response.json({ status: "500", msg :"닉네임 중복"});
      }
    })
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
  if (request.body.type == 1) {
    var flag = true;
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
    var flag = true;
    var user_tokens;
    async function verifyToken(token) {
      client.setCredentials({ access_token: token })
      const userinfo = await client.request({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
      });
      return userinfo.data
    }
  
    verifyToken(request.body.user_token)
    .then((userInfo) => {
      user_tokens = userInfo.sub;
      User_t.findOne( {user_token : user_tokens})
          .then((result) => {
            if(result){
              response.json({ status: "200", msg :"로그인 성공(토큰)"});
            }
            else{
              response.json({ status: "500", msg :"존재하지 않는 아이디(토큰)"});
            }
          })
    })
    .catch((error) => {
      console.log(error);
    })
  }
});
router.post('/getUserGoogleInfo', (request, response) => {
  async function verifyToken(token) {
    client.setCredentials({ access_token: token })
    const userinfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });
    return userinfo.data
  }

  verifyToken(request.body.access_token)
  .then((userInfo) => {
    response.json({info : userInfo});
  })
  .catch((error) => {
    console.log(error)
  })
});
module.exports = router;