//array of cities searched 
var citiesCollection = JSON.parse(localStorage.getItem("searchHistory"))||[]; 

//function to determine if a value is in an array
var containsObject = (element, array)=>{
    for(var i = 0; i < array.length; i++){
        if(element === array[i]) {
            return true;
        }
    }

    return false;
}

//function to load the buttons in the array loaded in from local storage 
function loadButtons(){
    $("#previous-cities").empty();
//enhanced for loop to append a button to the page for each element in the array
    for(var city of citiesCollection){

        
        var cityLog =  $("<button>").addClass("btn btn-secondary city-button").html(city).attr("id", city);
        var listItem = $("<li>");  
        listItem.append(cityLog);
        $("#previous-cities").prepend(listItem);
         

    }
  

} 
loadButtons();

//search button attached to click function 
$(".col-md-4 #search-button").click(function(){
 console.log("search button clicked -- should trigger a fetch request"); 
 //input collected and assigned to variable 
 var searchInput = $("#search-input").val();
 //clears the input field after every search 
 $("#search-input").val("");

 //put each searchInput into citiesCollection array;
   if(searchInput && citiesCollection.length < 8 && !containsObject(searchInput, citiesCollection)){
        citiesCollection.push(searchInput);
   }else if(searchInput && !containsObject(searchInput, citiesCollection)){ 
        citiesCollection.shift();
        citiesCollection.push(searchInput);
   }    
   console.log("the length of my searchHistory array is " + citiesCollection.length);

    //initial fetch request to retrieve lat and lon 
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=81fbb5e20e3d59ea0ee45d2833b66f8e")
    .then(responseObj=> responseObj.json())
    .then(function(obj){
        console.log(obj);
        var lat1 = obj.coord.lat;
        var lon1 = obj.coord.lon;
    
       

    //make nested fetch request to One Call API
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat1 + "&lon=" + lon1 + "&units=imperial"+ "&exclude=minutely" + "&appid=81fbb5e20e3d59ea0ee45d2833b66f8e")
        .then(responseObj=>responseObj.json())
        .then( function(obj1){
            console.log(obj1);
            //current date established 
            var currentDate = moment().format("M/D/yyyy");
            $("#current-city-day").html(searchInput + " " + currentDate);
           
            //current weatherer 
 
          //values from current city loaded in
          $("#current-temp").html("Temp: " + obj1.current.temp + "°F")
          $("#current-wind").html("Wind: " + obj1.current.wind_speed + " MPH")
          $("#current-humidity").html("Humidity: " + obj1.current.humidity + " %")
          $("#current-UV").html("UV index: " +obj1.current.uvi)
        var currentConditions = $("<img>").attr("src", "http://openweathermap.org/img/w/" + obj1.current.weather[0].icon + ".png");
          if(! $("current-city-info").children){
              $("#current-city-info").append(currentConditions);
          }
        
          currentConditions.attr("class", "")
          //color organizing the UV index display -- could be improved by background covering only the number displayed
          if(obj1.current.uvi < 5){
              $("#current-UV").attr("style", "background-color: green");
          }else if(obj1.current.uvi < 8){
            $("#current-UV").attr("style", "background-color: yellow");
          }else{
            $("#current-UV").attr("style", "background-color: red")
          }
         
          console.log($("#current.temp").val() + "value here? ")
        
          //5 day forecast info ---------- Hardcode each day of the 5 day forecast for simplicity 
           
           

            //day 1 
          $("#day1-forecast .forecast-date" ).html(moment().add(1,"days").format("M/D/yyyy"));
          $("#day1-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[0].weather[0].icon + ".png");
          $("#day1-forecast .forecast-temp").html("Temp: " + obj1.daily[0].temp.day + "°F");
          $("#day1-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[0].wind_speed +" MPH");
          $("#day1-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[0].humidity +" %");
          $("#day1-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[0].uvi);
    
          //day 2 
          $("#day2-forecast .forecast-date" ).html(moment().add(2,"days").format("M/D/yyyy"));
          $("#day2-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[1].weather[0].icon + ".png");
          $("#day2-forecast .forecast-temp").html("Temp: " + obj1.daily[1].temp.day + "°F");
          $("#day2-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[1].wind_speed +" MPH");
          $("#day2-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[1].humidity +" %");
          $("#day2-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[1].uvi);

          //day 3
          $("#day3-forecast .forecast-date" ).html(moment().add(3,"days").format("M/D/yyyy"));
          $("#day3-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[2].weather[0].icon + ".png");
          $("#day3-forecast .forecast-temp").html("Temp: " + obj1.daily[2].temp.day + "°F");
          $("#day3-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[2].wind_speed +" MPH");
          $("#day3-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[2].humidity +" %");
          $("#day3-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[2].uvi);

          //day 4 
          $("#day4-forecast .forecast-date" ).html(moment().add(4,"days").format("M/D/yyyy"));
          $("#day4-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[3].weather[0].icon + ".png");
          $("#day4-forecast .forecast-temp").html("Temp: " + obj1.daily[3].temp.day + "°F");
          $("#day4-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[3].wind_speed +" MPH");
          $("#day4-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[3].humidity +" %");
          $("#day4-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[3].uvi);

          //day 5 
          $("#day5-forecast .forecast-date" ).html(moment().add(5,"days").format("M/D/yyyy"));
          $("#day5-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[4].weather[0].icon + ".png");
          $("#day5-forecast .forecast-temp").html("Temp: " + obj1.daily[4].temp.day + "°F");
          $("#day5-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[4].wind_speed +" MPH");
          $("#day5-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[4].humidity +" %");
          $("#day5-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[4].uvi);


          localStorage.setItem("searchHistory", JSON.stringify(citiesCollection));

        }); 
       
    });

    
    
    //clear the <ul> every time before this button append function to prevent overflow 
   
     loadButtons();
 
}); 



//event listener for appended button items -- working!
$("#previous-cities").on("click", ".city-button", function(){
    console.log("hi");
    console.log("button clicked: " + $(this).attr("id") + "-- should trigger fetch request for specific city name (pass ID)");

    // otherfetch request shouls go here
    


    var searchInput = $(this).attr("id");

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=81fbb5e20e3d59ea0ee45d2833b66f8e")
    .then(responseObj=> responseObj.json())
    .then(function(obj){
        console.log(obj);
        var lat1 = obj.coord.lat;
        var lon1 = obj.coord.lon;
    
       

    //make nested fetch request to One Call API
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat1 + "&lon=" + lon1 + "&units=imperial"+ "&exclude=minutely" + "&appid=81fbb5e20e3d59ea0ee45d2833b66f8e")
        .then(responseObj=>responseObj.json())
        .then( function(obj1){
            console.log(obj1);
            //current date established 
            var currentDate = moment().format("M/D/yyyy");
            $("#current-city-day").html(searchInput + " " + currentDate);
           
            //current weatherer 
 
          //values from current city loaded in
          $("#current-temp").html("Temp: " + obj1.current.temp + "°F")
          $("#current-wind").html("Wind: " + obj1.current.wind_speed + " MPH")
          $("#current-humidity").html("Humidity: " + obj1.current.humidity + " %")
          $("#current-UV").html("UV index: " +obj1.current.uvi)
        var currentConditions = $("<img>").attr("src", "http://openweathermap.org/img/w/" + obj1.current.weather[0].icon + ".png");
          if(! $("current-city-info").children){
              $("#current-city-info").append(currentConditions);
          }
        
          currentConditions.attr("class", "")
          //color organizing the UV index display -- could be improved by background covering only the number displayed
          if(obj1.current.uvi < 5){
              $("#current-UV").attr("style", "background-color: green");
          }else if(obj1.current.uvi < 8){
            $("#current-UV").attr("style", "background-color: yellow");
          }else{
            $("#current-UV").attr("style", "background-color: red")
          }
         
        
          //5 day forecast info -------
           
           

            //day 1 
          $("#day1-forecast .forecast-date" ).html(moment().add(1,"days").format("M/D/yyyy"));
          $("#day1-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[0].weather[0].icon + ".png");
          $("#day1-forecast .forecast-temp").html("Temp: " + obj1.daily[0].temp.day + "°F");
          $("#day1-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[0].wind_speed +" MPH");
          $("#day1-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[0].humidity +" %");
          $("#day1-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[0].uvi);
    
          //day 2 
          $("#day2-forecast .forecast-date" ).html(moment().add(2,"days").format("M/D/yyyy"));
          $("#day2-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[1].weather[0].icon + ".png");
          $("#day2-forecast .forecast-temp").html("Temp: " + obj1.daily[1].temp.day + "°F");
          $("#day2-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[1].wind_speed +" MPH");
          $("#day2-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[1].humidity +" %");
          $("#day2-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[1].uvi);

          //day 3
          $("#day3-forecast .forecast-date" ).html(moment().add(3,"days").format("M/D/yyyy"));
          $("#day3-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[2].weather[0].icon + ".png");
          $("#day3-forecast .forecast-temp").html("Temp: " + obj1.daily[2].temp.day + "°F");
          $("#day3-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[2].wind_speed +" MPH");
          $("#day3-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[2].humidity +" %");
          $("#day3-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[2].uvi);

          //day 4 
          $("#day4-forecast .forecast-date" ).html(moment().add(4,"days").format("M/D/yyyy"));
          $("#day4-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[3].weather[0].icon + ".png");
          $("#day4-forecast .forecast-temp").html("Temp: " + obj1.daily[3].temp.day + "°F");
          $("#day4-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[3].wind_speed +" MPH");
          $("#day4-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[3].humidity +" %");
          $("#day4-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[3].uvi);

          //day 5 
          $("#day5-forecast .forecast-date" ).html(moment().add(5,"days").format("M/D/yyyy"));
          $("#day5-forecast .forecast-icon" ).attr("src", "http://openweathermap.org/img/w/" + obj1.daily[4].weather[0].icon + ".png");
          $("#day5-forecast .forecast-temp").html("Temp: " + obj1.daily[4].temp.day + "°F");
          $("#day5-forecast .forecast-wind" ).html("Wind: "+ obj1.daily[4].wind_speed +" MPH");
          $("#day5-forecast .forecast-humidity" ).html("Humidity: " + obj1.daily[4].humidity +" %");
          $("#day5-forecast .forecast-uv" ).html("UV Index: " + obj1.daily[4].uvi);


           

        }); 
       
    });
});



 