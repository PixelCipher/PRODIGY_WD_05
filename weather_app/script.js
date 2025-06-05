const apiKey = "API_Key";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => showWeather(data))
    .catch(error => console.error("Error:", error));
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => showWeather(data))
        .catch(error => console.error("Error:", error));
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showWeather(data) {
  if (data.cod !== 200) {
    document.getElementById("weatherResult").innerHTML = `<p>${data.message}</p>`;
    return;
  }

  const result = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Weather:</strong> ${data.weather[0].main}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherResult").innerHTML = result;
}
