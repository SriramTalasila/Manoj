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

    var data;

    var database = firebase.database();
    $("#lode").css('display','block');
    database.ref('History/').on('value', (snapshot) => {
        $("#lode").css('display','none');
        console.log("hai");
        if (snapshot.val()) {
            data = snapshot.val();
            for (key in data) {
                //console.log(new Date(parseInt(key,10)));
                var c = '<option value="' + key + '">' + new Date(parseInt(key, 10)).toDateString() + '</option>';
                $(c).appendTo('#datpickr');
            }

        }

        $('select').on('change', function () {
            var dArray = data[this.value].data;
            var i=0;
            $("tbody").empty();
            $("#dt").empty().append(" of "+new Date(parseInt(this.value, 10)).toDateString());
            dArray.forEach(element => {
                var td = '<tr><td>'+(++i)+'</td><td>'+element.category+'</td><td>'+element.Product+'</td><td>'+element.Quantity+'</td></tr>'
                $(td).appendTo('tbody')
            });
        });

    })


})