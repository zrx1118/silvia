
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.bodyParser()); //bodyParser 的功能是解析客户端请求，通常是通过 POST 发送的内容
app.use(express.methodOverride()); //  methodOverride用于支持定制的 HTTP 方法
app.use(app.router); // router是项目的路由支持
app.use(express.static(path.join(__dirname, 'public'))); // static 提供了静态文件支持。

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler()); // errorHandler 是错误控制器。
}

app.get('/', routes.index);
app.get('/hello', routes.hello);
app.all('/user/:username', function(req, res, next) {
    console.log('one method captured');
    next();
});
app.get('/user/:username', function(req, res) {
    console.log('second methods captured');    
    res.send('user2: ' + req.params.username);
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
