interface WeatherResponse {
  status: number;
  result: {
    location: {
      country: string;
      province: string;
      city: string;
      name: string;
      id: string;
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
      wc_night: string;
      wd_night: string;
      date: string;
      week: string;
    }>;
  };
}

export async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function getWeatherByLocation(lat: number, lng: number): Promise<WeatherResponse> {
  // 这里需要替换为您的百度地图API密钥
  const ak = 'T8AfAEOXVNlgWiOJQZssPK6zYjYYlyzW';
  
  try {
    const response = await fetch(
      `/weather/?district_id=110100&data_type=all&ak=${ak}&location=${lat},${lng}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as WeatherResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getDefaultWeather(): Promise<WeatherResponse> {
  // 北京的经纬度
  return getWeatherByLocation(39.9093, 116.3964);
}