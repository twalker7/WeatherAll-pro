
$(".col-md-4 #search-button").click(function(){
 console.log("search button clicked -- should trigger a fetch request"); 
 var searchInput = $("#search-input").val();
 


    //initial fetch request to retrieve lat and lon 
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=81fbb5e20e3d59ea0ee45d2833b66f8e")
    .then(responseObj=> responseObj.json())
    .then(function(obj){
        console.log(obj);
        var lat1 = obj.coord.lat;
        var lon1 = obj.coord.lon;
    
       

    
       
    //make One Call API
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat1 + "&lon=" + lon1 + "&units=imperial"+ "&exclude=minutely" + "&appid=81fbb5e20e3d59ea0ee45d2833b66f8e")
        .then(responseObj=>responseObj.json())
        .then( function(obj1){
            console.log(obj1);

            //current weatherer 
          console.log(obj1.current.temp)
          console.log(obj1.current.wind_speed)
          console.log(obj1.current.humidity)
          console.log(obj1.current.uvi)
          $("#current-temp").val(obj1.current.temp)
          $("#current-wind").val(obj1.current.wind_speed)
          $("#current-humidity").val(obj1.current.humidity)
          $("#current-UV").val(obj1.current.uvi)
         
          console.log($("#current.temp").val() + "value here? ")
          console.log("OBJECT SWITCH")
          
          //5 day forecast info ---------- Hardcode each day of the 5 day forecast for simplicity 
            console.log(obj1.daily[0].temp.day)
            console.log(obj1.daily[0].wind_speed)
            console.log(obj1.daily[0].humidity)
            console.log(obj1.daily[0].uvi)
            /*
            $("#temp").val()
            $("#wind").val()
            $("#humidity").val()
            $("#UV").val()
           */
        }); 
        

        
        
    });
}); 






 
 
 







//city-buttons should be created after each search button click, storing up to 8 searches
$(".city-button").click(function(){
    console.log("button clicked: " + $(this).attr("id") + "-- should trigger fetch request for specific city name (pass ID)");
});

// make a function to store the last 8 searched cities in 


 