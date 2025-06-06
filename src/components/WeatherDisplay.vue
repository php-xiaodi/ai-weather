<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCurrentPosition, getWeatherByLocation, getDefaultWeather } from '../services/weather';

interface WeatherData {
  location: {
    country: string;
    province: string;
    city: string;
    name: string;
  };
  now: {
    text: string;
    temp: number;
    feels_like: number;
    rh: number;
    wind_class: string;
    wind_dir: string;
    uptime: string;
  };
  forecasts: Array<{
    text_day: string;
    text_night: string;
    high: number;
    low: number;
    wc_day: string;
    wd_day: string;
    date: string;
    week: string;
  }>;
}

const weatherData = ref<WeatherData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchWeatherData() {
  try {
    loading.value = true;
    error.value = null;

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const response = await getWeatherByLocation(latitude, longitude);
      weatherData.value = response.result;
    } catch (locationError) {
      console.warn('Unable to get location, using default location:', locationError);
      const response = await getDefaultWeather();
      weatherData.value = response.result;
    }
  } catch (e) {
    error.value = '获取天气信息失败，请稍后重试';
    console.error('Error fetching weather:', e);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchWeatherData();
});
</script>

<template>
  <div class="weather-display">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>正在获取天气信息...</p>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="weatherData" class="weather-content">
      <div class="current-weather">
        <div class="location">
          <h2>{{ weatherData.location.city }}</h2>
          <p>{{ weatherData.location.province }}, {{ weatherData.location.country }}</p>
        </div>

        <div class="weather-info">
          <div class="temperature">
            <span class="temp-value">{{ weatherData.now.temp }}°</span>
            <span class="weather-text">{{ weatherData.now.text }}</span>
          </div>

          <div class="details">
            <p>体感温度: {{ weatherData.now.feels_like }}°</p>
            <p>湿度: {{ weatherData.now.rh }}%</p>
            <p>{{ weatherData.now.wind_dir }} {{ weatherData.now.wind_class }}</p>
          </div>
        </div>
      </div>

      <div class="forecast">
        <h3>未来天气预报</h3>
        <div class="forecast-list">
          <div v-for="(forecast, index) in weatherData.forecasts" 
               :key="forecast.date"
               class="forecast-item">
            <p class="date">{{ index === 0 ? '今天' : forecast.week }}</p>
            <p class="temp-range">{{ forecast.low }}° - {{ forecast.high }}°</p>
            <p class="weather-desc">{{ forecast.text_day }}</p>
            <p class="wind">{{ forecast.wd_day }} {{ forecast.wc_day }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather-display {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1CAC70;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #dc3545;
  text-align: center;
  padding: 2rem;
}

.weather-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.current-weather {
  padding: 2rem;
  background: linear-gradient(135deg, #1CAC70 0%, #EDDC46 100%);
  color: white;

  .location {
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      margin: 0;
    }

    p {
      margin: 0.5rem 0 0;
      opacity: 0.9;
    }
  }

  .weather-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .temperature {
      .temp-value {
        font-size: 4rem;
        font-weight: bold;
      }

      .weather-text {
        display: block;
        font-size: 1.2rem;
        margin-top: 0.5rem;
      }
    }

    .details {
      text-align: right;

      p {
        margin: 0.5rem 0;
      }
    }
  }
}

.forecast {
  padding: 2rem;

  h3 {
    margin: 0 0 1.5rem;
    color: #333;
  }

  .forecast-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .forecast-item {
    text-align: center;
    padding: 1rem;
    background: rgba(244, 246, 248, 0.5);
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .date {
      font-weight: 500;
      margin: 0 0 0.5rem;
      color: #333;
    }

    .temp-range {
      font-size: 1.1rem;
      font-weight: bold;
      margin: 0.5rem 0;
      color: #1CAC70;
    }

    .weather-desc {
      margin: 0.5rem 0;
      color: #666;
    }

    .wind {
      font-size: 0.9rem;
      color: #888;
      margin: 0.5rem 0 0;
    }
  }
}

@media (max-width: 768px) {
  .weather-display {
    padding: 1rem;
  }

  .current-weather {
    .weather-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;

      .details {
        text-align: left;
      }
    }
  }

  .forecast {
    .forecast-list {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }
}
</style>