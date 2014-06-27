
function calculatePoints(activityValue,entryValue){
  var totalpoints=activityValue*entryValue;
  return totalpoints;
}
var pointWeeklyTotal;
var pointsSubmitted= function(){
  var transportAV = 10;
  var dailyWOAV = 15;
  var meditationAV = 15;
  var pushupAV=1;
  var soloWOAV = 15;
  var stairsAV = 2;
  var waterAV = 2;
  var pushupTotal=calculatePoints(pushupAV,pushup.value);    
  var transportTotal = calculatePoints(transportAV,transport.value);
  var dailyWOTotal = calculatePoints(dailyWOAV,dailyWO.value);
  var meditationTotal = calculatePoints(meditationAV,meditation.value);
  var soloWOPVTotal = calculatePoints(soloWOAV,solowo.value);
  var stairsTotal = calculatePoints(stairsAV,stairs.value);
  var waterTotal = calculatePoints(waterAV,water.value);
  var pointInputTotal = transportTotal+dailyWOTotal+meditationTotal+soloWOPVTotal+stairsTotal+waterTotal+pushupTotal;
var checkForInvalidChar=function(){
  // if (isNaN(pointInputTotal)){
  //   return true;
  // }
  // console.log("error");
  // return false;
}
  checkForInvalidChar();

  if (name.length === 0 || name === undefined)
          return;
      
var userScoreRef = classList.child(classNum).child(weekNum).child(name);

      if(htmlForPath[name] != undefined)
      {
        userScoreRef.once('value', function(snapshot) { 
          pointWeeklyTotal=snapshot.val().score;
          pointWeeklyTotal += pointInputTotal;
          userScoreRef.setWithPriority({ name:name, score:pointWeeklyTotal}, pointWeeklyTotal);
        });
      }else{
        
        pointWeeklyTotal=pointInputTotal;
        userScoreRef.setWithPriority({ name:name, score:pointWeeklyTotal}, pointWeeklyTotal);
      }

      // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
      



      // Track the highest score using a transaction.  A transaction guarantees that the code inside the block is
      // executed on the latest data from the server, so transactions should be used if you have multiple
      // clients writing to the same data and you want to avoid conflicting changes.
      // highestScoreRef.transaction(function (currentHighestScore) {
      //   if (currentHighestScore === null || newScore > currentHighestScore) {
      //     // The return value of this function gets saved to the server as the new highest score.
      //     // return newScore;
      //   }
      //   // if we return with no arguments, it cancels the transaction.
      //   // return;
      // });

}


var LEADERBOARD_SIZE = 1000;//Need to change to amt of students


  // Build some firebase references.
  var rootRef = new Firebase('https://hrhitest.firebaseio.com/');
  var userRef = rootRef.child("user");
  var msgRef = new Firebase('https://hrhitest.firebaseio.com/messages');
  var textRef=rootRef.child("msg");
  var highestScoreRef = rootRef.child("highestScore");
  var htmlForPath = {};
  var userScores={};

  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
 
  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  var loggedIn= function(name, classKey){
    var hrRef = classList.child(classKey).child(weekNum);
    hrRef.child(name).once('value', function(snapshot){
      var snapVal=snapshot.val();
      if (snapVal==null){
        snapVal={name: name, score: 0};
        hrRef.child(name).set(snapVal);
      }
      viewScore(hrRef);
    });

  };
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}
var weekNum=getWeekNumber(new Date()).join('-');
  function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    // variable = row 
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    // append row/newScoreRow with tableCell/td. Append tableCell/td with bold/em for text of scoreSnapshots value of the name
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));
    // append row/newscorerow with tablecell/td for text of scoreSnapshots value of the score
    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.name()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
    }
    userScores[scoreSnapshot.val().name]=scoreSnapshot.val().score;
  }

  // Helper function to handle a score object being removed; just removes the corresponding table row.
  function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.name()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.name()];
    delete userScores[scoreSnapshot.name()];
  
  }

  // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
var updateChart=function(){
  var data=[];
  for (var name in userScores){
    data.push({name:name, score:userScores[name]});
  }
  renderChart(data);
}
var viewScore=function(scoreListView){
  // Add a callback to handle when a new score is added.
  scoreListView.on('child_added', function (newScoreSnapshot, prevScoreName) {
    handleScoreAdded(newScoreSnapshot, prevScoreName);
    updateChart();
  });

  // Add a callback to handle when a score is removed
  scoreListView.on('child_removed', function (oldScoreSnapshot) {
    handleScoreRemoved(oldScoreSnapshot);
    updateChart();
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (scoreSnapshot, prevScoreName) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot, prevScoreName);
    updateChart();
  };
  scoreListView.on('child_moved', changedCallback);
  scoreListView.on('child_changed', changedCallback);
};

  // When the user presses enter on scoreInput, add the score, and update the highest score.
var profilePg =function(){ 
  table=document.getElementById("chart");
  table.style.display="none";
  subPoints=document.getElementById("form");
  subPoints.style.display="block";
  hrClass=document.getElementById("classButtons");
  hrClass.style.display="none";
  tabs=document.getElementById("normIcons");
  tabs.style.display="block";
  adminStuff=document.getElementById("adminElements");
  adminStuff.style.display="none";
  feedback=document.getElementById("feedback");
  feedback.style.display="block";
}
var homePg=function(){
  table=document.getElementById("chart");
  table.style.display="block";
  subPoints=document.getElementById("form");
  subPoints.style.display="none";
  hrClass=document.getElementById("classButtons");
  hrClass.style.display="none";
  tabs=document.getElementById("normIcons");
  tabs.style.display="block";
  adminStuff=document.getElementById("adminElements");
  adminStuff.style.display="none";
  feedback=document.getElementById("feedback");
  feedback.style.display="none";
}
var setClass=function(){
  table=document.getElementById("chart");
  table.style.display="none";
  subPoints=document.getElementById("form");
  subPoints.style.display="none";
  hrClass=document.getElementById("classButtons");
  hrClass.style.display="block";
  tabs=document.getElementById("normIcons");
  tabs.style.display="none";
  adminStuff=document.getElementById("adminElements");
  adminStuff.style.display="none";
  feedback=document.getElementById("feedback");
  feedback.style.display="none";
}
var adminPg =function(){ 
  table=document.getElementById("chart");
  table.style.display="none";
  subPoints=document.getElementById("form");
  subPoints.style.display="none";
  hrClass=document.getElementById("classButtons");
  hrClass.style.display="none";
  tabs=document.getElementById("normIcons");
  tabs.style.display="block";
  adminStuff=document.getElementById("adminElements");
  adminStuff.style.display="block";
  feedback=document.getElementById("feedback");
  feedback.style.display="none";

}
var msgRef = new Firebase('https://hrhitest.firebaseio.com/messages');
var setup = function(){
  msgRef.on('value', function(snapshot){
    if (snapshot.val()!=null){
      console.log(snapshot.val().msg)
      $('#displayMsg').text(snapshot.val().msg);    
    }
  });
}
var updateMsg= function(){
  msgRef.set({msg:$("#dailyMsg").val()});
}
$(setup);