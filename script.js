$(document).ready(function(){

    var cities = [];

    $(".current-date").append();

    function currentDay(){
    $(".current-date").html(moment().format('MMMM Do YYYY'));
    } setInterval(currentDay, 1000);

     console.log(currentDay);

    $("button").on("click", function(event){
        event.preventDefault();
        var cities =$(".cityInput").val();
        var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=0d545759c04215d46c0fe7079cd3df21";
        var uvApi = ""
        console.log(cities);
        console.log(weatherApi);

        $(".list-group-item").append(cities);

        $.ajax({
            url: weatherApi,
            method: "GET"
        })
        .then(function(response){
             
             var cityName = response.name;
             var tempIcon = response.weather.icon;
             var cityTemp = response.main.temp;
             var cityHum = response.main.humidity;
             var cityWind = response.wind.speed;
             var icon = response.weather[0].icon;
             var tempIcon = "http://openweathermap.org/img/w/" + icon + ".png";

             

             console.log(response);


             $(".cityName").append(cityName);
             $(".cityTemp").append(cityTemp);
             $(".cityHum").append(cityHum);
             $(".cityWind").append(cityWind);
             $("#icon").attr("src", tempIcon);
            console.log(tempIcon);

            var latt = response.coord.lat; 
            var long = response.coord.lon;

            var foreCast = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latt + "&lon=" + long + "&units=imperial" + "&appid=0d545759c04215d46c0fe7079cd3df21";  
            console.log("fiveDay", foreCast);

        })
    })
})



