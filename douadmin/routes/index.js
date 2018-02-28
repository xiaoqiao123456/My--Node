var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require('multiparty');

/* GET home page. */
//登录页路由
router.get('/', function(req, res,next) {
  res.render('login', {});
});
//首页路由
router.get('/index', function(req, res,next) {
  res.render('index', {});
});
//头部路由
router.get('/head', function(req, res,next) {
  res.render('head', {});
});
//导航菜单路由
router.get('/left', function(req, res,next) {
  res.render('left', {});
});
//小箭头路由
router.get('/center', function(req, res,next) {
  res.render('center', {});
});
//添加商品页路由
router.get('/right', function(req, res,next) {
  res.render('right', {});
});

//查询功能
router.post('/api/search',function(req,res){
	GoodsModel.find({ goods_name :{ $regex:req.body.goods_name } }, function(err, docs) {
		res.send(docs);//docs是查询结果，是一个数组
	})
})

//删除功能
router.post('/api/del',function(req,res){ 
	GoodsModel.remove({ goods_name : req.body.name },function(err,docs){
		res.send(docs);
	})
})

//商品列表路由
router.get('/right_list', function(req, res){
	GoodsModel.find({}, function(err, docs) {
		res.render("right_list", {list: docs});
	}).limit(2)
})

//文件上传
router.post('/api/add_goods',function(req,res){
	var Form = new multiparty.Form({
		uploadDir: "./public/images"
	})
	Form.parse(req, function(err, body, files){
		var goods_name = body.goods_name[0];
		var price = body.price[0];
		var imgName = files.img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\") + 1);
		console.log(goods_name,price,imgName);
		//res.send("文件上传成功");
		//保存功能（保存到数据库）
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.price = price;
		gm.img = imgName;
		gm.save(function(err){
			if(!err) {
				res.send("商品保存成功");
			} else {
				res.send("商品保存失败");
			}
		})
	})
})
//登录处理
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
