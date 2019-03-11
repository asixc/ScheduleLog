// Comprobamos si esta logeado:
firebase.auth().onAuthStateChanged( function(user){
	if (user) {
		window.location ='index.html';
		//window.location ='index.html';
	}
});

var database = firebase.database();
console.log("database->" ,  database);
window.onload = function (){
	document.getElementById('user').focus();
}

function login(id,pss){
	console.log(id,pss);
	if ( id!= "" && pss != "") {
		firebase.auth().signInWithEmailAndPassword(id, pss).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage,errorCode)
			// ...
		});
	}else{
		console.log("No datos");
	}
	
}