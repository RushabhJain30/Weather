import React from 'react';
import WeatherIcon from './WeatherIcon';
import { Droplets } from 'lucide-react';

interface HourlyData {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
}

interface HourlyForecastProps {
  hourlyData: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const next24Hours = hourlyData.slice(0, 24);
  
  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
        <span>Hourly Forecast</span>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </h3>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {next24Hours.map((hour, index) => (
            <div 
              key={index}
              className="flex-shrink-0 bg-white/10 rounded-2xl p-5 text-center min-w-[110px] hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group"
              style={{ 
                animationDelay: `${index * 0.05}s`,
                animation: 'fade-in-up 0.6s ease-out forwards'
              }}
            >
              <div className="text-white/80 text-sm mb-3 font-medium">
                {index === 0 ? 'Now' : formatTime(hour.time)}
              </div>
              
              <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                <WeatherIcon 
                  condition={hour.condition.text}
                  size="small"
                />
              </div>
              
              <div className="text-white font-bold text-lg mb-2 group-hover:text-yellow-200 transition-colors duration-200">
                {Math.round(hour.temp_c)}°
              </div>
              
              {hour.chance_of_rain > 0 && (
                <div className="flex items-center justify-center space-x-1 text-blue-200 text-xs">
                  <Droplets className="w-3 h-3" />
                  <span>{hour.chance_of_rain}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;