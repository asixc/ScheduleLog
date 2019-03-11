//---------------------- VARIABLES
var User;
var days = new Array();
var jobs = new Array();
//divs:
var rDays = document.getElementById('rDays');
var rJobs = document.getElementById('rJobs');
var rUates = document.getElementById('rUates');
var rHoras = document.getElementById('rHoras');
var formSelectJobs = document.getElementById('selectJobs');

//Instancias:
//	- Instanciamos la BD:
db = firebase.firestore(app);



//---------------------- FUNCIONES
function leerBD(columna){
	if (columna == "day") {
		days = [];
		db.collection(columna).get().then(function(querySnapshot) {
	    querySnapshot.forEach(function(doc) {
	    	var object = doc.data();
	    	object.ide = doc.id;
	        //console.log(doc.id, " => ", doc.data(),doc);
	        days.push(object);
	        //console.log("var days= ", days);
	        actualizar();
		    });
		});
	}else{
		jobs = [];
		db.collection(columna).get().then(function(querySnapshot) {
	    querySnapshot.forEach(function(doc) {
    		jobs.push(doc.data());
	        //console.log(doc.id, " => ", doc.data(),doc);
	        actualizar();
		    });
		});
	}
	
}

//Agregar día:
function agregateDay(f,hi,hf,tcomida,comentario,jb){
	console.log(f,hi,hf,tcomida,comentario,jb);
	if (f != "" && hi != "" && hf != "" && tcomida != "" && comentario != "" & jb != undefined) {
		db.collection("day").add({
			fecha_registro: new Date(),
			fecha: f,
			hora_ini: hi,
			hora_fin: hf,
			job: jb,
			descontar_comida: tcomida,
			comentario: comentario
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
	}else{
		console.log("datos en blanco");	
	}
	
}
//Funcion para resetear contadores: 
function resetCount(){
	rDays.innerHTML = 0;
	rJobs.innerHTML = 0;
	rUates.innerHTML = 0;
	rHoras.innerHTML = 0;
}

//Funcion que actuliaza toda la info de la web: 
function actualizar(){
	rDays.innerHTML = days.length;
	rJobs.innerHTML = jobs.length;
	//rUates.innerHTML = 0;
	//rHoras.innerHTML = 0;
}

//Funcion que llamamos al abrir el modal para que nos cargue el select con los jobs que tengamos:
function actualizaSelect(){
	jobs.forEach(function(element) {
		formSelectJobs.innerHTML += '<option>' + element.nombre + '</option>';
	});
}

//Cerrar sesion: 
function logOut(){
	console.log("logout", firebase);
	firebase.auth().signOut().then(function() {
		window.location('access.html');
	}).catch(function(error) {
		// An error happened.
	});
}

//---------------------- MAIN
// LISTENER LOGIN:
firebase.auth().onAuthStateChanged( function(user){
	if (user) {
		var URLactual = window.location;
		User = user;
		//window.location ='index.html';
	}else{
		window.location ='access.html';
	}
});
// LISTENER BD:
db.collection("day")
    .onSnapshot(function(snapshot) {
        //console.log("snapshot->",snapshot);
        leerBD("day");
    }, function(error) {
       	console.log("error->",error);
    });

db.collection("jobs")
    .onSnapshot(function(snapshot) {
        //console.log("snapshot->",snapshot);
        leerBD("jobs");
    }, function(error) {
       	console.log("error->",error);
    });

//Iniciamos contadores:
resetCount();
//leerBD("jobs");
//leerBD("day");



//---------------------------  MODAL:
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementById("closeModal");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  actualizaSelect();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}