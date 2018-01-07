var express = require('express');
var router = express.Router();
var usersDao = koabs.dao.users;
var articleDao = koabs.dao.article;

/**
 * 前台首页
 */
router.get('/', async (req, res, next) => {
  articleDao.findByPage({pageSize:10,pageNo:1},function(error,ret) {
    res.render('index', ret);
  });
});

/**
 * 文章列表
 */
router.get('/page/:pageNo', function(req, res, next) {
  let pageNo = req.params.pageNo
  articleDao.findByPage(req.query,function(error,ret) {
    res.json(ret);
  });
  res.render('index', { title: 'Koabs' });
});

/**
 * 标签列表
 */
router.get('/tags', function(req, res, next) {
  // ?id=T1
  res.render('index', { title: 'Koabs' });
});

/**
 * 标签文章列表
 */
router.get('/tag/page/:pageNo', function(req, res, next) {
  // ?id=T1
  res.render('index', { title: 'Koabs' });
});

/**
 * 专题列表
 */
router.get('/specials', function(req, res, next) {
  // 正则匹配
  res.render('index', { title: 'Koabs' });
});

/**
 * 专题文章列表
 */
router.get('/special/page/:pageNo', function(req, res, next) {
  // 正则匹配
  res.render('index', { title: 'Koabs' });
});

/**
 * 文章详情
 */
router.get('/article/:id', function(req, res, next) {
  res.render('index', { title: 'Koabs' });
});

/**
 * 小玩意 
 */
router.get('/tools', function(req, res, next) {
  res.render('index', { title: 'Koabs' });
});

/**
 * 知识拓展 
 */
router.get('/extsite', function(req, res, next) {
  res.render('index', { title: 'Koabs' });
});

/**
 * 关于我 
 */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'Koabs' });
});

/*  后台页面Controller */
router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: '登入',error:'' });
});

router.post('/login', async (req, res, next) => {
  let username = req.body.username;
  let password =  req.body.password;
  let user = await usersDao.login(req.body);
 
  if(user) {
    // 放入session
    req.session.user = user;
    res.redirect("/dashboard")
  } else {
    // 登入错误
    res.render('admin/login', { title: '登入',error:'用户名或者密码错误' });
  }
 
});

module.exports = router;
