function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByLocation);   //showError
    } else {
        // document.getElementById("weather-info").innerHTML = "Geolocation is not supported by this browser.";
        alert("Unable to Fetch Your location");
    }
}

function getWeatherByLocation(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var apiKey = "494f101fae2eccab3f21617162ecdb69";
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        // var climateDescription = data.weather[0].description
        // <img src="./images/${data.weather[0].description}.jpg" height=50px alt="icon" />
        var weatherInfo = `
            <p>City: ${data.name}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Description: ${data.weather[0].description}</p>
            <img src="./icons/${data.weather[0].description}.png" height=50px alt="icon" />
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        console.log(weatherInfo);
        $(".city").html(`<p>${data.name}</p>`)
        $(".temp").html(`<p>${data.main.temp}°C</p>`)
        $(".icon").html(`<img src="./icons/${data.weather[0].description}.png" alt="${data.weather[0].description}" />`)
        $(".desc").html(`<p>${data.weather[0].description}</p>`)
        $(".hum").html(`<p>Humidity: ${data.main.humidity}%</p>`)
        $(".speed").html(`<p>Wind Speed: ${data.wind.speed}m/s</p>`)
        // $("#weather-info").html(weatherInfo);
        $(".card").css({"background-image":`url("./images/${data.weather[0].description}.jpg")`, "background-repeat":"no-repeat", "background-size":"contain"});
        
    })
    .catch(error => {
        console.error('Error:', error);
        $("#weather-info").html("An error occurred. Please try again later.");
    });
}

