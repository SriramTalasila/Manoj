
$(document).ready(() => {

	var firebaseConfig = {
		apiKey: "AIzaSyAY9D0z96KVPjIedXhRfYSFpq9uhTSS2fg",
		authDomain: "inventory-745b2.firebaseapp.com",
		databaseURL: "https://inventory-745b2.firebaseio.com",
		projectId: "inventory-745b2",
		storageBucket: "",
		messagingSenderId: "925122077794",
		appId: "1:925122077794:web:59908a6cddd42fe0"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	var database = firebase.database();
	loadPage();

	writeUserData("ss", "name", "emmnda", "dsds");
	function writeUserData(userId, name, email, imageUrl) {
		database.ref('users/' + userId).set({
			username: name,
			email: email,
			profile_picture: imageUrl
		});
	}


	$("#add").click(() => {
		var name = $("#name").val();
		var description = $("#description").val();
		database.ref('Category/').push().set({
			Category_Name: name,
			description: description,

		}, () => {
			alert("new Product added succesfully");
			$("#name").val("");
			$("#description").val("");
			$("#myModal").modal('toggle');
		});
	})

	function loadPage() {
		database.ref('Category/').on('value', function (snapshot) {
			var data = snapshot.val();
			var i = 1;
			$("tbody").empty();
			for (var key in data) {
				var c = '<tr><td>' + (i++) + '</td><td><a href="./productinfo.html	" onclick="navigate()"><h5 data-id ="' + key + '">' + data[key].Category_Name + '</h5></a><p>' + data[key].description
					+ '</p></td></tr>'
				$(c).appendTo("tbody");
			}
		});
	}

	$("h5").click(() => {

	})
})