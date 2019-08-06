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

    var dataArray = [];

    var database = firebase.database();

    database.ref("Category/").on('value', (snapshot) => {
        console.log(snapshot.val());
        var cdata = snapshot.val();
        var input = '<input type="number">';
        var btn = '<button>add</button>';
        var i = 0;
        for (var key in cdata) {
            database.ref("Category/" + key + "/products/").on('value', (snapshot2) => {
                var data2 = snapshot2.val();
                for (var key2 in data2) {
                    dataArray[key2] = data2;
                    var c = '<tr class="element-row"><td>';
                    c += (++i) + '</td><td><p data="' + cdata[key].Category_Name + '">' + cdata[key].Category_Name + '</p></td><td><p data="' + key2 + '">' + data2[key2].Product_Name + '</td><td>' + data2[key2].description + '</td><td>' + input + '</td><td>' + btn + '</td></tr>';
                    $(c).appendTo("tbody");
                }
            })
        }
        console.log(dataArray);
        $("#mytable").dataTable();
        // $("td>button").click((e) => {
        //     var count = $(e.target).closest('tr').find('td>input')[0].value;
        //     var parent = $(e.target).closest('tr').find('td>p')[0].getAttribute("data");
        //     var productId = $(e.target).closest('tr').find('td>p')[1].getAttribute("data");
        //     var productName = $(e.target).closest('tr').find('td>p')[1].textContent;
        //     var description = $(e.target).closest('tr').find('td')[3].textContent;
        //     console.log(description);
        //     database.ref('order/Items/' + productId).once('value', (snapshot) => {
        //         if (snapshot.val()) {
        //             console.log(snapshot.val().count);
        //             database.ref('order/Items/' + productId).update({
        //                 count: parseInt(count) + parseInt(snapshot.val().count)
        //             });
        //         }
        //         else {
        //             database.ref('order/Items/' + productId).set({
        //                 parent: parent,
        //                 Product_Name: productName,
        //                 Description: description,
        //                 count: count
        //             });
        //         }
        //     })
        // })
        $('.dataTable').on('click', 'tbody td button', function (e) {

            var count = $(e.target).closest('tr').find('td>input')[0].value;
            var parent = $(e.target).closest('tr').find('td>p')[0].getAttribute("data");
            var productId = $(e.target).closest('tr').find('td>p')[1].getAttribute("data");
            var productName = $(e.target).closest('tr').find('td>p')[1].textContent;
            var description = $(e.target).closest('tr').find('td')[3].textContent;
            console.log(description);
            database.ref('order/Items/' + productId).once('value', (snapshot) => {
                if (snapshot.val()) {
                    console.log(snapshot.val().count);
                    database.ref('order/Items/' + productId).update({
                        count: parseInt(count) + parseInt(snapshot.val().count)
                    });
                }
                else {
                    database.ref('order/Items/' + productId).set({
                        parent: parent,
                        Product_Name: productName,
                        Description: description,
                        count: count
                    });
                }
            })
        })
    })




})