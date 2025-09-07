import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { useLanguage } from './language-context';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in real app, you'd use a weather API like OpenWeatherMap
    const fetchWeather = async () => {
      setLoading(true);
      
      // Mock weather data
      setTimeout(() => {
        const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        const mockWeather: WeatherData = {
          temperature: Math.round(20 + Math.random() * 15), // 20-35°C
          humidity: Math.round(40 + Math.random() * 40), // 40-80%
          windSpeed: Math.round(5 + Math.random() * 15), // 5-20 km/h
          condition: randomCondition,
          description: getWeatherDescription(randomCondition),
          icon: randomCondition
        };
        
        setWeather(mockWeather);
        setLoading(false);
      }, 1000);
    };

    fetchWeather();
    
    // Update weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherDescription = (condition: string) => {
    const descriptions = {
      sunny: 'Clear and sunny',
      cloudy: 'Overcast clouds',
      rainy: 'Light rain',
      'partly-cloudy': 'Partly cloudy'
    };
    return descriptions[condition as keyof typeof descriptions] || 'Unknown';
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            {t('currentWeather')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading weather...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            {t('currentWeather')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Unable to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur"></div>
      <Card className="relative bg-card/80 backdrop-blur-lg border border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {t('currentWeather')}
            </span>
          </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main weather display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon(weather.condition)}
              <div>
                <p className="text-2xl font-bold">{weather.temperature}°C</p>
                <p className="text-sm text-muted-foreground">{weather.description}</p>
              </div>
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">{t('humidity')}</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">{t('windSpeed')}</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Farming recommendations based on weather */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
              Farm Recommendations:
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {weather.condition === 'sunny' && 'Perfect weather for grazing. Ensure adequate water supply.'}
              {weather.condition === 'rainy' && 'Keep cattle in shelter. Check for muddy conditions.'}
              {weather.condition === 'cloudy' && 'Good weather for outdoor activities. Monitor temperature.'}
              {weather.condition === 'partly-cloudy' && 'Ideal conditions for cattle. Maintain regular schedule.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default WeatherWidget;