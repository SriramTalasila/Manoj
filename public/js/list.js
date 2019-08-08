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

    database.ref("order/Items/").on('value', (snapshot) => {
        $("tbody").empty();
        //console.log(snapshot.val());
        var cdata = snapshot.val();
        var i = 0;
        for (var key in cdata) {
            var c = '<tr><td>';
            c += (++i) + '</td><td><p>' + cdata[key].parent + '</p></td><td><p>' + cdata[key].Product_Name + '</td><td>' + cdata[key].Description + '</td><td>' + cdata[key].count + '</td><td></td></tr>';
            $(c).appendTo("tbody");
        }
        $("#mytable").dataTable();
    })


    $("#print").click(() => {
        $("#mytable ").tableHTMLExport({
            // csv, txt, json, pdf
            type: 'pdf',
            // file name
            filename: 'orderList.pdf'
        });
    })

    $("#delete").click(() => {
        alert("Are you sure you want to delete")
        // database.ref('order/Items').once('value',(snapshot)=>{
        //     if(snapshot.val()){
        //         var obj = {
        //             "date":Date(),
        //         };
        //         var data = snapshot.val();
        //         for(key in data){
        //             var o ={
        //                 "category":data[key].parent,
        //                 "Product":data[key].Product_Name,
        //                 "Quantity":data[key].count
        //             }
        //             obj.push(o);
        //         }
        //         console.log(obj)
        //     }
        // },)
        database.ref('order/Items').remove().then(function () {
            alert("Remove succeeded.")
        })
            .catch(function (error) {
                alert("Remove failed: " + error.message)
            });
    })
})
