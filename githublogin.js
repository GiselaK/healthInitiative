var chatRef = new Firebase('https://hrhitest.firebaseio.com/ ');
var classList = new Firebase('https://hrhitest.firebaseio.com/classList')
var addToHrClass = function (){
  $(document).ready(function () {
    $('button[data-key]').on('click', function (e) {
      var key = $(this).data('key');
      classList.child(key).child(weekNum).child(name).set({name: name, score: 0});//creating class
      userRef.child(name).set(key);//add user to classs
      classNum=key;
      loggedIn(name,key);
      homePg();
    });
  });
};

//want: for every child(class) make button
//currently: for every button make class
var showAdminButton=function(){
    admins=document.getElementById("admin");
    admins.style.display="block";
}
var checkAdmin= function(){
   if (name=="GiselaKay"||"hrhiadmin"){
    showAdminButton();
  }
}
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if(justloaded){
    justloaded=false;
    return;
  }

  if (user===null || error || user.username === "undefined") {
    alert("ERROR: Problem signing in. Please refresh and try again. If this error is reocurring you might need to enable pop-ups for this page or try on another browser.")
    return;    
  }
  var getPic= function(){
    document.getElementById("userPic").src=user.thirdPartyUserData.avatar_url;
  }

  name = user.username;
  getPic();
  checkAdmin();
  userRef.once('value', function (snapshot) {
    var users = snapshot.val() || {};
    if(users[name] === undefined){
      setClass();
      classList.on('value', function(dataSnapshot) {
      for(var key in dataSnapshot.val()){
      console.log(key)
      if (typeof dataSnapshot.val()[key]!== "object"){
      $("#classButtons").append("<button id='add"+dataSnapshot.val()[key]+"' data-key='"+dataSnapshot.val()[key]+"'>"+dataSnapshot.val()[key]+"</button>");
      addToHrClass();
       }
    }
  })
    } else {
      classNum=users[name];
      loggedIn(name, users[name]);    
    }
    $('#loginName').text(name);
  });
});

var name = "undefined";
var classNum="";
var justloaded=true;
auth.login('github');


// nameHide=document.getElementById('nameInput');
// nameHide.style.display="none";