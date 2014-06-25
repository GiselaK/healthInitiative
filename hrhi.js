var pointsSubmitted= function(){
	var transportPV	=10;
	var dailyWOPV	=15;
	var meditationPV=15;
	var soloWOPV	=15;
	var stairsPV	=2;
	var waterPV		=2;
	var transportTotal 	= transportPV*transport.value;
	var dailyWOTotal 	= dailyWOPV*dailyWO.value;
	var meditationTotal = meditationPV*meditation.value;
	var soloWOPVTotal 	= soloWOPV*solowo.value;
	var stairsTotal		= stairsPV*stairs.value;
	var waterTotal		= waterPV*water.value;
	console.log(transportTotal)

}
// $("#scoreInput").keypress(function (e) {
//     if (e.keyCode == 13) {
//       var newScore = Number($("#transport" + "dailyWO" + "meditation").val());
//       var name = $("#nameInput").val();
//       $("#scoreInput").val("");