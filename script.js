const apiKey = "935f005facae402fa3445142261703";
// Optional: Get a free API key at https://unsplash.com/developers for higher quality images
const unsplashAccessKey = "YOUR_UNSPLASH_API_KEY"; 

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
    const weatherCondition = data.current.condition.text;

    // Determine the theme/keyword based on temperature
    let imageQuery = "nature";
    if (temp >= 25) {
      imageQuery = "summer";
    } else if (temp <= 15) {
      imageQuery = "winter";
    } else {
      imageQuery = "spring"; // For moderate temperatures
    }

    // Try fetching a high-quality image from Unsplash API
    try {
      const unsplashUrl = `https://api.unsplash.com/photos/random?query=${imageQuery}&client_id=${unsplashAccessKey}&orientation=landscape`;
      const unsplashResponse = await fetch(unsplashUrl);
      
      if (unsplashResponse.ok) {
        const unsplashData = await unsplashResponse.json();
        const imageUrl = unsplashData.urls.regular;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
      } else {
        // Fallback to LoremFlickr if no Unsplash key is provided or API limit reached
        document.body.style.backgroundImage = `url('https://loremflickr.com/1600/900/${imageQuery}?random=${new Date().getTime()}')`;
      }
    } catch (e) {
        // Fallback to LoremFlickr on error
        document.body.style.backgroundImage = `url('https://loremflickr.com/1600/900/${imageQuery}?random=${new Date().getTime()}')`;
    }

    result.innerHTML = `
      <h2>${name}</h2>
      <p>🌡 Temp: ${temp} °C</p>
      <p>🤒 Feels Like: ${feels} °C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌥 Condition: ${weatherCondition}</p>
    `;
  } catch (error) {
    document.getElementById("result").innerHTML =
      "❌ Error: " + error.message;
  }
}