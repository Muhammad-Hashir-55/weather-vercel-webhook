import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const city = req.body.queryResult?.parameters['geo-city'];

  if (!city) {
    return res.status(200).json({
      fulfillmentText: "Please provide a city name.",
    });
  }

  try {
    const apiKey = "55f8fe254c1201cfc7bb7e50e0ce3e76";
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;
    const weather = data.weather[0].description;
    const temp = data.main.temp;
    const feels = data.main.feels_like;

    return res.status(200).json({
      fulfillmentText: `🌦️ Weather in ${city}: ${weather}, temp: ${temp}°C, feels like: ${feels}°C.`,
    });
  } catch (err) {
    return res.status(200).json({
      fulfillmentText: `❌ Couldn't fetch weather for "${city}". Please try another city.`,
    });
  }
}
