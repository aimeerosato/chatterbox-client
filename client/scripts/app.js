// YOUR CODE HERE:
/*var message = {
  username: 'shawndrost',
  text: 'trololo',
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
});*/

// Display messages recieved 

$(document).ready(function() {


  $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        //data: JSON.stringify(message),
        contentType: 'application/json',
        success:  function(data) {
            console.log(getMessages(data));
            console.log('chatterbox: Message recieved. Data: ', data);
          },
        error: function (data) {
          console.error('chatterbox: Failed to recieve message. Error: ', data);
        }   
  });

var getMessages = function(dataFromServer){
  // [{sd: message}, {jr: fjdkfj}]
  var messageData = [];
  var userMessage = {};
    messageData.user = dataFromServer.results[0].username;
    messageData.text = dataFromServer.results[0].text; 
    $('.messageContainer').append('<div class="message"></div>');
    $('.messageContainer div').append(messageData.user + ':\n' + messageData.text + '\n');
  }
  return messageData;


});

// Setup refresh displayed messaged (automatically or with a button)
  // Escape user input

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