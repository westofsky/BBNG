var express = require('express');
const { db } = require('../Schemas/Friends');
var router = express.Router();
var Friends = require('../Schemas/Friends');
var User = require('../Schemas/User');
var User_t = require('../Schemas/User_t');

router.post('/AddFriend', async (request, response) => {
    try {
        const result1 = await User.findOne({ user_nickname: request.body.recipient_nickname })
        const result2 = await User_t.findOne({ user_nickname: request.body.recipient_nickname })
        if (result1 || result2) {
            const result3 = await Friends.findOne({user_nickname : request.body.requester_nickname, friend_nickname : request.body.recipient_nickname});
            const result4 = await Friends.findOne({user_nickname : request.body.recipient_nickname, friend_nickname : request.body.requester_nickname});
            var flag = true;
            if(request.body.requester_nickname == request.body.recipient_nickname){
                flag = false;
                response.json({ status: "500", msg: "자기 자신에게는 친구요청을 보낼 수 없습니다." })
            }
            if(result3){
                if (result3.status == 0) {
                    response.json({ status: "500", msg: "이미 친구요청을 보냈습니다." })
                }
                else if (result3.status == 1) {
                    response.json({ status: "500", msg: "이미 해당 계정과 친구입니다." })
                }
            }
            if(result4){
                if (result4.status == 0) {
                    response.json({ status: "500", msg: "상대방이 이미 친구요청을 보냈습니다." })
                }
                else if (result4.status == 1) {
                    response.json({ status: "500", msg: "이미 해당 계정과 친구입니다." })
                }
            }
            if (!result3 && !result4 && flag) {
                Friends.create({
                    user_nickname: request.body.requester_nickname,
                    friend_nickname: request.body.recipient_nickname,
                    status: 0
                }).then((result) => {
                    response.json({ status: "200", msg: "친구요청에 성공했습니다." });
                })
            }
        }
        else {
            response.json({ status: "500", msg: "존재하지 않는 닉네임입니다." })
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/FriendRequest', async (request, response) => {
    var request_list = [];
    const result2 = await Friends.find((err, friends) => {
        friends.forEach((item) => {
            if (item.friend_nickname == request.body.nickname && item.status == 0) {
                request_list.push(item.user_nickname);
                console.log("실행됨");
            }
        })
    }).clone().catch(function (err) { console.log(err) });
    console.log(request_list);
    if (request_list.length == 0) {
        response.json({ status: "500" });
    }
    else {
        response.json({ status: "200", request_list: request_list });
    }
});

router.post('/AcceptFriend', async (request, response) => {
    console.log(request.body);
    const result1 = await Friends.findOneAndUpdate({user_nickname : request.body.AcceptedJson.requester_nickname, friend_nickname : request.body.AcceptedJson.recipient_nickname},
        {status : 1});
    console.log(result1);
    if(!result1){
        response.json({ status: "500",msg: "오류가 발생했습니다." });
    }
    else{
        response.json({ status: "200",msg: "친구추가가 완료되었습니다." });
    }
});

module.exports = router;