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
  
  var rooms = {};
  var friends = {};


  var app = {  
    init: function(){
        //event binding - submit button, click events, event listeners, run after everything
      app.fetch(); 
      roomHandler();
    },
    send: function(message){
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

    },

    fetch: function(){

        $.ajax({
          url: 'https://api.parse.com/1/classes/chatterbox',
          type: 'GET',
          //data: JSON.stringify(message),
          contentType: 'application/json',

          success:  function(data) {
            dataHandler(data);
            console.log('chatterbox: Message recieved. Data: ', data);
            },

          error: function (data) {
            console.error('chatterbox: Failed to recieve message. Error: ', data);
          }  

           
        });


      }

       

  };

  var addRoom = function(rooms){
    for(var key in rooms){
      $('#roomSelect').append('<option value= "' + key + '">' + key + '</option>');
    }
  };

  var roomHandler = function(){
    // $('#roomSelect').change(function(){
    //   if($('#roomSelect').val() === data.results[i].roomname) {   
    //       // empty container
    //     $('.messageContainer').empty();
    //     // append messages with roomname
    //     addMessages(data.results[i])
    //   }
      
    // })
  }

  var dataHandler = function (data){ 
    for(var i = 0; i < data.results.length; i++){
        addMessages(data.results[i]);
    
      // Check for rooms
      if(!rooms[data.results[i].roomname]){
        //console.log(data.results[i].roomname)
        rooms[data.results[i].roomname] = data.results[i].roomname;
      }
      
      // Check for friends
      if(!friends[data.results[i].username]){
        friends[data.results[i].username] = data.results[i].username;
      }
    }

      $('#roomSelect').change(function(){
        console.log($('#roomSelect').val());
        $('.messageContainer').empty();
        for(var i = 0; i < data.results.length; i++){

          if(data.results[i].roomname !== undefined ){
            if($('#roomSelect').val() === data.results[i].roomname) {   
              // if(data.results[i] !== undefined && )
              // empty container
              
              // append messages with roomname
              addMessages(data.results[i]);
            }
          }
        }
    });
    

    addRoom(rooms);
  };

  var addMessages = function(message){
    user = message.username;
    text = message.text;  
    $('.messageContainer').append('<div class="message">' + user + ':\n' + text + '\n' + '</div>');
  };

  app.init(); 
  
  //event handler

    //clear container
    //append with messages that only have that room
  

  var addFriend = function(){

  };

  var handleSubmit = function() {

  };
  




});

