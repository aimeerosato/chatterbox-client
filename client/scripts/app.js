
var app;
$(document).ready(function() {
  
  var rooms = {};
  var friends = {};

  app = {  
    username: 'anon',
    room: 'lobby',
    recievedData: [],
    init: function(){
        //event binding - submit button, click events, event listeners, run after everything
      //setInterval( function() { app.fetch() } , 1000);
      app.username = window.location.search.substr(10);  
      app.fetch();

      // Displaying Messages in Rooms
      $('#roomSelect').change(function(){
        $('.messageContainer').empty();
        for(var i = 0; i < app.recievedData.length; i++){
          if(app.recievedData[i].roomname !== undefined ){
            if($('#roomSelect').val() === app.recievedData[i].roomname) {   
              addMessages(app.recievedData[i]);
            }
          }
        }
      });
      $('#messageSubmit').on('submit', function(e){
        e.preventDefault();
        var text = $('#message').val();
        var finalMessage = createMessage(text);
        //$('.messageContainer').empty();
        app.send(finalMessage);
        app.fetch();
      });
    
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
          data: {order: '-createdAt'},
          contentType: 'application/json',
          success:  function(data) {
            dataHandler(data);
            app.recievedData = data.results;
            // app.recievedData = (data.results).slice(0, 99);
            // (app.recievedData).push(data.results);
            console.log('chatterbox: Message recieved. Data: ', data);
          },

          error: function (data) {
            console.error('chatterbox: Failed to recieve message. Error: ', data);
          }    
        });
      }
  };

  var addRoom = function(rooms){
    
    // Append new roons to dropdown only
    for(var key in rooms){
      $('#roomSelect').append('<option value= "' + key + '">' + key + '</option>');
    }
  };

  var dataHandler = function (data){ 
    //$('#roomSelect').html('<option value= "newRoom"> New Room...</option> <option value="lobby" selected> lobby</option>');
    // var rooms = {};
    for(var i = 0; i < data.results.length; i++){
        addMessages(data.results[i]);
    
      // Check for rooms
      // User can add room 
      
      console.log(data.results[i].roomname);
      if(!rooms[data.results[i].roomname] ){
        //console.log(data.results[i].roomname)
        rooms[data.results[i].roomname] = data.results[i].roomname;

      }
    }
      
    //   // Check for friends
    //   if(!friends[data.results[i].username]){
    //     friends[data.results[i].username] = data.results[i].username;
    //   }
    // }
    console.log(rooms);
    addRoom(rooms);
    
  };

  var addMessages = function(message){
    user = message.username;
    text = message.text;  
    var newDiv = $('<div class="message"></div>');
    var fullMessage = user + ':\n' + text;
    newDiv.text(fullMessage);
    $('.messageContainer').append(newDiv);
  };

  var createMessage = function(text){
    var message = {};
    message.username = app.username;
    message.text = text;
    message.roomname = $('#roomSelect').val();
    return message;
  };
 
  //createMessage();
  app.init(); 
  //event handler
    //clear container
    //append with messages that only have that room
  

  var addFriend = function(){

  };

  var handleSubmit = function() {

  };
  




});

