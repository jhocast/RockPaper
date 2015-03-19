var http = require("http"),
    server,
    appStats = { outcome: "", wins: 0, losses: 0, ties: 0};


server = http.createServer(function (req, res) {
    "use strinct";
    res.writeHead(200, {"Content-Type": "text/plain"});
    var selections = {	'/play/rock': {'name': 'rock', 'win': ['scissors', 'lizard']},
						'/play/paper': {'name' :'paper', 'win': ['rock', 'spock']},
						'/play/scissors': {'name' : 'scissors', 'win': ['lizard', 'paper']},
						'/play/lizard': {'name' : 'lizard', 'win': ['spock', 'paper']},
						'/play/spock': {'name' : 'spock', 'win': ['rock', 'scissors']}
					};
    var selectKeys = Object.keys(selections);
    var userRequest = selections[req.url];
    if (userRequest) {
    	console.log('url entered', req.url);
    	var serverResponse = selections[selectKeys[getRandom(selectKeys.length-1)]];

    	console.log('user Request', userRequest);
    	console.log('server Response', serverResponse);
    	if (userRequest.name==serverResponse.name) {
    		console.log	("tie game");
    		appStats.ties += 1;
    		appStats.outcome = 'tie';
    	} else {
    		if (userRequest.win.indexOf(serverResponse.name) > -1) {
    			console.log("you won");
    			appStats.wins += 1;
    			appStats.outcome= 'won';
    		} else {
    			console.log("Game won");
    			appStats.losses += 1;
    			appStats.outcome = 'loss';
    		}
    	}
    	console.log(appStats);
	res.end(JSON.stringify(appStats));
    } else {
	res.write("Incorrect url entered!\nWanna play, the url to select are:\n");
	res.end(JSON.stringify(selectKeys));
    }

    function getRandom(max) {
  	return Math.floor(Math.random()*max);
    }

});

server.listen(3000);

console.log("Server running on port 3000");
