// set up

var express = require('express');
var app = express();
var mongoose = require('mongoose');

//configuration

mongoose.connect("mongodb://TodoTest:hello@novus.modulusmongo.net:27017/nO4derom");

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

// define model

var Todo = mongoose.model('goingTodo', {
	text: String
});

//routers

app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if(err) res.send(err);
		res.json(todos);
	});
});

app.post('/api/todos', function(req, res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, result) {
		if(err) res.send(err);
		console.log("app.post " + result);

		Todo.find(function(err,todos) {
			if(err) res.send(err);
			res.json(todos);
		});
	});
});

app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, result) {
		if(err) res.send(err);
		console.log('app.delete ' + result);

		Todo.find(function(err, todos) {
			if(err) res.send(err);
			res.json(todos);
		});
	});
});

// application

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

//listen 

app.listen(8080);
console.log("App listening on port 8080!");