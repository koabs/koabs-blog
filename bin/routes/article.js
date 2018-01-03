var express = require('express');
var router = express.Router();
var articleDao = koabs.dao.article;
/**
 * 文章列表页面
 * @param pageNum
 * @param pageSize
 */
router.get('/', function(req, res, next) {
  articleDao.findByPage({},function(error,ret) {
    res.render('admin/article_list', { title: '文章列表' });
  });
});

/**
 * 文章详情页面
 */
router.get('/:id', function(req, res, next) {
  articleDao.find({_id:'-1'},function(error, ret) {
    res.render('admin/article_edit',ret);
  })
});

/**
 * 删除文章
 */
router.post('/delete', function(req, res, next) {
  articleDao.deleteById({_id:'-1'},function(error, ret) {
    res.send('删除成功');
  }); 
});

/**
 * 保存文章
 *
 */
router.post('/save', function (req, res, next) {
  var article = req.body;
  if (article._id) {
    article._id = null;
  }
  Promise.
  articleDao.save(article, function (err, ret) {
    var tags = article.tags.split(",");
    article._id = ret._id;
    
    console.log(ret);
    res.json(article);   
  });
  //1. 分割tags 保存对应的标签
  //2. 把不存在的tag保存到数据库
  //3. 把tagId查询出来保存到文章里面

  //// 更新文章tagIds数组
  //each(tags,function(k){
  //  // 查询保存或者更新,把返回的tag Id 反写到artice tagIds数组中 同时更新文章列表
  //
  //})
  //更新Tag文章列表
 
 
});

module.exports = router;
