const apiKey = "935f005facae402fa3445142261703";

async function getWeather() {
  try {
    const cityInput = document.getElementById("city");
    const result = document.getElementById("result");
    const city = cityInput.value.trim();

    if (city === "") {
      result.innerHTML = "⚠️ Please enter a city name";
      return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    result.innerHTML = "⏳ Loading...";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const name = data.location.name;
    const temp = data.current.temp_c;
    const feels = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const weather = data.current.condition.text;

    result.innerHTML = `
      <h2>${name}</h2>
      <p>🌡 Temp: ${temp} °C</p>
      <p>🤒 Feels Like: ${feels} °C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌥 Condition: ${weather}</p>
    `;
  } catch (error) {
    document.getElementById("result").innerHTML =
      "❌ Error: " + error.message;
  }
}