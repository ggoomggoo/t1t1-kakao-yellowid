var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// REF
// http://expressjs.com/en/guide/routing.html
// https://github.com/t1t1/auto_reply
// https://devcenter.heroku.com/articles/logging
// https://devcenter.heroku.com/articles/config-vars
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars

router.get('/keyboard', function(req, res, next) {
// res sample
//
// {
//     "type" : "buttons",
//     "buttons" : ["선택 1", "선택 2", "선택 3"]
// }

  res.json({
    "type" : "buttons",
    "buttons" : ["반갑습니다. 카카오톡ID " + (process.env.KAKAO_ID || "{{kakaoid}}") + "를 찾아주세요."]
  });
});

router.post('/message', function(req, res, next) {
// req sample
// 
// curl -XPOST 'https://:your_server_url/message' -d '{
//   "user_key": "encryptedUserKey",
//   "type": "text",
//   "content": "차량번호등록"
// }'
// curl -XPOST 'https://your_server_url/message' -d '{
//   "user_key": "encryptedUserKey",
//   "type": "photo",
//   "content": "http://photo_url/number.jpg"
// }'

// res sample
// {
//     "message":{
//         "text" : "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!"
//     }
// }

// {
//   "message": {
//     "text": "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!",
//     "photo": {
//       "url": "https://photo.src",
//       "width": 640,
//       "height": 480
//     },
//     "message_button": {
//       "label": "주유 쿠폰받기",
//       "url": "https://coupon/url"
//     }
//   },
//   "keyboard": {
//     "type": "buttons",
//     "buttons": [
//       "처음으로",
//       "다시 등록하기",
//       "취소하기"
//     ]
//   }
// }

  res.json({
    message: {
      text: req.body.user_key + ' | ' + req.body.content + ' | ' + 'sended',
      photo: {
        url: 'http://loremflickr.com/320/240', // random image url from http://loremflickr.com/
        width: 320,
        height: 240
      }
    }
  });
});

router.post('/friend', function(req, res, next) {
// req sample

// curl -XPOST 'https://:your_server_url/friend' -d '{"user_key" : "HASHED_USER_KEY" }'

  res.sendStatus(200);
});

router.delete('/friend/:user_key', function(req, res, next) {
// req sample

// curl -XDELETE 'https://:your_server_url/friend/:user_key'

  res.sendStatus(200);
});

router.delete('/chat_room/:user_key', function(req, res, next) {
// req sample

// curl -XDELETE 'https://:your_server_url/chat_room/HASHED_USER_KEY'

  res.sendStatus(200);
});

module.exports = router;
