var express = require('express');
var request = require('request');

var app = express();

app.get('/todo/:key/:task', function(req, res) {
    if(req.params.key == process.env.SECRET_KEY) {
        request({
            url: "https://habitica.com/api/v3/tasks/user",
            method: "POST",
            headers: {
                "content-type": "application/json",  
                "x-api-user": process.env.HABITICA_USER,
                "x-api-key": process.env.HABITICA_KEY 
            },
            json: { 
                "text": req.params.task, 
                "type": "todo" 
            }
        }, function (error, response, body){
            if (error) {
                console.log(error)
            }

            if (response.body.success) {
                res.send("Successfully added " + req.params.task)
            } else {
                res.send("Something broke...")
            }
        });
    } 
});

app.get('*', function(req, res) {
    res.send("Correct path: /todo/:key/:task")

});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');
