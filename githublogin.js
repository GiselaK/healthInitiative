var chatRef = new Firebase('https://hrhitest.firebaseio.com/ ');
var addToHrClass = function (){
   $(document).ready(function () {
    var hr12function= function(){
    var hr12button = $('#addHR12');
    hr12button.on('click', function () {
    var hr12root = rootRef.child("hr12");
    var person = {name: name, score: 0}
    hr12root.set(person);
    homePg();
    });
    }
    var hr13function= function(){
    var hr13button = $('#addHR13');
    hr13button.on('click', function () {
    var hr13root = rootRef.child("hr13");
    var person = {name: name, score: 0}
    hr13root.set(person);
    homePg();
    });
    }
    var hr14function= function(){
    var hr14button = $('#addHR14');
    hr14button.on('click', function () {
    var hr14root = rootRef.child("hr14");
    var person = {name: name, score: 0}
    hr14root.set(person);
    homePg();
  });
    }
    hr12function();
    hr13function();
    hr14function();
    console.log("fuck")
  })
}

var checkAdmin= function(){
   if (name="GiselaKay"){
    admins=document.getElementById("admin");
    admins.style.display="block";
    console.log("admin access!!");
  }
}

var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if(justloaded){
    justloaded=false;
  }
  else{
    name=user.username;
    checkAdmin();
    if(htmlForPath[name] === undefined){
      setClass();
      addToHrClass();
    }

    console.log(user.thirdPartyUserData.avatar_url);
    console.log(user)

  }
  if (error||user.username==="undefined") {
    alert("ERROR: Problem signing in. Please refresh and try again. If this error is reocurring you might need to enable pop-ups for this page or try on another browser.")
  } else if (user) {
    if (name!="undefined"){
    var h1 = $('<h1/>');
    h1.text(name);
    $('body').prepend(h1);
    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
  }
  } else {
    // user is logged out
  }
});
var name = "undefined";
var justloaded=true;
auth.login('github');

// nameHide=document.getElementById('nameInput');
// nameHide.style.display="none";