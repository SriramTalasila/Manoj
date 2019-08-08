
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


	database.ref('Category/').on('value', function (snapshot) {
		var data = snapshot.val();
		var i = 1;
		var dataArray = [];
		$("tbody").empty();
		for (var key in data) {
			var obj = {
				"key": key
			};
			dataArray[i] = key;
			var c = '<tr><td>' + (i) + '</td><td><h5 onclick="navigate(' + i + ')" data-id ="' + key + '">' + data[key].Category_Name + '</h5><p>' + data[key].description
				+ '</p></td><td><i class="fa fa-times-circle" style="font-size:36px;color:red"></i></td></tr>'
			$(c).appendTo("tbody");
			i++;
		}
		localStorage.setItem("dataArray", dataArray);
		$('tbody>tr>td>i').click((e) => {
			var catId = $(e.target).closest('tr').find('td>h5')[0].getAttribute("data-id");
			var promt = prompt("Are you sure(yes/no)")
			if (promt == "yes" || promt == "YES" || promt == "Yes") {
				database.ref('Category/' + catId + '/').remove().then(function () {
					alert("Remove succeeded.")
				})
					.catch(function (error) {
						alert("Remove failed: " + error.message)
					});
			}
		})
		//console.log(dataArray);
	});

})

