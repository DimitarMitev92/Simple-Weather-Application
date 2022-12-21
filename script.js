let weather = {
    apiKey: "4e915cadcff8b5b659c17b595c4d010b",

    fetchWeather: function (city) {

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found. Try again.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));

    },

    changeContent: function (className, description) {

        return document.querySelector(className).textContent = description;

    },

    displayWeather: function (data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { humidity } = data.main;
        const { speed } = data.wind;
        const { feels_like } = data.main;
        const { pressure } = data.main;
        const { temp_max } = data.main;
        const { temp_min } = data.main;


        //Location
        this.changeContent(".city", `${name}`);

        //Icon
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";

        //Description
        this.changeContent(".description", `${description}`);

        //Feels like
        this.changeContent(".temp", `${feels_like}°C`);

        //Min temperature
        this.changeContent(".min-temp", `Min temperature: ${temp_min}°C`);

        //Max temperature
        this.changeContent(".max-temp", `Max temperature: ${temp_max}°C`);

        //Pressure
        this.changeContent(".pressure", `Pressure: ${pressure}hPa`);

        //Humidity
        this.changeContent(".humidity", `Humidity: ${humidity}%`);

        //Wind speed
        this.changeContent(".wind", `Wind speed: ${speed}km/h`);

        //Loading
        document.querySelector(".weather").classList.remove("loading");

        //Change img by city
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function () {

        this.fetchWeather(document.querySelector(".search-bar").value);

    },

};

document.querySelector(".search button").addEventListener("click", function () {

    weather.search();

});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Sofia");