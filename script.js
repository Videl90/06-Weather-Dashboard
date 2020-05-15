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



    //CLICK EVENT TO DISPLAY ALL DATA//

    $("button").on("click", function(event){
        event.preventDefault();
        var cities =$(".cityInput").val();
        var eachCity = [];

        //LOCAL STORAGE//
        
            eachCity = JSON.parse(localStorage.getItem("eachCity"));
            console.log(eachCity);
            eachCity.push(cities);
            localStorage.setItem("eachCity", JSON.stringify(eachCity));
            console.log(localStorage);
        
        


        //CURRENT WEATHER INFO API//
        var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=0d545759c04215d46c0fe7079cd3df21";
        console.log(cities);
        console.log(weatherApi);

        $(".list-group-item").text(cities); //Appends the cities into the buttons//

        // AJAX CALL TO DISPLAY THE CURRENT DAY DATA//
        $.ajax({
            url: weatherApi,
            method: "GET"
        })
        //FUNCTION TO GET THE CURRENT WEATHER DATA//
        .then(function(response){
             
            var cityName = response.name;
            var tempIcon = response.weather.icon;
            var cityTemp = response.main.temp;
            var cityHum = response.main.humidity;
            var cityWind = response.wind.speed;
            var icon = response.weather[0].icon;
            var tempIcon = "http://openweathermap.org/img/w/" + icon + ".png";

            
            $(".cityName").text(cityName);
            $(".cityTemp").text(cityTemp);
            $(".cityHum").text(cityHum);
            $(".cityWind").text(cityWind);
            $("#icon").attr("src", tempIcon);
           console.log(tempIcon);

       })//CLOSES THE CURRENT WEATHER DATA RESPONSE FUNCTION//

       
       renderFiveForecast(cities);
    });//CLOSES THE ON CLICK EVENT//

    //FUNCTION TO DISPLAY 5 DAY FORECAST//
    function renderFiveForecast(cities) {
        var foreCast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cities + "&appid=0d545759c04215d46c0fe7079cd3df21" + "&units=imperial";  
        console.log(foreCast);

        //AJAX CALL TO HAVE THE 5 DAY FORECAST DATA//
        $.ajax({
            url: foreCast,
            method: "GET",
           
            
        })
        .then(function(response){
            console.log(response)

            var lat = response.lat;
            var lon = response.lon;
            console.log(lat, lon);
           
            for (var i = 0; i < 5; i++){
                console.log(response.list[i].main.temp);
                var day1Temp = response.list[2].main.temp;
                console.log(day1Temp);
            }

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
