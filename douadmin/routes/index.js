var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('login', {});
});

router.get('/index', function(req, res,next) {
  res.render('index', {});
});
router.get('/head', function(req, res,next) {
  res.render('head', {});
});
router.get('/left', function(req, res,next) {
  res.render('left', {});
});
router.get('/center', function(req, res,next) {
  res.render('center', {});
});
router.get('/right', function(req, res,next) {
  res.render('right', {});
});
router.get('/right_list', function(req, res,next) {
  res.render('right_list', {});
});

router.post('/api/login',function(req, res){
	var username = req.body.username;
	var psw = req.body.psw;
	console.log(username,psw);
	var result = {
		status: 1,
		message: "登录成功"
	}
	
	UserModel.find({username:username,psw:psw}, function(err, docs){
		console.log(docs);
		if(!err) {
			console.log("登录成功");
			res.send(result);
		} else {
			console.log("登录失败，请检查您的用户名或者密码");
			result.status = -109;
			result.message = "登录失败，请检查您的用户名或者密码"
			res.send(result);	
		}
	})
})
module.exports = router;
