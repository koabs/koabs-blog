/**
 * Created by kevin1 on 5/2/16.
 * 文章实体
 */

var mongoose = require('mongoose');
var db = require('./mongo').db;
var tableName = require('./mongo').tables;

var ArticleSchema = new mongoose.Schema({
    _id: Number,
    author: String, // 作者名称
    date: Date, // 发布时间
    status:Number, // 状态 0 禁用 1 启用
    title:String, // 标题
    content:String, // html格式内容
    mdContent:String, // markdown 格式内容
    visitors:Number, // 访问次数
    updateTime:Date, // 更新时间
    //collection:Number, // 属于哪个专辑
    tagsIdList:[Number], // 标签ID列表
    top:Number // 0不置顶, 1置顶
});

var ArticleModel = db.model(tableName.article, ArticleSchema, tableName.article);
var article = {
    create:function(obj, callback){
        var articleEntity = new ArticleModel(obj);
        articleEntity.save(callback);
    },
    update: function (obj, callback) {
        var articleEntity = new ArticleModel(obj);
        articleEntity.save();
    },
    check:function(obj, callback) {
        ArticleModel.find({name:obj.name},null, function (err, doc){
            console.log(err);
            console.log(doc)
            console.log(doc[0].email);
            callback(err, doc);
        });
    },
    deleteById: function (_id, callback) {
        ArticleModel.remove(err, {_id:_id});
    }
};

module.exports = {
    create:article.create,
    update:article.update,
    deleteById:article.deleteById
};