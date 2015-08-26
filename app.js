var express = require('express');
var app = express();
var Hogan = require('hogan.js');
var mandrill = require('node-mandrill')(process.arv[2]);
var fs = require('fs');

var template = fs.readFileSync('./views/email.hjs', 'utf-8');
var compiledTemplate = Hogan.compile(template);

app.get('/', function(req, res) {
  
  mandrill('/messages/send', {
    message: {
      to: [{
        email: 'dave@havenlife.com',
        name: 'Dave Kerr'
      }],
      from_email: 'davek09@gmail.com',
      subject: 'Testing out Mandrill, yo.',
      html: compiledTemplate.render({
        firstName: 'Dave',
        lastName: 'Kerr'
      })
    }
  }, function(error, response) {
    if (error) { return res.send(JSON.stringify(error)); }
    res.send('Email sent, yo!');
  });
});

app.get('/preview', function(req, res) {
  res.render('email', {
    firstName: 'Dave',
    lastName: 'Kerr',
    age: 28
  },
  function(err, html){
    console.log(html);
  });
});


var server = app.listen(3001, function() {
  
});

