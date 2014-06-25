var chatRef = new Firebase('https://hrhitest.firebaseio.com/ ');
var addToHrClass = function (){
  $(document).ready(function () {
    $('button[data-key]').on('click', function (e) {
      var key = $(this).data('key');
      rootRef.child(key).child(name).set({name: name, score: 0});
      userRef.child(name).set(key);
      homePg();
    });
  });
};

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
    return;
  }
  if (!(error||user.username==="undefined")){
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
    loggedIn(name);
    $('#loginName').text(name);
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