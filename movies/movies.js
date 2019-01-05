var movieDate;
var movieArray = [];
var userZip = 0;
var titleData = [];
var ratingData = [];
var theaterData = [];
var timeData = [];
var movieAPIKey = config.MOVIEKEY;

$(document).ready(function () {

    $("#clear").on("click", function (event) {
        event.preventDefault();
        userZip = 0;
        movieArray = [];

        $("#movie-data").empty();

    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        userZip = $("#add-zip").val().trim();
        movieDate = $("#add-date").val().trim();
        console.log("Zipcode: " + userZip);
        console.log("Showing Date: " + movieDate);


        // var movieAPIKey = "sbwf8ww2x99g3wyv3q4s39kg";
        var movieQueryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-" + movieDate + "&zip=" + userZip + "&radius=5&units=mi&api_key=" + movieAPIKey

        $.ajax({
            url: movieQueryURL,
            method: "GET"
        }).then(function (cleanData) {

            for (var i = 0; i < cleanData.length; i++) {
                titleData = cleanData[i].title;
                ratingData = cleanData[i].ratings[0].code
                console.log("----- Movie-Data -----")
                console.log(titleData);
                console.log(ratingData);
                // console.log("-------- Movie Data ---------")
                // console.log("Title: " + cleanData[i].title);
                // console.log("Rating: " + cleanData[i].ratings[0].code);
                for (var j = 0; j < cleanData[i].showtimes.length; j++) {
                    var event = new Date(cleanData[i].showtimes[j].dateTime);
                    timeData = event.toLocaleTimeString('en-US')
                    theaterData = cleanData[i].showtimes[j].theatre.name
                    console.log(timeData);
                    console.log(theaterData);
                    // console.log("Showtimes: " + cleanData[i].showtimes[j].dateTime);
                    // console.log("Theater: " + cleanData[i].showtimes[j].theatre.name);
                    $("#movie-data").append(
                        "<tr><td>" + titleData + "</td>" +
                        "<td>" + ratingData + "</td>" +
                        "<td>" + timeData + "</td>" +
                        "<td>" + theaterData + "</td></tr>"
                    );
                };
            };
        });
    });
});
