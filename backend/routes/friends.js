var express = require('express');
var router = express.Router();
var Friends = require('../Schemas/Friends');
var User = require('../Schemas/User');
var User_t = require('../Schemas/User_t');

router.post('/AddFriend', async (request, response) => {
    try {
        console.log(request.body);
        const result1 = await User.findOne({ user_nickname: request.body.recipient_nickname })
        const result2 = await User_t.findOne({ user_nickname: request.body.recipient_nickname })
        console.log(result1);
        console.log(result2);
        if (result1 || result2) {
            var flag = true;
            const result3 = await Friends.find((err, friends) => {
                friends.forEach((item) => {
                    if (item.user_nickname == request.body.requester_nickname && item.friend_nickname == request.body.recipient_nickname) {
                        if (item.status == 0) {
                            response.json({ status: "500", msg: "이미 친구요청을 보냈습니다." })
                        }
                        else if (item.status == 1) {
                            response.json({ status: "500", msg: "이미 해당 계정과 친구입니다." })
                        }
                        flag = false;
                    }
                    else if (item.user_nickname == request.body.recipient_nickname && item.friend_nickname == request.body.requester_nickname) {
                        if (item.status == 0) {
                            response.json({ status: "500", msg: "상대방이 이미 친구요청을 보냈습니다." })
                        }
                        else if (item.status == 1) {
                            response.json({ status: "500", msg: "이미 해당 계정과 친구입니다." })
                        }
                        flag = false;
                    }
                })
            })
            if (flag) {
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
                request_list.push(item.user_nickname[0]);
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

module.exports = router;