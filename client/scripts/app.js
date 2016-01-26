// Setup refresh displayed messaged (automatically or with a button)
  // Escape user input
  // Button on-click

// Users select username

// Users send messages

// Users create rooms

  // class for each room
  // check room property
    //if no room name, assign general room
    // append to class it matches

// Users enter and exit rooms

// 'befriend' other uses by click on username

// display messages by friends in bold

// Display messages recieved 

$(document).ready(function() {

  var app = {
    init: function(){},
    send: function(){},
    fetch: function(){}
  };

// POST Method - SEND METHOD

var message = {
  username: 'aimeeandfanny',
  text: 'time zones different',
  roomname: '4chan'
};

$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent. Data: ', data);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message. Error: ', data);
  }
  });

// GET Method - FETCH METHOD

  $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        //data: JSON.stringify(message),
        contentType: 'application/json',
        success:  function(data) {
            console.log(GetMessages(data));
            console.log('chatterbox: Message recieved. Data: ', data);
          },
        error: function (data) {
          console.error('chatterbox: Failed to recieve message. Error: ', data);
        }   
  });

  var GetMessages = function(dataFromServer){
    for(var i = 0; i < dataFromServer.results.length; i++){
      this.user = dataFromServer.results[i].username;
      this.text = dataFromServer.results[i].text; 
      $('.messageContainer').append('<div class="message">' + this.user + ':\n' + this.text + '\n' + '</div>');
    }
  };

  // DELETE Messages - Remove Method

});

