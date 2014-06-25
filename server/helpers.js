var sendHome = function(req, res){
	res.sendfile("RefactoringHealthInitiative.html")
}
module.exports = {
	sendHome: sendHome;
}