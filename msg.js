var theRef = new Firebase('https://hrhitest.firebaseio.com/ ');

//$("#dailyMsg").val(); 
var setup = function(theRef){
var yo=3;
  var h2 = $('<h2/>');
  h2.text(yo);
  $('body').prepend(h2);
}
setup();