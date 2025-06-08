import React from 'react';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind, TrendingUp, TrendingDown } from 'lucide-react';

interface DayData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    avghumidity: number;
    maxwind_kph: number;
    daily_chance_of_rain: number;
  };
}

interface DailyForecastProps {
  dailyData: DayData[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
        <span>7-Day Forecast</span>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </h3>
      
      <div className="space-y-3">
        {dailyData.map((day, index) => (
          <div 
            key={index}
            className="bg-white/10 rounded-2xl p-5 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'slide-in-left 0.6s ease-out forwards'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 flex-1">
                <div className="w-24 text-white font-semibold text-lg">
                  {formatDate(day.date)}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    <WeatherIcon 
                      condition={day.day.condition.text}
                      size="small"
                    />
                  </div>
                  <span className="text-white/80 text-sm capitalize min-w-[140px] group-hover:text-white transition-colors duration-200">
                    {day.day.condition.text}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-6 text-white/70 text-sm">
                  <div className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200">
                    <Droplets className="w-4 h-4" />
                    <span>{day.day.daily_chance_of_rain}%</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-cyan-300 transition-colors duration-200">
                    <Wind className="w-4 h-4" />
                    <span>{Math.round(day.day.maxwind_kph)} km/h</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                    <span className="font-bold text-lg group-hover:text-red-300 transition-colors duration-200">
                      {Math.round(day.day.maxtemp_c)}°
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="w-4 h-4 text-blue-400" />
                    <span className="text-white/60 text-lg group-hover:text-blue-300 transition-colors duration-200">
                      {Math.round(day.day.mintemp_c)}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;