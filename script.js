document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=bb39e3f7768f9dfa3ad5d0a4695bdfdb";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = "";
            results += '<h1>' + json.name + "</h2>";
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }

            // This shows the weather description
            results += "<p>"
            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description.toUpperCase()
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";

            results += '<h1>' + json.main.temp + " &deg;F</h2>"
            results += '<p>' + "Feels Like: " + json.main.feels_like + " &deg;F</p>"
            results += '<p>' + "Humidity: " + json.main.humidity + "</p>"
            results += '<p>' + "Wind: " + json.wind.speed + " mph </p>"
            results += '<p>' + "Low: " + json.main.temp_min + " &deg;F</p>"
            results += '<p>' + "High: " + json.main.temp_max + " &deg;F</p>"


            document.getElementById("weatherResults").innerHTML = results;
        });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=bb39e3f7768f9dfa3ad5d0a4695bdfdb";
    fetch(url2)
        .then(function (response) {

            return response.json();
        }).then(function (json) {
            let forecast = "";
            forecast += "<h1>" + "Weekly Forecast-"
            let numCalls = 0;

            for (let i = 0; i < json.list.length; i++) {
                // console.log(moment(json.list[i].dt_txt).format('MMMM Do'));
                if (numCalls == 0 || numCalls == 1 || numCalls == 9 || numCalls == 17 || numCalls == 25 || numCalls == 33) {
                    forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do') + "</h2>";
                    forecast += "<p>" + moment(json.list[i].dt_txt).format('h a').bold().toUpperCase() + "- " + json.list[i].main.temp + " &deg;F" + "</p>";
                }
                else {
                    forecast += "<p>" + moment(json.list[i].dt_txt).format('h a').bold().toUpperCase() + "- " + json.list[i].main.temp + " &deg;F" + "</p>";
                }

                // forecast += "<p>" json.list[i].main.temp_min + " &deg;F</h2>" + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
                numCalls++;
            }
            console.log(numCalls);
            document.getElementById("forecastResults").innerHTML = forecast;
        });


});

