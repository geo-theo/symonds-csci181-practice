let is_loading = false;
let error_message = "";
let weather_data = null;

const output_element = document.getElementById("weather-output");

function getCurrentPeriod() {
  return weather_data?.properties?.periods?.[0] ?? null;
}

function renderWeather() {
  if (!output_element) {
    return;
  }

  if (is_loading) {
    output_element.className = "weather-output weather-loading";
    output_element.textContent = "Loading...";
    return;
  }

  if (error_message) {
    output_element.className = "weather-output weather-error";
    output_element.textContent = error_message;
    return;
  }

  const current_period = getCurrentPeriod();

  if (current_period) {
    output_element.className = "weather-output weather-success";
    output_element.innerHTML = `
      <p class="weather-temperature">${current_period.temperature}&deg;</p>
      <p class="weather-forecast">${current_period.shortForecast}</p>
    `;
    return;
  }

  output_element.className = "weather-output weather-empty";
  output_element.textContent = "Weather data not available.";
}

async function getWeatherData() {
  is_loading = true;
  error_message = "";
  renderWeather();

  try {
    const response = await fetch(
      "https://api.weather.gov/gridpoints/MSO/105,131/forecast",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    weather_data = await response.json();
    console.log("Weather data:", weather_data);
  } catch (error) {
    weather_data = null;
    error_message = error.message;
    console.error("Error fetching weather data:", error_message);
  } finally {
    is_loading = false;
    renderWeather();
  }
}

renderWeather();
getWeatherData();
