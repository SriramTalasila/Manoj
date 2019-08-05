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



    database.ref("Category/").on('value', (snapshot) => {
        console.log(snapshot.val());
        var cdata = snapshot.val();
        var input = '<input type="number">';
        var btn = '<button>Add</button>';
        var i = 0;
        for (var key in cdata) {
            database.ref("Category/" + key + "/products/").on('value', (snapshot2) => {
                var data2 = snapshot2.val();
                for (var key2 in data2) {
                    var c = '<tr><td>';
                    c += (++i) + '</td><td>' + cdata[key].Category_Name + '</td><td>' + data2[key2].Product_Name + '</td><td>' + data2[key2].description + '</td><td>'+ input + '</td><td>' + btn + '</td></tr>';
                    $(c).appendTo("tbody");
                }
            })
        }
        $("#mytable").dataTable();
    })

    $("tr>button").click(()=>{
        
        console.log($(this).closest('input').val());
        
    })


})