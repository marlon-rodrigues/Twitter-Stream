/* NOTES
 - The function getResults is called on the firt load and on every time the socket receives a message
 - The results page only receives messages from the socket - message is sent upon user voting
*/
$(document).ready(function(){ 
		//open socket with the server
	//var socket = io.connect('http://localhost:3001');
	var socket = io();

		//listens to votes
    socket.on('twitter-stream-track', function(data){
        //console.log(data);       
    });

    	//listens to votes
    socket.on('twitter-search-results', function(data){
        console.log(data);     
        createTwitts(data);  
    });

    //listens to votes
    socket.on('twitter-search-raw-results', function(data){
        //console.log(data);       
    });

        // Listens for a success response from the server to 
    	// say the connection was successful.
    /*socket.on("connected", function(data) {
      	//Now that we are connected to the server let's tell 
      	//the server we are ready to start receiving new tweets.
      socket.emit("get-twitts-stream-track");

      	//We are ready to recieve all old tweets
      socket.emit("get-twitts-search");
      socket.emit("get-twitts-search-raw");
    });*/
    socket.emit("get-twitts-search");
    socket.emit("get-twitts-search-raw");

    var arrTweets = [];
    var arrUsers = [];

    function createTwitts(data) {
    	var htmlString = '';
    	var idxCount = 0;


    	for(var idx in data) {
    		if(idxCount == 0) {
    			htmlString += '<div class="tweet-item-container animated current zoomInUp">';
    		} else {
				htmlString += '<div class="tweet-item-container animated">';
    		}    		
    		//htmlString += '<div class="user">' + data[idx].user + '</div>';
    		htmlString += '<div class="tweet">' + decodeURIComponent(data[idx].tweet) + '</div>';
    		htmlString += '<div class="txtlzr"></div>';
    		htmlString += '</div>';
    		idxCount++;

    		arrTweets.push(decodeURIComponent(data[idx].tweet));
    		//arrUsers.push('<div>' + data[idx].user + '</div>');
    		arrUsers.push(decodeURIComponent(data[idx].tweet));
    	}

    	$('#twitter-container').append(htmlString);

		var txt = $('#txtlzr');  // The container in which to render the list
		var txtuser = $('#txtlzruser');

		var options = {
		  duration: 20000,          // Time (ms) each blurb will remain on screen
		  rearrangeDuration: 10000, // Time (ms) a character takes to reach its position
		  effect: 'random',        // Animation effect the characters use to appear
		  centered: true           // Centers the text relative to its container
		}

		var optionsuser = {
		  duration: 20000,          // Time (ms) each blurb will remain on screen
		  rearrangeDuration: 10000, // Time (ms) a character takes to reach its position
		  effect: 'random',        // Animation effect the characters use to appear
		  centered: true           // Centers the text relative to its container
		}

		txt.textualizer(arrTweets, options); // textualize it!
		//txt.textualizer('start'); // start

		txtuser.textualizer(arrUsers, optionsuser); // textualize it!

		txt.textualizer('start'); // start
		txtuser.textualizer('start'); // start
    }

});