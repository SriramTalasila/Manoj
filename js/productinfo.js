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
		var arr = $.makeArray(localStorage.getItem('dataArray'));
	var ar;
	arr.forEach(element => {
		ar = element.split(',');
	});
	var categoryID = ar[localStorage.getItem('Id')];


	database.ref("Category/" + categoryID + "/products/").on('value', (snapshot) => {
		var data = snapshot.val();
		console.log(data);
		$("tbody").empty();
		var i = 1;
		for (var key in data) {
			var c = '<tr><td>' + (i++) + '</td><td><h5>' + data[key].Product_Name + '</h5><p>' + data[key].description + '</p></td></tr>';
			$(c).appendTo("tbody")
			console.log(data[key])
		}
	})


	$("#add").click(() => {
		var name = $("#name").val();
		var description = $("#description").val();
		database.ref("Category/" + categoryID + "/products/").push().set({
			Product_Name: name,
			description: description,

		}, () => {
			alert("new Product added succesfully");
			$("#name").val("");
			$("#description").val("");
			$("#myModal").modal('toggle');
		});
	})
})