// // sample google sheets api query... just as an example
// $.getJSON("https://spreadsheets.google.com/feeds/list/1_EXTIsK5gx3Ga8iou7QYUp9BidFySvgO3aRy18R1rtE/od6/public/values?alt=json-in-script&callback=?", function(data) {
//   //first row "title" column
//   console.log(data);
// });


$.ajax({
    type: "GET",
    url: "https://sheets.googleapis.com/v4/spreadsheets/1_EXTIsK5gx3Ga8iou7QYUp9BidFySvgO3aRy18R1rtE",
    success: function(data){
    	alert("yeah");
    	console.log(data);
    },
    error: function(){alert("fail..");},
    dataType:"jsonp",
    client_id:"808737036924-vnuvd7uo0l0b8et4vmdr8odrc7jh0nr9.apps.googleusercontent.com",
    project_id:"primal-buttress-154916",
    auth_uri:"https://accounts.google.com/o/oauth2/auth",
    auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
    client_secret:"O7axEtZt0cCSOCoJVxJR6UbJ",
    token_uri:"https://accounts.google.com/o/oauth2/token"
});

console.log("It's alive!");