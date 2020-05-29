$(document).ready(function(){

    //Function to display current day, and the next 5 days//

    function currentDay(){
        $(".current-date").html(moment().format('MMMM Do YYYY'));
        } setInterval(currentDay, 1000);
    
         console.log(currentDay);
    
        $(".day1").append();
        $(".day2").append();
        $(".day3").append();
        $(".day4").append();
        $(".day5").append();
    
        function nextDays(){
            $(".day1").html(moment().add(1, "days").format('MMMM Do YYYY'));
            $(".day2").html(moment().add(2, "days").format('MMMM Do YYYY'));
            $(".day3").html(moment().add(3, "days").format('MMMM Do YYYY'));
            $(".day4").html(moment().add(4, "days").format('MMMM Do YYYY'));
            $(".day5").html(moment().add(5, "days").format('MMMM Do YYYY'));
        } setInterval(nextDays, 1000);

    
    var allCities = [];
    var cityIndex = localStorage.length;

    //CLICK EVENT TO DISPLAY ALL DATA//

    $("button").on("click", function(event){
        event.preventDefault();
        var cities =$(".cityInput").val();
        allCities.push(cities);
        localStorage.setItem(cityIndex, cities);
        console.log(cities);
        var cityText = $("<li>").html(cities);
        $(".list-group").append(cityText);
        

        //CURRENT WEATHER INFO API//
        var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=0d545759c04215d46c0fe7079cd3df21";
        console.log(weatherApi);

        $(".list-group-item").text(cities); //Appends the cities into the buttons//

        // AJAX CALL TO DISPLAY THE CURRENT DAY DATA//
        $.ajax({
            url: weatherApi,
            method: "GET"
        })
        //FUNCTION TO GET THE CURRENT WEATHER DATA//
        .then(function(response){
            var lat = response.coord.lat;
            var long = response.coord.lon;
            console.log(lat, long);
             
            var cityName = response.name;
            var tempIcon = response.weather.icon;
            var cityTemp = response.main.temp;
            console.log(cityTemp);
            var cityHum = response.main.humidity;
            var cityWind = response.wind.speed;
            var icon = response.weather[0].icon;
            var tempIcon = "https://openweathermap.org/img/w/" + icon + ".png";

            
            $(".cityName").text("City: " + cityName);
            $(".cityTemp").text("Temp: " + cityTemp + "°F");
            $(".cityHum").text("Humidity: " + cityHum + "%");
            $(".cityWind").text("Wind Speed: " + cityWind + " km/h");
            $("#icon").attr("src", tempIcon);
           console.log(tempIcon);

           //UVINDEX//

           var queryUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=0d545759c04215d46c0fe7079cd3df21";
            console.log(cities, queryUrl);
        
            $.ajax({
                    url: queryUrl,
                    method: "GET"
                })
                //FUNCTION TO GET THE CURRENT WEATHER DATA//
                .then(function(response){
                    var lon = response.coord.lon;
                    var lat = response.coord.lat;
                    console.log(lat, lon);
        
                    var uvInUrl = "https://api.openweathermap.org/data/2.5/uvi?" + "appid=0d545759c04215d46c0fe7079cd3df21&lat=" + lat + "&lon=" + lon;
                    console.log(uvInUrl);
                   
        
                    $.ajax({
                    url:uvInUrl,
                    method: "GET"
                    }).then(function(getUvIndex){
                    var uvIndex = getUvIndex.value;
                    $("#uvIndex").text(uvIndex);
                    console.log(uvIndex);
                    
                    $("#uvIndex").removeClass();

                    if (uvIndex >= 3 && uvIndex <= 5){
                        $("#uvIndex").addClass("uvIndexYell");
                    } else if (uvIndex >= 5 && uvIndex <= 7){
                        $("#uvIndex").addClass("uvIndexOr");
                    } else if (uvIndex >= 7 && uvIndex <= 10){
                        $("#uvIndex").addClass("uvIndexRed");
                    } else if (uvIndex >= 10){
                        $("#uvIndex").addClass("uvIndexMag");
                    }
                    });
                });

       })//CLOSES THE CURRENT WEATHER DATA RESPONSE FUNCTION//

       renderFiveForecast();
       
    });//CLOSES THE ON CLICK EVENT//
    
    //FUNCTION TO DISPLAY 5 DAY FORECAST//
    function renderFiveForecast() {
        var cities =$(".cityInput").val();
        var foreCast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cities + "&appid=0d545759c04215d46c0fe7079cd3df21" + "&units=imperial";  
        console.log(foreCast);
        
        //AJAX CALL TO HAVE THE 5 DAY FORECAST DATA//
        $.ajax({ 
            url: foreCast,
            method: "GET",
           
            
        })
        .then(function(response){
            console.log(response)
            //Forecast Temperature//
            var day1Temp = response.list[0].main.temp;
            var day2Temp = response.list[1].main.temp;
            var day3Temp = response.list[2].main.temp;
            var day4Temp = response.list[3].main.temp;
            var day5Temp = response.list[4].main.temp;

            $(".temp1").text("Temp: " + day1Temp + "°F");
            $(".temp2").text("Temp: " + day2Temp + "°F");
            $(".temp3").text("Temp: " + day3Temp + "°F");
            $(".temp4").text("Temp: " + day4Temp + "°F");
            $(".temp5").text("Temp: " + day5Temp + "°F");
            //Forecast Humidity//

            var day1Hum = response.list[0].main.humidity;
            var day2Hum = response.list[1].main.humidity;
            var day3Hum = response.list[2].main.humidity;
            var day4Hum = response.list[3].main.humidity;
            var day5Hum = response.list[4].main.humidity;

            $(".hum1").text("Humidity: " + day1Hum + "%");
            $(".hum2").text("Humidity: " + day2Hum + "%");
            $(".hum3").text("Humidity: " + day3Hum + "%");
            $(".hum4").text("Humidity: " + day4Hum + "%");
            $(".hum5").text("Humidity: " + day5Hum + "%");
        
            //Forecast Icon//
            var icon1 = response.list[0].weather[0].icon;
            var tempIcon1 = "http://openweathermap.org/img/w/" + icon1 + ".png";

            var icon2 = response.list[1].weather[0].icon;
            var tempIcon2 = "http://openweathermap.org/img/w/" + icon2 + ".png";

            var icon3 = response.list[2].weather[0].icon;
            var tempIcon3 = "http://openweathermap.org/img/w/" + icon3 + ".png";

            var icon4 = response.list[3].weather[0].icon;
            var tempIcon4 = "http://openweathermap.org/img/w/" + icon4 + ".png";

            var icon5 = response.list[4].weather[0].icon;
            var tempIcon5 = "http://openweathermap.org/img/w/" + icon5 + ".png";

            $("#icon1").attr("src", tempIcon1);
            $("#icon2").attr("src", tempIcon2);
            $("#icon3").attr("src", tempIcon3);
            $("#icon4").attr("src", tempIcon4);
            $("#icon5").attr("src", tempIcon5);

        /*DISPLAYS THE ICON//
            var tempIconDaily = []
            for (var i = 0; i < 5; i++){
                var icon1 = response.daily[i].weather[i].icon;
                console.log(icon1);
                tempIconDaily.push(icon1)
                var tempIcon1 = "http://openweathermap.org/img/w/" + tempIconDaily + ".png";
                
                console.log(icon1)
                $("#icon1").attr("src", tempIcon1);
            }*/
    
    
        })

       }//CLOSES THE 5 DAY FORECAST DISPLAY FUNCTION//
    
    
});//Closes Ready Function



   

    
      
       
        

        
        
        




     /*   function renderCities () {
            $(".list-group").empty();
            var citiesLocalStorage = JSON.parse(localStorage.getItem("eachCity")) && [];
            var cityLength = citiesLocalStorage.length;
            
            for (var i = 0; i < cityLength; i++){
                var cityTaken = citiesLocalStorage[i];
                $(".list-group-item").append(cities + cityTaken);
            }
        }
        renderCities();
        renderFiveForecast();     
    };
})
}*/
