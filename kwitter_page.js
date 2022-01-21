var firebaseConfig = {

  apiKey: "AIzaSyAJYqiNcwjkRXl4tf64Sk-k2-oc_TPpg8w",

  authDomain: "instatok-30204.firebaseapp.com",

  databaseURL: "https://instatok-30204-default-rtdb.firebaseio.com",

  projectId: "instatok-30204",

  storageBucket: "instatok-30204.appspot.com",

  messagingSenderId: "348911795586",

  appId: "1:348911795586:web:d8fbd66d797bdafb59639b"


};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




	username = localStorage.getItem("user_name");
	roomname = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
   firebase.database().ref(roomname).push({
    name:username,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}
  function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
  //Start code
     name= message_data['name'];
     message= message_data['message'];
     like= message_data['like'];
     name_with_tag= "<h4>" + name+"<img class='user_tick' src='tick.png'></h4>";
     message_with_tag= "<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
     span_with_tag = "<span class= ' glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";

    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row; 
  //End code
} });  }); }
getData();

function updateLike(message_id)
{
  button_id= message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;

  firebase.database().ref(roomname).child(message_id).update(
    {
      like: updated_likes
    });
  
}


